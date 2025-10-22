import { createContext, useEffect, useState } from "react";

// Named export para el Context
export const ContactosContext = createContext();

// Named export para el Provider
export function ContactosProvider({ children }) {
    const [user, setUser] = useState(null);
    const [GetData, SetData] = useState([]);
    const [SearchByName, SetSearchByName] = useState("");
    const [SearchByProvince, SetSearchByProvince] = useState("");
    const [SearchByCity, SetSearchByCity] = useState("");
    const [SearchByDate, SetSearchByDate] = useState("");
    const [ErrorUser, SetErrorUser] = useState(null);
    const [RunDataBase, SetDataBase] = useState(false);

    const fetchContacts = () => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        const token = meta ? meta.getAttribute("content") : "";

        const raw = localStorage.getItem("DataUser");
        if (!raw) return;

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            console.error(err);
            SetErrorUser("User inválido en localStorage");
            return;
        }

        const userId = parsed?.user?.id;
        if (!userId) return;

        setUser(parsed.user);

        fetch("/Getcontactos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "X-CSRF-TOKEN": token } : {}),
            },
            body: JSON.stringify({ id: userId }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    SetData(data.data);
                } else {
                    SetData([]);
                    SetErrorUser("No se encontraron contactos");
                }
            })
            .catch((err) => {
                console.error("Error al obtener contactos:", err);
                SetErrorUser("Error al conectar con el servidor");
            });
    };

    // Ejecutamos fetch al montar
    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        fetchContacts();
        SetDataBase(false);
    }, [RunDataBase]);

    return (
        <ContactosContext.Provider
            value={{
                user,
                setUser,
                GetData,
                SetData,
                SearchByName,
                SetSearchByName,
                SearchByProvince,
                SetSearchByProvince,
                SearchByCity,
                SetSearchByCity,
                SearchByDate,
                SetSearchByDate,
                RunDataBase,
                SetDataBase,
                ErrorUser,
                SetErrorUser,
                refreshContacts: fetchContacts,
            }}
        >
            {children}
        </ContactosContext.Provider>
    );
}
