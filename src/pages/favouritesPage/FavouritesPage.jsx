import useFavourites from "../../hooks/useFavourites";


const FavouritesPage = () => {

    const [favourites, setFavourites, includesFavourite] = useFavourites()

    return (
        <>
            <h1>Pagina preferiti</h1>
            <ul>
                {
                    favourites.map(favourite => <li
                        key={favourite.id}
                    >
                        {favourite.name}
                    </li>)
                }
            </ul>
        </>
    )
}
export default FavouritesPage;