import { FaRegStar, FaStar, FaXmark } from "react-icons/fa6";
import weatherDisplay from "./weatherDisplay.module.scss"
import WeatherTooltip from "../weatherTooltip/WeatherTooltip.jsx";
const icons = import.meta.glob("../../assets/icons/*.png", { eager: true });
import { useGlobalContext } from "../../contexts/GlobalContext.jsx";
import { useFavouritesContext } from "../../contexts/FavouritesContext.jsx";
import { useEffect } from "react";
import TemperatureChart from "./components/temperatureChart/TemperatureChart.jsx";


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
        const index = Math.round((directionDegrees % 360) / 45) % 8; // il modulo 8 gestisce valori oltre 360

        return directions[index];
    }

    return (
        <>

            <div className={weatherDisplay.overlay}>
                <div className={weatherDisplay.weather_modal}>

                    {/* Bottone per aggiungere o rimuovere una location dai preferiti */}


                    <WeatherTooltip
                        className={weatherDisplay.fav_button_wrapper}
                        text={
                            !includesFavourite(undefined, searchLocation) ?
                                'Aggiungi ai preferiti' :
                                'Rimuovi dai preferiti'
                        }>
                        <button
                            className={`button_md ${includesFavourite(undefined, searchLocation) ? 'button_filled' : ''}`}
                            onClick={() => changeFavourites(searchLocation)}
                        >

                            {/* Ternario per toggolare le due icone */}
                            {!includesFavourite(undefined, searchLocation) ?
                                <FaRegStar /> :
                                <FaStar />
                            }
                        </button>
                    </WeatherTooltip>


                    <div className={weatherDisplay.weather_modal_header}>

                        {/* Informazioni sulla località */}
                        <h2>
                            <WeatherTooltip
                                text={searchLocation.country}
                            >
                                <span className={`fi fi-${searchLocation.country_code.toLowerCase()}`}></span>
                            </WeatherTooltip>

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
                        <div className="d-flex align-items-center column-gap-2">
                            <h4>{`${Math.round(searchLocation.temperature_2m)}°C`}</h4>
                            |
                            <h4>
                                Percepiti: {`${Math.round(searchLocation.apparent_temperature)}°C`}
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

                    <TemperatureChart location={searchLocation} />

                    {/* Bottone chiusura */}
                    <WeatherTooltip
                        className={weatherDisplay.close_button}
                        text="Chiudi"
                    >
                        <button
                            onClick={() => {
                                setHasWeatherConditions(false)
                                setSearchLocation(null)
                            }}
                            className="button_md"
                        >
                            <FaXmark />

                        </button>
                    </WeatherTooltip>
                </div>

            </div >
        </>


    )
}
export default WeatherDisplay;