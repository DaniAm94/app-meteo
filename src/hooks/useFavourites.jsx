import { useState } from "react";

const useFavourites = () => {

    // Al rendering del componente controllo se c'è una chiave favourites nel LocalStorage
    const favourites = localStorage.getItem("favourites");

    // Se non c'è', la creo e le assegno un array vuoto
    if (favourites === null) {
        localStorage.setItem("favourites", JSON.stringify([]))
    }

    // Passo una funzione allo useState per evitare calcoli non necessari ogni volta che il componente viene  renderizzato
    // Dato che la funzione verra invocata solo alla prima renderizzazione
    const [state, setState] = useState(() => {

        // Controllo se ci sono già dei preferiti nel localStorage altrimenti inizializzo un array vuoto 
        const favourites = localStorage.getItem("favourites");
        if (favourites === null) {
            localStorage.setItem("favourites", JSON.stringify([]));
        }

        // Controllo il valore preso dal localStorage:
        // Se è null assegno allo state un array vuoto
        return favourites === null ?
            [] :
            // Altrimenti restituisco restituisco l'array di preferiti
            JSON.parse(favourites);
    });

    /**
     * Funzione che modifica lo state e aggiorna il LocalStorage a seconda del payload fornito
     * @param {Function|Object} payload il nuovo stato, può essere assegnato con una funzione o direttamente con un oggetto 
     */
    const changeState = (payload) => {


        setState(curr => {

            // Calcolo lo state aggiornato in base al tipo di payload
            // Se è una funzione la eseguo e raccolgo il suo valore di ritorno dentro updatedState
            const updatedState = typeof payload === 'function' ?
                payload(curr) : (
                    // Altrimenti, se è un oggetto location:
                    // Controllo se è già presente tra i preferiti
                    includesFavourite(curr, payload) ?
                        // Se si, restituisco l'array filtrato senza il nuovo elemento
                        curr.filter(fav => fav.id !== payload.id) :
                        // Se no, restituisco un array contenente gli elementi già presenti più il nuovo elemento
                        [...curr, payload]
                );

            // Aggiorno il LocalStorage
            localStorage.setItem('favourites', JSON.stringify(updatedState));

            // Ritorno lo stato aggiornato
            return updatedState;

        })

    }

    /**
     * Funzione che controlla se un oggetto location è già presente nello state corrente
     * @param {Array} currentFavourites 
     * @param {Object} newFavourite 
     * @returns {Boolean} restituisce true se presente, false altrimenti
     */
    const includesFavourite = (currentFavourites = state, newFavourite) => currentFavourites.some(favourite => favourite.id === newFavourite.id);

    return [state, changeState, includesFavourite]
}
export default useFavourites;