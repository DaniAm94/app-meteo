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

        // Se il payload è una funzione
        if (typeof payload === 'function') {

            // Passo la funzione al setState per aggiornare lo state
            setState(payload);

            // Passo una funzione al setState per poter leggere lo state attuale
            setState(curr => {

                // Aggiorno il LocalStorage con il valore dello state appena aggiornato
                localStorage.setItem('favourites', JSON.stringify(curr));

                // Ritorno allo state il valore precedente che avevo già aggiornato
                return curr;
            })

            // Se il payload non è una funzione (sarà la nuova location da salvare)
        } else {

            // La assegno ad una nuova variabile (il nome è più esplicativo)
            const newFavourite = payload;

            // Per settare il nuovo state di preferiti...
            setState(curr => {
                // Creo l'array aggiornato: array corrente + nuovo preferito
                const updatedState = [...curr, newFavourite];

                // Aggiorno il valore dei preferiti nel LocalStorage
                localStorage.setItem('favourites', JSON.stringify(updatedState));

                // Ritorno il valore aggiornato allo state
                return updatedState;
            })
        }
    }
    return [state, changeState]
}
export default useFavourites;