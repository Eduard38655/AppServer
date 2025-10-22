import { useState } from "react";
import styles from "../../css/Login.module.css";

export default function UsersList() {
    const [users, setUsers] = useState("");
    const [password, setPassword] = useState("");
    const [DataUser, SetDataUser] = useState([]);
    const [ErrorUser, SetErrorUser] = useState("");
    const [ErrorPassword, SetErrorPassword] = useState("");

   async function ValidarUser() {
    localStorage.clear("DataUser");

    if (!users || !password) {
        SetErrorUser(!users ? "Este campo no puede estar vacio" : "");
        SetErrorPassword(!password ? "Este campo no puede estar vacio" : "");
        return;
    }

    try {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
        const res = await fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token,
                Accept: "application/json",
            },
            body: JSON.stringify({ email: users, password }),
        });

        const data = await res.json();
console.log(data);

        if (data.status==="success") {
            localStorage.setItem("DataUser", JSON.stringify(data));
            window.location.href = "/contacto";
        } else {
            SetErrorUser(data.message);
            SetErrorPassword(data.message);
        }

    } catch (err) {
        console.error(err);
        SetErrorUser("No se pudo conectar con el servidor");
    }
}


    return (
        <article className={styles.Container_Login}>
            <div className={styles.Div_Login_Header}>
                <i className="fa-solid fa-user"></i>
                <h3>
                    Contact Manager Pro <br />
                    <span>Welcome back! Please sign in to continue.</span>
                </h3>
            </div>

            <div className={styles.Main_Info_Container}>
                <div className={styles.Div_Inputs_Info}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setUsers(e.target.value)}
                            required
                        />
                        {ErrorUser && <span>{ErrorUser}</span>}
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {ErrorPassword && <span>{ErrorPassword}</span>}
                    </div>
                </div>

                <div className={styles.Div_CheckBox}>
                    <input type="checkbox" />
                    <p>
                        Remember me  
                    </p>
                </div>

                <button onClick={ValidarUser}>Sign in</button>
            </div>
        </article>
    );
}
