import axios from "axios";
import { createContext, useContext, useState } from "react";
const weatherUrl = import.meta.env.VITE_BASE_METEO_URL; // Base url per le condizioni meteo


const Context = createContext();

const ContextProvider = ({ children }) => {

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

    // State che salva la località con le relative condizioni meteo
    const [searchLocation, setSearchLocation] = useState(null)

    // Indica se la location cercata ha le condizioni meteo
    const [hasWeatherConditions, setHasWeatherConditions] = useState(false);




    // State che controlla il loader dell'app
    const [isLoading, setIsLoading] = useState(false);



    /**
     * Funzione che raccoglie le condizioni metereologiche di una località 
     * @param {Object} location località cercata
     * @param {Boolean} hasReturn se deve restituire la response o salvarla nello state
     * @returns {Object} restituisce un oggetto con le condizioni metereologiche
     */
    const fetchWeatherConditions = async (location, hasReturn) => {

        setIsLoading(true);
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


            if (hasReturn) {
                return data.current;

            } else {

                setSearchLocation({
                    ...location,
                    ...data.current
                })
                setHasWeatherConditions(true);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Context.Provider
            value={{ fetchWeatherConditions, searchLocation, setSearchLocation, hasWeatherConditions, setHasWeatherConditions, weatherCodeMap, isLoading, setIsLoading }}
        >
            {children}
        </Context.Provider>
    )
}

const useGlobalContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('Non sei dentro al global provider')
    }
    return context;
}
export { ContextProvider, useGlobalContext };