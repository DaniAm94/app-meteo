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
    return (
        <>

        </>
    )
}
export default useFavourites;