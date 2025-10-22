import { useContext, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { ContactosContext } from "../../Context/ContactosContext";
import { ShowEditMenuContext } from "../../Context/ShowEditMenuContext";
import styles from "../../css/ContactContenido.module.css";

function ContactoContenido() {
    // Contexts: un solo useContext por contexto y desestructuro lo necesario
    const {
        GetData = [],
        SearchByName = "",
        SearchByProvince = "",
        SearchByCity = "",
        SearchByDate = "",
    } = useContext(ContactosContext || {});

    const { isShowEditMenu, setIsShowEditMenu, ContactoID, setContactoID } =
        useContext(ShowEditMenuContext || {});
  const {RunDataBase,SetDataBase}=useContext(ContactosContext)


         
    // Estado local
    const [selectedId, setSelectedId] = useState(0);
    const [asc, setAsc] = useState(true); 
    const [currentPage, setCurrentPage] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const itemsPerPage = 15;

    const nameQuery = (SearchByName || "").trim().toLowerCase();
    const provinceQuery = (SearchByProvince || "").trim().toLowerCase();
    const cityQuery = (SearchByCity || "").trim().toLowerCase();
    const dateQuery = (SearchByDate || "").trim().toLowerCase();

    // Filtrar y ordenar en un solo useMemo

 const filteredAndSorted = useMemo(() => {
  if (!Array.isArray(GetData)) return [];

  const nameQ = (SearchByName || "").toLowerCase();
  const provQ = (SearchByProvince || "").toLowerCase();
  const cityQ = (SearchByCity || "").toLowerCase();
  const dateQ = (SearchByDate || "").trim();

  let infoYear = null, infoMonth = null, infoDay = null;
  if (dateQ) {
    const parts = dateQ.split("-").map(p => parseInt(p, 10));
    if (!isNaN(parts[0])) infoYear = parts[0];
    if (!isNaN(parts[1])) infoMonth = parts[1];
    if (!isNaN(parts[2])) infoDay = parts[2];
  }

  return GetData.filter(item => {
    const nombre = (item.nombre || "").toLowerCase();
    const provincia = (item.provincia || "").toLowerCase();
    const ciudad = (item.ciudad || "").toLowerCase();

    if (nameQ && !nombre.includes(nameQ)) return false;
    if (provQ && provQ !== "none" && provQ !== "todas" && !provincia.includes(provQ)) return false;
    if (cityQ && cityQ !== "none" && cityQ !== "todas" && !ciudad.includes(cityQ)) return false;

    if (infoYear || infoMonth || infoDay) {
      const itemYear = parseInt(item.ano, 10);
      const itemMonth = parseInt(item.mes, 10);
      const itemDay = parseInt(item.dia, 10);

      if (infoYear && itemYear !== infoYear) return false;
      if (infoMonth && itemMonth !== infoMonth) return false;
      if (infoDay && itemDay !== infoDay) return false;
    }

    return true;
  })
  .sort((a, b) => {
    const an = (a.nombre || "").toLowerCase();
    const bn = (b.nombre || "").toLowerCase();
    return asc ? an.localeCompare(bn) : bn.localeCompare(an);
  });
}, [GetData, SearchByName, SearchByProvince, SearchByCity, SearchByDate, asc]);

    // Paginación
    const pageCount = Math.max(
        1,
        Math.ceil(filteredAndSorted.length / itemsPerPage),
    );
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredAndSorted.slice(offset, offset + itemsPerPage);

    useEffect(() => {
        // Reiniciar 
        setCurrentPage(0);
    }, [
        nameQuery,
        provinceQuery,
        cityQuery,
        dateQuery,
        filteredAndSorted.length,
    ]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    // Toggle orden
    function toggleSortByName() {
        setAsc((s) => !s);
    }

   

    // Delete contacto 
    async function DeleteContacto(id) {
        if (isDeleting) return;
        if (!confirm("¿Eliminar este contacto?")) return;

        setIsDeleting(true);
        try {
            const meta =
                typeof document !== "undefined"
                    ? document.querySelector('meta[name="csrf-token"]')
                    : null;
            const token = meta ? meta.getAttribute("content") : null;

            const res = await fetch("/Deletecontactos", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "X-CSRF-TOKEN": token } : {}),
                    Accept: "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => null);
                console.error("Error deleting:", res.status, err);

                alert(
                    "Error al eliminar contacto: " +
                        (err?.message || res.status),
                );
                return;
            }

            alert("Contacto eliminado correctamente");
              SetDataBase(true)
        } catch (error) {
           
            alert("Error al eliminar contacto.");
        } finally {
            setIsDeleting(false);
            setSelectedId(0);
        }

       
    }

    return (
        <div className={styles.DivConatinertable}>
            <table className={styles.Table_Contact_Page}>
                <thead>
                    <tr>
                        <th>
                            <button onClick={toggleSortByName}>
                                Nombre{" "}
                                {asc ? (
                                    <i className="fa-solid fa-arrow-down-long" />
                                ) : (
                                    <i className="fa-solid fa-arrow-up-long" />
                                )}
                            </button>
                        </th>
                        <th>Provincia</th>
                        <th>Ciudad</th>
                        <th>Telephone</th>
                        <th>Fecha de Creación</th>
                        <th></th>
                    </tr>
                </thead>

                {currentItems.length > 0 ? (
                    <tbody>
                        {currentItems.map((data) => (
                            <tr key={data.id}>
                                <td>
                                    {data.nombre} <br />{" "}
                                    <span>{data.email}</span>
                                </td>
                                <td>{data.provincia}</td>
                                <td>{data.ciudad}</td>
                                <td>{data.telefono}</td>
                                <td>
                                    { `${data.dia}/${data.mes}/${data.ano}`}
                                </td>
                                <td>
                                    {selectedId === data.id ? (
                                        <div>
                                            <button
                                                onClick={() => setSelectedId(0)}
                                            >
                                                <i className="fa-solid fa-ellipsis"></i>
                                            </button>
                                            <ul>
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            DeleteContacto(
                                                                data.id,
                                                            )
                                                        }
                                                        disabled={isDeleting}
                                                    >
                                                        Eliminar Contacto
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => {
                                                            setContactoID(
                                                                data.id,
                                                            );
                                                            setIsShowEditMenu(
                                                                true,
                                                            );
                                                            setSelectedId(0);
                                                        }}
                                                    >
                                                        Editar Contacto
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            setSelectedId(0)
                                                        }
                                                    >
                                                        Cancelar
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setSelectedId(data.id)
                                            }
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>No hay datos disponibles</td>
                            <td>No hay datos disponibles</td>
                            <td>No hay datos disponibles</td>
                            <td>No hay datos disponibles</td>
                            <td>No hay datos disponibles</td>
                            <td />
                        </tr>
                    </tbody>
                )}
            </table>

            <div className={styles.Pagination_Info}>
                <p>
                    Mostrando {currentItems.length} de{" "}
                    {Array.isArray(GetData) ? GetData.length : 0} resultados
                </p>

                <ReactPaginate
                    previousLabel={"Anterior"}
                    nextLabel={"Siguiente"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
}

export default ContactoContenido;
