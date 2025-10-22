import styles from "../../css/MenuBar.module.css";
import AgregarDatos from "../Componets/AgregarDatos";
import AsideMenuBar from "../Componets/AsideMenuBar";
import ContactoContenido from "../Componets/ContactoContenido ";
import EditarContacto from "../Componets/EditarContacto";
import Header from "../Componets/Header";
import MobileHeader from "../Componets/MobileHeader";
import SearchData from "../Componets/SearchData";

function ContactoPage(params) {
    return (
        <article className={styles.Contacto_Page}>
            <EditarContacto />
            <AgregarDatos />
            <AsideMenuBar />
            <MobileHeader />
            <div className={styles.Contacto_Page_Container}>
                <Header />
                <SearchData />
                <ContactoContenido />
            </div>
        </article>
    );
}

export default ContactoPage;
