import { useContext, useState } from "react";
import { ContactosContext } from "../../Context/ContactosContext";
import { ShowEditMenuContext } from "../../Context/ShowEditMenuContext";
import styles from "../../css/ShowMenus.module.css";

function AgregarDatos() {
    const { isShowAddMenu, setIsShowAddMenu } = useContext(ShowEditMenuContext);
    const { RunDataBase, SetDataBase } = useContext(ContactosContext);

    const [ContactoData, setContactoData] = useState([]);
    const [NewNombre, setName] = useState("");
    const [NewEmail, setEmail] = useState("");
    const [NewPhone, setPhone] = useState("");
    const [NewProvincia, setProvincia] = useState("");
    const [NewCiudad, setCiudad] = useState("");

    const [isSaving, setIsSaving] = useState(false);

    async function AgregarInfo() {
        if (isSaving) return; // evitar envíos concurrentes
        setIsSaving(true);

        try {
            // Fecha actual
            const date = new Date();
            const dia = date.getDate();
            const mes = date.getMonth() + 1;
            const ano = date.getFullYear();

            const meta = document.querySelector('meta[name="csrf-token"]');
            const token = meta ? meta.getAttribute("content") : null;

            const payload = {
                dia,
                mes,
                ano,
                NewNombre,
                NewEmail,
                NewPhone,
                NewProvincia,
                NewCiudad,
            };

            const response = await fetch("/Agregarcontactos", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token ,
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            alert(data.message)
            if (response.ok) {
                // Actualizar la lista local (prepend)
                setContactoData((prev) => [data.contact, ...prev]);
 
                setName("");
                setEmail("");
                setPhone("");
                setProvincia("");
                setCiudad("");

                setIsShowAddMenu(false);
                SetDataBase(true);

                setIsSaving(false);
                
                
                return data;
            } else {
                

                setIsSaving(false);
              
            }
        } catch (err) {
            console.error("Error", err);
            alert("Error inesperado: " + (err.message || err));
            setIsSaving(false);
            return { error: err.message };
        }
    }

    return (
        <>
            {isShowAddMenu ? (
                <div className={styles.Container_Edit}>
                    <div className={styles.SubContainer_Edit}>
                        <div className={styles.HeaderContainer_Edit}>
                            <h3>
                                Add New Contact
                                <br />
                                <span>
                                    Fill in the details to create a new contact.
                                </span>
                            </h3>
                            <button onClick={() => setIsShowAddMenu(false)}>
                                <i className="fa-solid fa-xmark" />
                            </button>
                        </div>

                        <div className={styles.FormContainer_Edit}>
                            <div>
                                <label htmlFor="name">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={NewNombre}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={NewEmail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={NewPhone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="province">Provincia</label>
                                <input
                                    type="text"
                                    id="province"
                                    value={NewProvincia}
                                    onChange={(e) =>
                                        setProvincia(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    id="ciudad"
                                    value={NewCiudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.ButtonContainer_Edit}>
                            <button
                                onClick={() => setIsShowAddMenu(false)}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                            <button onClick={AgregarInfo} disabled={isSaving}>
                                {isSaving ? (
                                    "Guardando..."
                                ) : (
                                    <>
                                        <i className="fa-solid fa-floppy-disk" />{" "}
                                        Guardar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default AgregarDatos;
