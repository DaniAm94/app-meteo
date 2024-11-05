import { FaRegStar, FaStar, FaXmark } from "react-icons/fa6";
import weatherDisplay from "./weatherDisplay.module.scss"
const icons = import.meta.glob("../../assets/icons/*.png", { eager: true });
import { useGlobalContext } from "../../contexts/GlobalContext.jsx";
import { useFavouritesContext } from "../../contexts/FavouritesContext.jsx";
import { useEffect } from "react";


const WeatherDisplay = () => {

    const { weatherCodeMap, searchLocation, setSearchLocation, fetchWeatherConditions, hasWeatherConditions, setHasWeatherConditions } = useGlobalContext()
    const { changeFavourites, includesFavourite } = useFavouritesContext();

    useEffect(() => {
        fetchWeatherConditions(searchLocation, false);
    }, [])


    /**
     * Funzione che restituisce la direzione del vento in stringa es. Nord, Sud-Est a partire da una direzione del vento in gradi
     * @param {Number} directionDegrees direzione del vento in gradi 
     * @returns {String} La direzione del vento formato stringa
     */
    const windDirectionString = (directionDegrees) => {

        // Array delle direzioni
        const directions = [
            "Nord", "Nord-Est", "Est", "Sud-Est",
            "Sud", "Sud-Ovest", "Ovest", "Nord-Ovest"
        ];

        // Calcola l'indice della direzione (ogni direzione avrà un range di 45°)
        const index = Math.round(((directionDegrees % 360) / 45));

        return directions[index];
    }

    return (
        <>

            <div className={weatherDisplay.overlay}>
                <div className={weatherDisplay.weather_modal}>

                    {/* Bottone per aggiungere o rimuovere una location dai preferiti */}

                    <span className={`tooltip_wrapper ${weatherDisplay.fav_button_wrapper}`}>
                        <span className="weather_tooltip">
                            {!includesFavourite(undefined, searchLocation) ?
                                'Aggiungi ai preferiti' :
                                'Rimuovi dai preferiti'
                            }
                        </span>
                        <button
                            className="button_md"
                            onClick={() => changeFavourites(searchLocation)}
                        >

                            {/* Ternario per toggolare le due icone */}
                            {!includesFavourite(undefined, searchLocation) ?
                                <FaRegStar /> :
                                <FaStar />
                            }
                        </button>
                    </span>


                    <div className={weatherDisplay.weather_modal_header}>

                        {/* Informazioni sulla località */}
                        <h2>
                            <span className="tooltip_wrapper">
                                <span className="weather_tooltip">{searchLocation.country}</span>
                                <span className={`fi fi-${searchLocation.country_code.toLowerCase()}`}></span>
                            </span>
                            {` - ${searchLocation.name}`}


                        </h2>

                        <h3>{
                            `${searchLocation.admin1 ?
                                searchLocation.admin1 :
                                ''}
                            ${searchLocation.admin2 ?
                                searchLocation.admin2 !== searchLocation.name ?
                                    ' - ' + searchLocation.admin2 :
                                    '' :
                                ''}`
                        }</h3>
                    </div>

                    {hasWeatherConditions && <div>


                        {/* Informaizoni sul meteo */}

                        {/* Condizione attuale */}
                        <div className={weatherDisplay.current_meteo}>
                            <h4>{weatherCodeMap[searchLocation.weather_code]}</h4>
                            <img src={icons[`../../assets/icons/${weatherCodeMap[searchLocation.weather_code]}.png`]?.default} alt={weatherCodeMap[searchLocation.weather_code]} />
                        </div>

                        {/* Temperatura */}
                        <h4>{`${Math.round(searchLocation.temperature_2m)}°C`}</h4>
                        <div>
                            <h4>
                                Percepiti: {`${searchLocation.apparent_temperature}°C`}
                            </h4>
                        </div>

                        {/* Vento */}
                        <div className={weatherDisplay.wind}>
                            <h5>Vento:</h5>
                            {`${searchLocation.wind_speed_10m}km/h da ${windDirectionString(searchLocation.wind_direction_10m)}`}
                        </div>

                        {/* Umidità */}
                        <div className={weatherDisplay.humidity}>
                            <h5>Umidità: </h5>
                            {`${searchLocation.relative_humidity_2m}%`}
                        </div>

                        {/* Nuvolosità */}
                        <div className={weatherDisplay.cloud_cover}>
                            <h5>Nuvolosità:</h5>
                            {`${searchLocation.cloud_cover}%`}
                        </div>
                    </div>

                    }


                    {/* Bottone chiusura */}
                    <span className={`tooltip_wrapper ${weatherDisplay.close_button}`}>
                        <span className="weather_tooltip">Chiudi</span>
                        <button
                            onClick={() => {
                                setHasWeatherConditions(false)
                                setSearchLocation(null)
                            }}
                            className="button_md"
                        >
                            <FaXmark />

                        </button>
                    </span>
                </div>

            </div >
        </>


    )
}
export default WeatherDisplay;