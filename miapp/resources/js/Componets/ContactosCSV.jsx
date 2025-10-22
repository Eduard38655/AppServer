import { useContext } from "react";
import { ContactosContext } from "../../Context/ContactosContext";

function ContactosCSV() {
    const { GetData } = useContext(ContactosContext); // <-- tu lista de contactos

    function exportarCSV() {
        if (!GetData || GetData.length === 0) {
            alert("No hay contactos para exportar.");
            return;
        }

        // 1️⃣ Definir las columnas que quieres mostrar
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

        // 2️⃣ Crear las filas según tus campos
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

        // 3️⃣ Unir encabezados y filas
        const csvContent =
            encabezados.join(",") +
            "\n" +
            filas.map((fila) => fila.join(",")).join("\n");

        // 4️⃣ Crear blob y descargar archivo
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
