import { Children, createContext, useContext, useState } from "react";

const Context = createContext();

const FavouritesProvider = ({ children }) => {


    // Al rendering del componente controllo se c'è una chiave favourites nel LocalStorage
    const strFavourites = localStorage.getItem("favourites");

    // Se non c'è', la creo e le assegno un array vuoto
    if (strFavourites === null) {
        localStorage.setItem("favourites", JSON.stringify([]))
    }

    // Passo una funzione allo useState per evitare calcoli non necessari ogni volta che il componente viene  renderizzato
    // Dato che la funzione verra invocata solo alla prima renderizzazione
    const [favourites, setFavourites] = useState(() => {

        // Controllo il valore preso dal localStorage:
        // Se è null assegno allo state un array vuoto
        return strFavourites === null ?
            [] :
            // Altrimenti restituisco restituisco l'array di preferiti
            JSON.parse(strFavourites);
    });



    /**
     * Funzione che modifica lo state e aggiorna il LocalStorage a seconda del payload fornito
     * @param {Function|Object} payload il nuovo stato, può essere assegnato con una funzione o direttamente con un oggetto 
     */
    const changeFavourites = (payload) => {


        setFavourites(curr => {

            // Calcolo lo state aggiornato in base al tipo di payload
            // Se è una funzione la eseguo e raccolgo il suo valore di ritorno dentro updatedState
            const updatedState = typeof payload === 'function' ?
                payload(curr) : (

                    // Altrimenti, se è un oggetto location...
                    // Controllo se è già presente tra i preferiti
                    includesFavourite(curr, payload) ?

                        // Se si, restituisco l'array filtrato senza il nuovo elemento
                        curr.filter(fav => fav.id !== payload.id) :

                        // Se no, restituisco un array contenente gli elementi già presenti più il nuovo elemento
                        [payload, ...curr]
                );

            // Aggiorno il LocalStorage
            localStorage.setItem('favourites', JSON.stringify(updatedState));

            // Ritorno lo stato aggiornato
            return updatedState;

        })

    }

    /**
     * Funzione che verifica se un oggetto location è già presente tra i preferiti
     * @param {Array} currentFavourites array attuale di preferiti, di defaul avrà valore corrente dello state 
     * @param {*} newFavourite il nuovo elemento da controllare
     * @returns {Boolean} restituisce true se presente, false altriemnti
     */
    const includesFavourite = (currentFavourites = favourites, newFavourite) => currentFavourites.some(favourite => favourite.id === newFavourite.id);



    return (
        <Context.Provider
            value={{ favourites, changeFavourites, includesFavourite }}>
            {children}
        </Context.Provider>
    )
}

const useFavouritesContext = () => {
    const context = useContext(Context);
    if (context === undefined) throw new Error('Non sei dentro al provider dei preferiti');
    return context
}
export { FavouritesProvider, useFavouritesContext };