const geocodeUrl = import.meta.env.VITE_BASE_GEOCODING_URL; // Base url per la geocodifica
const weatherUrl = import.meta.env.VITE_BASE_METEO_URL; // Base url per le condizioni meteo
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import LocationsList from "../../components/locationsList/LocationsList";
import WeatherDisplay from "../../components/weatherDisplay/WeatherDisplay";

const HomePage = () => {


    // Parametri di default per la geocodifica
    const defaultParams = {
        count: 4,   // Numero risultati (fino ad un massimo di 100)
        language: "it"  // Lingua in cui si desidera ricevere la risposta (inglese di default)
    }

    // Nome della località da cercare
    const [name, setName] = useState("");

    //Array in cui inseriro la lista di località che hanno una corrispondenza con quella inserita dall'utente
    const [locations, setLocations] = useState([])

    const [locationWeather, setLocationWeather] = useState(null)


    /**
     * Funzione che cerca le località che hanno una corrispondenza con  quella inserita dall'utente
     * @param {String} newValue la stringa inserita dall'utente
     */
    const searchLocations = useCallback(debounce(async (newValue) => {

        // Blocco la funzione se newValue è una stringa minore di 3 caratteri e svuoto l'array locations
        if (newValue.trim().length < 3) {
            setLocations([])
            return
        };

        try {
            // Chiamata axios all'endpoint per la geocodifica (passo un oggetto con chiave params che racchiude i parametri per la query string)
            const { data } = await axios.get(geocodeUrl, {
                params: {
                    ...defaultParams,
                    name: newValue //Per problemi di asincronicità di setName devo passare direttamente il newValue perchè il campo name potrebbe non essere ancora aggiornato
                }
            })
            console.log(data.results)
            setLocations(data.results)  // Salvo il risultato nel mio state locations
        } catch (err) {
            console.error(err)
        }
    }, 500),
        [] // Le dipendenze vuote assicurano che debounce venga memorizzato solo una volta
    );

    const handleChange = (newValue) => {

        // Aggiorno il valore di name
        setName(newValue);

        //Cerco le location che matchano con newValue
        searchLocations(newValue)
    }

    const fetchWeatherConditions = async (location) => {

        // Configuro i miei params per la query string
        const params = {

            // Coordinate della località cercata
            latitude: location.latitude,
            longitude: location.longitude,

            // Dati relativi al meteo attuale
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",

            timezone: "auto",

        }

        try {
            const { data } = await axios.get(weatherUrl, { params });
            console.log(data.current);
            setLocationWeather({
                place: location.name,
                country: location.country_code,
                ...data.current
            })
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <>
            <h3>Home</h3>
            <form onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Località"
                    name="name"
                    value={name}
                    onChange={e => handleChange(e.target.value)}
                />

                {/* Lista delle località */}
                <LocationsList locations={locations} fetchWeatherConditions={fetchWeatherConditions} />

                {/* Sezione che mostra le condizioni meteo della località scelta */}
                <WeatherDisplay weatherConditions={locationWeather} />
            </form>
        </>
    )
}
export default HomePage;