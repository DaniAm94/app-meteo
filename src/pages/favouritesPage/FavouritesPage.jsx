import { useEffect, useState } from "react";
import useFavourites from "../../hooks/useFavourites";
import favouritesPage from "./favouritesPage.module.scss";
import FavouriteLocation from "./components/favouriteLocation/favouriteLocation";
import { useGlobalContext } from "../../contexts/GlobalContext";
import WeatherDisplay from "../../components/weatherDisplay/WeatherDisplay.jsx";

const FavouritesPage = () => {

    const [favourites, setFavourites] = useFavourites()

    const { fetchWeatherConditions, locationWeather, setLocationWeather } = useGlobalContext();


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

    return (
        <div className={favouritesPage.table_wrapper}>

            <table className={favouritesPage.favourites_table}>
                <thead>
                    <tr className={favouritesPage.row}>
                        <th>
                            Località
                        </th>
                        <th className="d-none d-sm-table-cell">
                            Regione
                        </th>
                        <th className="d-none d-md-table-cell">
                            Provincia
                        </th>
                        <th>
                            °C
                        </th>
                        <th>
                            Meteo
                        </th>
                        <th>
                            -
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        locationsWeatherList.map(location => <tr
                            className={favouritesPage.row}
                            key={location.id}
                        >
                            <FavouriteLocation favLocation={location} onRemove={removeFavourite} showDetails={setLocationWeather} />
                        </tr>)
                    }
                </tbody>
            </table>

            <WeatherDisplay location={locationWeather} onClose={() => setLocationWeather(null)} isFavourite={true} />
        </div>
    )
}
export default FavouritesPage;