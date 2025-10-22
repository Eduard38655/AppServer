import { useContext } from "react";
import { ContactosContext } from "../../Context/ContactosContext";

function ContactosCSV() {
    const { GetData } = useContext(ContactosContext); 

    function exportarCSV() {
        if (!GetData || GetData.length === 0) {
            alert("No hay contactos para exportar.");
            return;
        }

       
        const encabezados = [
            "Nombre",
            "Email",
            "Teléfono",
            "Provincia",
            "Ciudad",
            "Día",
            "Mes",
            "Año",
        ];

      
        const filas = GetData.map((contacto) => [
            contacto.nombre || "",
            contacto.email || "",
            contacto.telefono || "",
            contacto.provincia || "",
            contacto.ciudad || "",
            contacto.day || "",
            contacto.month || "",
            contacto.ano || "",
        ]);

       
        const csvContent =
            encabezados.join(",") +
            "\n" +
            filas.map((fila) => fila.join(",")).join("\n");

        // descargar archivo
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "contactos.csv";
        link.click();
    }

    return (
        <button onClick={exportarCSV}>
            <i className="fa-solid fa-download"></i>
            Descargar CSV
        </button>
    );
}

export default ContactosCSV;
