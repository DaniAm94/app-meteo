import useFavourites from "../../hooks/useFavourites";


const FavouritesPage = () => {

    const [favourites, setFavourites, includesFavourite] = useFavourites()






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