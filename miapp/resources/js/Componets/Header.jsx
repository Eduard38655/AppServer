import { useEffect, useState } from "react";
import styles from "../../css/MenuBar.module.css";

function Header() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("DataUser");
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
    }, []);

    useEffect(() => {}, [userData]);
    return (
        <header className={styles.Header_Contact_Page}>
            {userData && userData.user ? (
                <h4>Bienvenido, {userData.user.name}!</h4>
            ) : (
                <>No hay usuario</>
            )}
        </header>
    );
}

export default Header;
