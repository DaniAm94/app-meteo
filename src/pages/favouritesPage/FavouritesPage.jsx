import { useEffect, useState } from "react";
import useFavourites from "../../hooks/useFavourites";
import axios from "axios";
const weatherUrl = import.meta.env.VITE_BASE_METEO_URL;


const FavouritesPage = () => {

    const [favourites, setFavourites, includesFavourite] = useFavourites()


    const [locationsWeatherList, setLocationsWeatherList] = useState([])


    // Use Effetc per fetchare le condizioni meteo di tutte le location una volta al rendering della pagina
    useEffect(() => {

        // Uso una clean up function per eseguire lo useEffect una sola volta
        return () => {
            console.log('Sono lo use effect')
            const fetchAllWeatherConditions = async () => {
                try {
                    const weatherData = await Promise.all(
                        favourites.map(async (location) => {
                            // Restituisco un oggetto con due chiavi che rappresentano:
                            return {
                                // la location
                                location,
                                // le sue condizioni meteo
                                weather: await fetchWeatherConditions(location),
                            };
                        })
                    );
                    setLocationsWeatherList(weatherData);
                } catch (error) {
                    console.error(error);
                }
            };

            if (favourites.length > 0) {
                fetchAllWeatherConditions();
            }
        }

    }, [favourites]); // Aggiungi favourites come dipendenza


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
            console.log(data.current);
            return data.current;
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Pagina preferiti</h1>
            <ul>
                {
                    favourites.map(favourite => <li
                        key={favourite.id}
                    >
                        {favourite.name}
                    </li>)
                }
            </ul>
        </>
    )
}
export default FavouritesPage;