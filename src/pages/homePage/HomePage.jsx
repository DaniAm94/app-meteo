const geocodeUrl = import.meta.env.VITE_BASE_GEOCODING_URL; // Base url per la geocodifica
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import LocationsList from "./components/locationsList/LocationsList";
import WeatherDisplay from "../../components/weatherDisplay/WeatherDisplay";
import homePage from "./homePage.module.scss"
import { useGlobalContext } from "../../contexts/GlobalContext";

const HomePage = () => {

    const { searchLocation, setSearchLocation } = useGlobalContext();


    // Parametri di default per la geocodifica
    const defaultParams = {
        count: 4,   // Numero risultati (fino ad un massimo di 100)
        language: "it"  // Lingua in cui si desidera ricevere la risposta (inglese di default)
    }

    // Nome della località da cercare
    const [name, setName] = useState("");

    //Array in cui inseriro la lista di località che hanno una corrispondenza con quella inserita dall'utente
    const [locations, setLocations] = useState([])




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
            setLocations(data.results)  // Salvo il risultato nel mio state locations
        } catch (err) {
            console.error(err)
        }
    }, 500),
        [] // Le dipendenze vuote assicurano che debounce venga memorizzato solo una volta
    );


    /**
     * Funzione che all'input dell'utente salva il valore inserito nello state name e cerca le locations che hanno una corrispondenza 
     * @param {String} newValue 
     */
    const handleChange = (newValue) => {

        // Aggiorno il valore di name
        setName(newValue);

        //Cerco le location che matchano con newValue
        searchLocations(newValue)
    }






    return (
        <>
            <form className={`${homePage.search_form}`} onSubmit={e => e.preventDefault()}>

                <div className={homePage.search_group}>
                    <label htmlFor="location-input"> Scopri il meteo</label>
                    <input
                        id="location-input"
                        type="text"
                        placeholder="Cerca località"
                        name="name"
                        value={name}
                        onChange={e => handleChange(e.target.value)}
                    />
                </div>

                {/* Lista delle località */}
                <LocationsList locations={locations} />

            </form>

        </>
    )
}
export default HomePage;