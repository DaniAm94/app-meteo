import { useState } from "react";
import locationList from "./locationList.module.scss"
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import WeatherTooltip from "../../../../components/weatherTooltip/WeatherTooltip.jsx";

const LocationsList = ({ locations }) => {

    const { setSearchLocation } = useGlobalContext();

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <>
            {/* Se c'è almeno una location mostro la lista */}
            {locations?.length > 0 && <ul className={locationList.list + ' p-0 '} >
                {
                    // Mostro una lista di button per ogni location
                    locations.map((location, index) => <li
                        key={location.id}
                        className=""
                    >

                        <button
                            className="d-flex flex-column bg-transparent border-0 w-100 h-100"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => {
                                setSearchLocation(location)
                            }
                            }
                        >
                            <div className="w-100 p-1">
                                <WeatherTooltip
                                    text={location.country}
                                >
                                    <span className={`fi fi-${location.country_code.toLowerCase()}`}></span>
                                </WeatherTooltip>

                                {` - ${location.name}`}
                            </div>

                            {/* Mostra la regione e la provincia se presenti, e se la provincia non corrisponde alla località cercata */}
                            <small className={`${locationList.accordion_window} ${hoveredIndex === index ? locationList.triggered : ''} w-100`}>{`
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