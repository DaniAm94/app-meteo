import { FaRegStar, FaStar, FaXmark } from "react-icons/fa6";
import useFavourites from "../../../../hooks/useFavourites.jsx";
import weatherDisplay from "./weatherDisplay.module.scss"
import { useEffect, useRef } from "react";

const WeatherDisplay = ({ weatherConditions, onClose }) => {

    // Se le condizioni meteorologiche sono null blocco il rendering del componente
    if (weatherConditions === null) return null;

    // Destrutturo weatherConditions
    const {
        location,
        weather
    } = weatherConditions;

    // Mappatura per il weatherCode
    const weatherCodeMap = {
        0: "Cielo sereno",
        1: "Principalmente sereno",
        2: "Parzialmente nuvoloso",
        3: "Nuvoloso",
        45: "Nebbia",
        48: 45,
        51: "Pioviggine",
        53: 51,
        55: 51,
        56: 51,
        57: 51,
        61: "Pioggia",
        63: 61,
        65: 61,
        66: 61,
        67: 61,
        71: "Neve",
        73: 71,
        75: 71,
        77: 71,
        80: "Acquazzone",
        81: 80,
        82: 80,
        85: "Nevischio",
        86: 85,
        95: "Temporale",
        96: "Grandine",
        99: 96
    }


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
                    <button
                        className={weatherDisplay.fav_button}
                        onClick={() => setFavourites(location)}
                    >

                        {/* Ternario per toggolare le due icone */}
                        {!includesFavourite(undefined, location) ?
                            <FaRegStar /> :
                            <FaStar />
                        }
                    </button>
                    <div className={weatherDisplay.weather_modal_header}>


                        {/* Informazioni sulla località */}
                        <h2 className="d-flex justify-content-between">
                            {`${location.country_code} - ${location.name}`}


                        </h2>

                        <h3>{`
            ${location.admin1 ?
                                location.admin1 :
                                ''}
            ${location.admin2 ?
                                location.admin2 !== location.name ?
                                    ' - ' + location.admin2 :
                                    '' :
                                ''}
              `}</h3>
                    </div>


                    {/* Informaizoni sul meteo */}

                    {/* Condizione attuale */}
                    <h4>{weatherCodeMap[weather.weather_code]}</h4>

                    {/* Temperatura */}
                    <h4>{`${Math.round(weather.temperature_2m)}°C`}</h4>
                    <div>
                        <h4>
                            Percepiti: {`${weather.apparent_temperature}°C`}
                        </h4>
                    </div>

                    {/* Vento */}
                    <div className={weatherDisplay.wind}>
                        <h5>Vento:</h5>
                        {`${weather.wind_speed_10m}km/h da ${windDirectionString(weather.wind_direction_10m)}`}
                    </div>

                    {/* Umidità */}
                    <div className={weatherDisplay.humidity}>
                        <h5>Umidità: </h5>
                        {`${weather.relative_humidity_2m}%`}
                    </div>

                    {/* Nuvolosità */}
                    <div className={weatherDisplay.cloud_cover}>
                        <h5>Nuvolosità:</h5>
                        {`${weather.cloud_cover}%`}
                    </div>

                    {/* Bottone chiusura */}
                    <button
                        onClick={onClose}
                        className={weatherDisplay.close_button}
                    >
                        <FaXmark />

                    </button>
                </div>

            </div>
        </>

    )
}
export default WeatherDisplay;