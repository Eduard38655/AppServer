import styles from "../../css/MenuBar.module.css";
function AsideMenuBar(params) {
    return (
        <aside className={styles.Aside_Menu_Bar}>
            <div className={styles.Div_Menu_Container}>
                <div className={styles.DivDetails}>
                    <div className={styles.Div_Menu_Profile}>
                        <i className="fa-regular fa-user"></i>
                        <h3>Contact Pro</h3>
                    </div>
                    <nav className={styles.Nav_Menu_Bar}>
                        <ul>
                            <li>
                                <i className="fa-solid fa-address-book"></i>
                                Contacto
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
}

export default AsideMenuBar;
