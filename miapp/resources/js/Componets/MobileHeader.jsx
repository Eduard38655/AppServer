import { useState } from "react";
import styles from "../../css/MenuBar.module.css";

function MobileHeader(params) {
    const [MobileMode, SetMobileMode] = useState(false);
    return (
        <>
            <aside className={styles.Aside_Menu_Bar_Mobile}>
                <div className={styles.Div_Menu_Container_Mobile}>
                    <div className={styles.Div_Menu_Profile_Mobile}>
                        <i className="fa-regular fa-user"></i>
                        <h3>Contact Pro</h3>
                    </div>

                    {MobileMode ? (
                        <>
                            <button
                                onClick={() => {
                                    SetMobileMode(false);
                                }}
                            >
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    SetMobileMode(true);
                                }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </>
                    )}
                </div>

                {MobileMode ? (
                    <></>
                ) : (
                    <>
                        <nav className={styles.Nav_Menu_Bar_Mobile}>
                            <ul>
                                <li>
                                    <i className="fa-solid fa-address-book"></i>
                                    Contacto
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
            </aside>
        </>
    );
}

export default MobileHeader;
