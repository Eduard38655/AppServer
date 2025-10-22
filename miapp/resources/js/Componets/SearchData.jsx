import { useContext, useEffect, useState } from "react";
import { ContactosContext } from "../../Context/ContactosContext";
import { ShowEditMenuContext } from "../../Context/ShowEditMenuContext";
import styles from "../../css/MenuBar.module.css";
import ContactosCSV from "../Componets/ContactosCSV";

function SearchData(params) {
    const { GetData, SetData } = useContext(ContactosContext);
    const [GetProvinces, setGetProvinces] = useState([]);
    const [Cities, setCities] = useState([]);
    const { SearchByName, SetSearchByName } = useContext(ContactosContext);
    const { SearchByProvince, SetSearchByProvince } =
        useContext(ContactosContext);
    const { SearchByCity, SetSearchByCity } = useContext(ContactosContext);
    const { SearchByDate, SetSearchByDate } = useContext(ContactosContext);

    const { isShowAddMenu, setIsShowAddMenu } = useContext(ShowEditMenuContext);
    useEffect(() => {
        // Si no es un array o está vacío: limpiar y salir sin errores
        if (!Array.isArray(GetData) || GetData.length === 0) {
            setGetProvinces([]);
            setCities([]);
            return;
        }

        const provincesSet = new Set();
        const citiesSet = new Set();

        GetData.forEach((item) => {
            // usa optional chaining por si item es null/undefined
            const prov = item?.provincia;
            const city = item?.ciudad;

            // Ignorar valores nulos, undefined o strings vacíos
            if (prov !== undefined && prov !== null) {
                const p = String(prov).trim();
                if (p !== "") provincesSet.add(p);
            }

            if (city !== undefined && city !== null) {
                const c = String(city).trim();
                if (c !== "") citiesSet.add(c);
            }
        });

        setGetProvinces(Array.from(provincesSet));
        setCities(Array.from(citiesSet));
    }, [GetData]);

    return (
        <aside className={styles.Search_Data_Contact_Page}>
            <div className={styles.Div_Title_Search_Data}>
                <h3>
                    Contacts <br />
                    <span>Manage your contacts and view detailed reports.</span>
                </h3>
            </div>

            <div className={styles.Div_Input_Search_Data}>
                <input
                    type="text"
                    placeholder="Filtar por nombre"
                    onChange={(e) => SetSearchByName(e.target.value)}
                />

                <select
                    name=""
                    id=""
                    onClick={(e) => SetSearchByProvince(e.target.value)}
                >
                    <option value="None">Filtar por province</option>
                    <option value="Todas">Todas las provincias</option>
                    {GetProvinces.map((province, index) => (
                        <option key={index} value={province}>
                            {province}
                        </option>
                    ))}
                </select>
                <select
                    name=""
                    id=""
                    onChange={(e) => {
                        SetSearchByCity(e.target.value);
                    }}
                >
                    <option value="">Filtrar por ciudad</option>
                    <option value="">Todas las ciudades</option>

                    {Cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    onChange={(e) => {
                        SetSearchByDate(e.target.value);
                    }}
                />
            </div>
            <div className={styles.Div_Buttons_Search_Data}>
                <ContactosCSV />
                <button
                    onClick={() => {
                        setIsShowAddMenu(!isShowAddMenu);
                    }}
                >
                    <i className="fa-solid fa-user-plus"></i>
                    Agregar Contacto
                </button>
            </div>
        </aside>
    );
}

export default SearchData;
