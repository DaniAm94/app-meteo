const LocationsList = ({ locations, fetchWheatherConditions }) => {
    return (
        <>
            {/* Se c'è almeno una location mostro la lista */}
            {locations?.length > 0 && <ul>
                {
                    // Mostro una lista di button per ogni location
                    locations.map(location => <li
                        key={location.id}
                    >
                        <button onClick={() => fetchWheatherConditions(location)}>
                            {`${location.country_code} - ${location.name}`}
                            <hr />

                            {/* Mostra la regione e la provincia se presenti, e se la provincia non corrisponde alla località cercata */}
                            <small>{`
                                    ${location.admin1 ? location.admin1 : ''}

                                    ${location.admin2 ?
                                    location.admin2 !== location.name ?
                                        ' - ' + location.admin2
                                        : ''
                                    : ''}
                                     `}
                            </small>
                        </button>
                    </li>)
                }
            </ul>}
        </>
    )
}
export default LocationsList;