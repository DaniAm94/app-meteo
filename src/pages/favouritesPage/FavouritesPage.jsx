import { useEffect, useState } from "react";
import favouritesPage from "./favouritesPage.module.scss";
import FavouriteLocation from "./components/favouriteLocation/favouriteLocation";
import { useGlobalContext } from "../../contexts/GlobalContext";
import WeatherDisplay from "../../components/weatherDisplay/WeatherDisplay.jsx";
import { FaGamepad } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useFavouritesContext } from "../../contexts/FavouritesContext.jsx";



const FavouritesPage = () => {


    const { favourites, changeFavourites } = useFavouritesContext();


    const { fetchWeatherConditions, searchLocation, setSearchLocation } = useGlobalContext();

    // State che tiene memoria del tipo di ordinamento: crescente o decrescente
    const [order, setOrder] = useState("asc");


    // Use Effetc per fetchare le condizioni meteo di tutte le location al rendering della pagina
    useEffect(() => {
        const fetchAllWeatherConditions = async () => {
            try {
                const weatherData = await Promise.all(
                    favourites.map(async (location) => {
                        const weather = await fetchWeatherConditions(location, true);
                        return { ...location, ...weather };
                    })
                );
                changeFavourites((curr) => weatherData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllWeatherConditions();
    }, []);



    /**
     * Funzione che rimuove una location dai preferiti
     * @param {Object} location 
     */
    const removeFavourite = (location) => {
        //La location verra rimossa perchè già presente tra i preferiti
        changeFavourites(location);
    }

    /**
     * Funzione che ordina i preferiti in base alla temperatura
     */
    const orderByTemp = () => {
        setOrder((prevOrder) => prevOrder === "asc" ? "desc" : "asc");
    };

    useEffect(() => {
        const sortedFavourites = [...favourites].sort((a, b) => {
            return order === "asc"
                ? a.temperature_2m - b.temperature_2m
                : b.temperature_2m - a.temperature_2m;
        });
        changeFavourites(() => sortedFavourites)
    }, [order])


    return (
        <div className={favouritesPage.table_wrapper}>
            <table className={favouritesPage.favourites_table}>
                <thead>
                    <tr className={favouritesPage.row}>

                        {/* Località */}
                        <th>
                            Località
                        </th>

                        {/* Regione */}
                        <th className="d-none d-sm-table-cell ">
                            Regione
                        </th>

                        {/* Provincia */}
                        <th className="d-none d-md-table-cell">
                            Provincia
                        </th>

                        {/* Temperatura attuale */}
                        <th>
                            <div className="d-flex justify-content-center align-items-center">

                                {/* Bottone per ordinamento in base alla temperatura */}
                                <button
                                    onClick={orderByTemp}
                                    className={favouritesPage.temp_button}>
                                    °C

                                    {/* Icona che indica l'ordinamento attuale */}
                                    {order === "asc" ?
                                        <IoMdArrowDropup /> :
                                        <IoMdArrowDropdown />

                                    }
                                </button>
                            </div>
                        </th>

                        {/* Condizione meteo attuale */}
                        <th>
                            Meteo
                        </th>

                        {/* Tasti: dettagli, rimozione dai preferiti */}
                        <th>
                            <div className="d-flex justify-content-center align-items-center fs-2">
                                <FaGamepad />
                            </div>
                        </th>
                    </tr>
                </thead>

                {/* Corpo tabella */}
                <tbody>
                    {favourites?.length > 0 ?
                        favourites.map(location => <tr
                            className={favouritesPage.row}
                            key={location.id}
                        >
                            <FavouriteLocation favLocation={location} onRemove={removeFavourite} showDetails={setSearchLocation} />
                        </tr>) :
                        <tr className={favouritesPage.row}><td colSpan={6}>Non ci sono preferiti</td></tr>
                    }
                </tbody>
            </table>


        </div>
    )
}
export default FavouritesPage;