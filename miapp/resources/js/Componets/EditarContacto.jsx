import { useContext, useEffect, useState } from "react";
import { ContactosContext } from "../../Context/ContactosContext";
import { ShowEditMenuContext } from "../../Context/ShowEditMenuContext";
import styles from "../../css/ShowMenus.module.css";

function EditarContacto() {
    const { GetData, refreshContactos } = useContext(ContactosContext || {});
    const { isShowEditMenu, setIsShowEditMenu, ContactoID, setContactoID } =
        useContext(ShowEditMenuContext || {});
    const { RunDataBase, SetDataBase } = useContext(ContactosContext);
    // Estados
    const [NewNombre, setName] = useState("");
    const [NewEmail, setEmail] = useState("");
    const [NewPhone, setPhone] = useState("");
    const [NewProvincia, setProvincia] = useState("");
    const [NewCiudad, setCiudad] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isShowEditMenu) {
            setName("");
            setEmail("");
            setPhone("");
            setProvincia("");
            setCiudad("");
            setIsDirty(false);
            return;
        }

        if (!ContactoID) {
            setName("");
            setEmail("");
            setPhone("");
            setProvincia("");
            setCiudad("");
            setIsDirty(false);
            return;
        }

        if (isDirty) return;

        const found = Array.isArray(GetData)
            ? GetData.find((d) => Number(d.id) === Number(ContactoID))
            : null;

        if (found) {
            // precargar valores
            setName(found.nombre ?? "");
            setEmail(found.email ?? "");
            setPhone(found.telefono ?? "");
            setProvincia(found.provincia ?? "");
            setCiudad(found.ciudad ?? "");
            setIsDirty(false);
        } else {
            setName("");
            setEmail("");
            setPhone("");
            setProvincia("");
            setCiudad("");
            setIsDirty(false);
        }
    }, [ContactoID, GetData, isShowEditMenu, isDirty]);

    function handleName(e) {
        setName(e.target.value);
        setIsDirty(true);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
        setIsDirty(true);
    }
    function handlePhone(e) {
        setPhone(e.target.value);
        setIsDirty(true);
    }
    function handleProvincia(e) {
        setProvincia(e.target.value);
        setIsDirty(true);
    }
    function handleCiudad(e) {
        setCiudad(e.target.value);
        setIsDirty(true);
    }

    async function UpdateInfo() {
        if (isSaving) return;
        setIsSaving(true);

        try {
            const meta =
                typeof document !== "undefined"
                    ? document.querySelector('meta[name="csrf-token"]')
                    : null;
            const token = meta ? meta.getAttribute("content") : null;

            const payload = {
                id: ContactoID,
                NewNombre: NewNombre,
                NewEmail: NewEmail,
                NewPhone: NewPhone,
                NewProvincia: NewProvincia,
                NewCiudad: NewCiudad,
            };

            const response = await fetch("/Updatecontactos", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "X-CSRF-TOKEN": token } : {}),
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                if (typeof refreshContactos === "function") {
                    await refreshContactos();
                } else {
                }

                alert("Contacto actualizado correctamente");
                setIsShowEditMenu(false);
                setContactoID(0);
                setIsDirty(false);

                SetDataBase(true);
            } else {
                const err = await response.json().catch(() => null);
                if (response.status === 422 && err?.errors) {
                    const msgs = Object.values(err.errors).flat().join("\n");
                    alert("Errores de validación:\n" + msgs);
                } else {
                    alert(
                        "Error al actualizar el contacto: " +
                            (err?.message || response.status),
                    );
                }
                console.error("UpdateInfo error:", response.status, err);
            }
        } catch (error) {
            console.error("Error de red o JS:", error);
            alert("Error de red al actualizar contacto.");
        } finally {
            setIsSaving(false);
        }
    }

    function handleCancel() {
        setIsShowEditMenu(false);
        setContactoID(0);
        setIsDirty(false);
    }

    return (
        <>
            {isShowEditMenu && (
                <div className={styles.Container_Edit}>
                    <div className={styles.SubContainer_Edit}>
                        <div className={styles.HeaderContainer_Edit}>
                            <h3>
                                Edit Contact
                                <br />
                                <span>
                                    Update the details for this contact.
                                </span>
                            </h3>
                            <button onClick={handleCancel}>
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
                                    onChange={handleName}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={NewEmail}
                                    onChange={handleEmail}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={NewPhone}
                                    onChange={handlePhone}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="province">Provincia</label>
                                <input
                                    type="text"
                                    id="province"
                                    value={NewProvincia}
                                    onChange={handleProvincia}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    id="ciudad"
                                    value={NewCiudad}
                                    onChange={handleCiudad}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.ButtonContainer_Edit}>
                            <button onClick={handleCancel} disabled={isSaving}>
                                Cancelar
                            </button>
                            <button onClick={UpdateInfo} disabled={isSaving}>
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
            )}
        </>
    );
}

export default EditarContacto;
