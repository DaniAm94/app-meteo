import { FaRegStar, FaStar, FaXmark } from "react-icons/fa6";
import useFavourites from "../../hooks/useFavourites.jsx";
import weatherDisplay from "./weatherDisplay.module.scss"
const icons = import.meta.glob("../../assets/icons/*.png", { eager: true });
import { useGlobalContext } from "../../contexts/GlobalContext.jsx";


const WeatherDisplay = ({ location, onClose, isFavourite }) => {

    // Se le condizioni meteorologiche sono null blocco il rendering del componente
    if (location === null) return null;


    const { weatherCodeMap } = useGlobalContext()


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

    const [favourites, setFavourites, includesFavourite] = useFavourites();




    return (
        <>
            <div className={weatherDisplay.overlay}>
                <div className={weatherDisplay.weather_modal}>

                    {/* Bottone per aggiungere o rimuovere una location dai preferiti */}
                    {!isFavourite && <span className={`tooltip_wrapper ${weatherDisplay.fav_button_wrapper}`}>
                        <span className="weather_tooltip">Aggiungi ai preferiti</span>
                        <button
                            className="button_md"
                            onClick={() => setFavourites(location)}
                        >

                            {/* Ternario per toggolare le due icone */}
                            {!includesFavourite(undefined, location) ?
                                <FaRegStar /> :
                                <FaStar />
                            }
                        </button>
                    </span>
                    }
                    <div className={weatherDisplay.weather_modal_header}>


                        {/* Informazioni sulla località */}
                        <h2>
                            <span className={`fi fi-${location.country_code.toLowerCase()}`}></span>
                            {` - ${location.name}`}


                        </h2>

                        <h3>{
                            `${location.admin1 ?
                                location.admin1 :
                                ''}
    ${location.admin2 ?
                                location.admin2 !== location.name ?
                                    ' - ' + location.admin2 :
                                    '' :
                                ''}`
                        }</h3>
                    </div>


                    {/* Informaizoni sul meteo */}

                    {/* Condizione attuale */}
                    <div className={weatherDisplay.current_meteo}>
                        <h4>{weatherCodeMap[location.weather_code]}</h4>
                        <img src={icons[`../../assets/icons/${weatherCodeMap[location.weather_code]}.png`]?.default} alt={weatherCodeMap[location.weather_code]} />
                    </div>

                    {/* Temperatura */}
                    <h4>{`${Math.round(location.temperature_2m)}°C`}</h4>
                    <div>
                        <h4>
                            Percepiti: {`${location.apparent_temperature}°C`}
                        </h4>
                    </div>

                    {/* Vento */}
                    <div className={weatherDisplay.wind}>
                        <h5>Vento:</h5>
                        {`${location.wind_speed_10m}km/h da ${windDirectionString(location.wind_direction_10m)}`}
                    </div>

                    {/* Umidità */}
                    <div className={weatherDisplay.humidity}>
                        <h5>Umidità: </h5>
                        {`${location.relative_humidity_2m}%`}
                    </div>

                    {/* Nuvolosità */}
                    <div className={weatherDisplay.cloud_cover}>
                        <h5>Nuvolosità:</h5>
                        {`${location.cloud_cover}%`}
                    </div>

                    {/* Bottone chiusura */}
                    <button
                        onClick={onClose}
                        className={`button_md ${weatherDisplay.close_button}`}
                    >
                        <FaXmark />

                    </button>
                </div>

            </div>
        </>

    )
}
export default WeatherDisplay;