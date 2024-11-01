import { useEffect, useState } from "react";
import useFavourites from "../../hooks/useFavourites";
import axios from "axios";
const weatherUrl = import.meta.env.VITE_BASE_METEO_URL;
import { FaTrashAlt } from "react-icons/fa";


const FavouritesPage = () => {

    const [favourites, setFavourites] = useFavourites()


    // State dove conservare la lista delle location preferite con le loro condizioni meteo
    const [locationsWeatherList, setLocationsWeatherList] = useState([])


    // Use Effetc per fetchare le condizioni meteo di tutte le location al rendering della pagina
    useEffect(() => {

        const fetchAllWeatherConditions = async () => {
            try {
                const weatherData = await Promise.all(
                    favourites.map(async (location) => {
                        const weather = await fetchWeatherConditions(location);
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
     * Funzione che raccoglie le condizione metereologiche di una località passata come parametro
     * @param {Object} location 
     * @returns restituisce un oggetto con le condizioni meteorologiche
     */
    const fetchWeatherConditions = async (location) => {

        // Configuro i miei params per la query string
        const params = {

            // Coordinate della località cercata
            latitude: location.latitude,
            longitude: location.longitude,

            // Dati relativi al meteo attuale
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",

            timezone: "auto",

        }

        try {
            const { data } = await axios.get(weatherUrl, { params });
            return data.current;
        } catch (err) {
            console.error(err);
        }
    }
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

    return (
        <>
            <h1>Pagina preferiti</h1>
            <ul>
                {
                    locationsWeatherList.map(location => <li
                        key={location.id}
                    >
                        <h3>{`${location.country_code} - ${location.name}`}</h3>
                        <button onClick={() => removeFavourite(location)}>
                            <FaTrashAlt /> rimuovi
                        </button>
                    </li>)
                }
            </ul>
        </>
    )
}
export default FavouritesPage;