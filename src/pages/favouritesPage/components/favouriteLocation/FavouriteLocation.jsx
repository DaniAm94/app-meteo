import { FaTrashAlt } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

import { useGlobalContext } from "../../../../contexts/GlobalContext";
const icons = import.meta.glob("../../../../assets/icons/*.png", { eager: true });
import favouriteLocation from "./favouriteLocation.module.scss";

const FavouriteLocation = ({ favLocation, onRemove, showDetails }) => {

    const { weatherCodeMap } = useGlobalContext();
    return (<>

        {/* Nome località */}
        <td className="d-flex align-items-center column-gap-1">
            <span className={` flex-shrink-0 fi fi-${favLocation.country_code.toLowerCase()}`}></span>
            {`${favLocation.name}`}
        </td>

        {/* Regione */}
        <td className="d-none d-sm-table-cell">
            {favLocation.admin1}
        </td>

        {/* Provincia */}
        <td className="d-none d-md-table-cell">
            {favLocation.admin2}
        </td>

        {/* Temperatura */}
        <td>
            {favLocation.temperature_2m}
        </td>

        {/* Meteo attuale */}
        <td className={favouriteLocation.location_item}>
            <span className="tooltip_wrapper">
                <span className="weather_tooltip">
                    {weatherCodeMap[favLocation.weather_code]}
                </span>
                <img src={icons[`../../../../assets/icons/${weatherCodeMap[favLocation.weather_code]}.png`]?.default} alt={weatherCodeMap[favLocation.weather_code]} />
            </span>
        </td>

        {/* Pulsanti */}
        <td>
            <div className={favouriteLocation.button_group}>

                {/* Mostra dettagli */}
                <span className="tooltip_wrapper">
                    <span className="weather_tooltip">Vedi dettagli</span>
                    <button className="button_sm" onClick={() => showDetails(favLocation)}>
                        <CiCircleMore />

                    </button>
                </span>

                {/* Elimina dai preferiti */}
                <span className="tooltip_wrapper">
                    <span className="weather_tooltip">Rimuovi</span>

                    <button className="button_sm" onClick={() => onRemove(favLocation)}>
                        <FaTrashAlt />
                    </button>
                </span>
            </div>
        </td>
    </>
    )
}
export default FavouriteLocation;