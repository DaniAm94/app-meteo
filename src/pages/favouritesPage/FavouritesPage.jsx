import { useEffect, useState } from "react";
import useFavourites from "../../hooks/useFavourites";
import favouritesPage from "./favouritesPage.module.scss";
import FavouriteLocation from "./components/favouriteLocation/favouriteLocation";
import { useGlobalContext } from "../../contexts/GlobalContext";
import WeatherDisplay from "../../components/weatherDisplay/WeatherDisplay.jsx";
import { FaGamepad } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";



const FavouritesPage = () => {

    const [favourites, setFavourites] = useFavourites()

    const { fetchWeatherConditions, locationWeather, setLocationWeather } = useGlobalContext();

    // State che tiene memoria del tipo di ordinamento: crescente o decrescente
    const [order, setOrder] = useState("asc");


    // State dove conservare la lista delle location preferite con le loro condizioni meteo
    const [locationsWeatherList, setLocationsWeatherList] = useState([])


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
                setLocationsWeatherList(weatherData);
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

        setFavourites(curr =>
            curr.filter(fav => fav.id !== location.id)
        );

        setLocationsWeatherList(curr =>
            curr.filter(fav => fav.id !== location.id)
        );
    }

    /**
     * Funzione che ordina i preferiti in base alla temperatura
     */
    const orderByTemp = () => {
        if (locationsWeatherList.length) {

            setLocationsWeatherList(curr => {
                const sortedFavourites = [...curr];
                sortedFavourites.sort((a, b) => {
                    return order === "asc" ?
                        a.temperature_2m - b.temperature_2m :
                        b.temperature_2m - a.temperature_2m;
                })
                setOrder(order === "asc" ? "desc" : "asc");
                return sortedFavourites;
            })
        }
    }

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
                        <th className="d-none d-sm-table-cell">
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
                    {favourites.length > 0 ?
                        locationsWeatherList.map(location => <tr
                            className={favouritesPage.row}
                            key={location.id}
                        >
                            <FavouriteLocation favLocation={location} onRemove={removeFavourite} showDetails={setLocationWeather} />
                        </tr>) :
                        <tr className={favouritesPage.row}><td colSpan={6}>Non ci sono preferiti</td></tr>
                    }
                </tbody>
            </table>

            {/* Modale che mostra i dettagli */}
            <WeatherDisplay location={locationWeather} onClose={() => setLocationWeather(null)} isFavourite={true} />
        </div>
    )
}
export default FavouritesPage;