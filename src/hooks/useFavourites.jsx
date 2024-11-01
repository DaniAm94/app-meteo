import { useState } from "react";

const useFavourites = () => {

    // Al rendering del componente controllo se c'è una chiave favourites nel LocalStorage
    const favourites = localStorage.getItem("favourites");

    // Se non c'è', la creo e le assegno un array vuoto
    if (favourites === null) {
        localStorage.setItem("favourites", JSON.stringify([]))
    }
    return (
        <>

        </>
    )
}
export default useFavourites;