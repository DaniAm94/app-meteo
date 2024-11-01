import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import useFavourites from "../../hooks/useFavourites";


const WeatherDisplay = ({ weatherConditions }) => {

    // Se le condizioni meteorologiche sono null blocco il rendering del componente
    if (weatherConditions === null) return;

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
        <section>
            <hr />

            {/* Bottone per aggiungere o rimuovere una location dai preferiti */}
            <button onClick={() => setFavourites(location)}>

                {/* Ternario per toggolare le due icone */}
                {!includesFavourite(undefined, location) ?
                    <FaRegStar /> :
                    <FaStar />
                }
            </button>

            {/* Informazioni sulla località */}
            <h2>{`${location.country_code} - ${location.name}`}</h2>

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

            {/* Informaizoni sul meteo */}
            <h4>{`${Math.round(weather.temperature_2m)}°C | ${weatherCodeMap[weather.weather_code]}`}</h4>
            <div>
                <h5>Temperatura percepita</h5>
                {`${weather.apparent_temperature}°C`}
            </div>
            <div>
                <h5>Vento</h5>
                {`${weather.wind_speed_10m}km/h da ${windDirectionString(weather.wind_direction_10m)}`}
            </div>
            <div>
                <h5>Umidità</h5>
                {`${weather.relative_humidity_2m}%`}
            </div>
            <div>
                <h5>Nuvolosità</h5>
                {`${weather.cloud_cover}%`}
            </div>

        </section>
    )
}
export default WeatherDisplay;