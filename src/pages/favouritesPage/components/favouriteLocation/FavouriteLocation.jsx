import { FaTrashAlt } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
const icons = import.meta.glob("../../../../assets/icons/*.png", { eager: true });
import favouriteLocation from "./favouriteLocation.module.scss";
import WeatherTooltip from "../../../../components/weatherTooltip/WeatherTooltip";

const FavouriteLocation = ({ favLocation, onRemove, showDetails }) => {

    const { weatherCodeMap } = useGlobalContext();
    return (<>

        {/* Nome località */}
        <td >
            <div className="d-flex align-items-center column-gap-1">
                <WeatherTooltip
                    text={favLocation.country}
                >
                    <span className={` flex-shrink-0 fi fi-${favLocation.country_code.toLowerCase()}`}></span>
                </WeatherTooltip>

                {`${favLocation.name}`}
            </div>
        </td>

        {/* Regione */}
        <td className="d-none d-sm-table-cell">
            <div className="d-flex align-items-center">

                {favLocation.admin1}
            </div>
        </td>

        {/* Provincia */}
        <td className="d-none d-md-table-cell">
            <div className="d-flex align-items-center">
                {favLocation.admin2}
            </div>
        </td>

        {/* Temperatura */}
        <td>
            <div className="d-flex justify-content-center align-items-center">
                {favLocation.temperature_2m}
            </div>
        </td>

        {/* Meteo attuale */}
        <td className={favouriteLocation.location_item}>
            <div className="d-flex align-items-center">
                <WeatherTooltip
                    text={weatherCodeMap[favLocation.weather_code]}
                >
                    <img src={icons[`../../../../assets/icons/${weatherCodeMap[favLocation.weather_code]}.png`]?.default} alt={weatherCodeMap[favLocation.weather_code]} />
                </WeatherTooltip>
            </div>
        </td>

        {/* Pulsanti */}
        <td>
            <div className={favouriteLocation.button_group}>

                {/* Mostra dettagli */}
                <WeatherTooltip
                    text="Vedi dettagli"
                >
                    <button className="button_sm" onClick={() => showDetails(favLocation)}>
                        <CiCircleMore />
                    </button>
                </WeatherTooltip>

                {/* Elimina dai preferiti */}
                <WeatherTooltip
                    text="Rimuovi"
                >
                    <button className="button_sm" onClick={() => onRemove(favLocation)}>
                        <FaTrashAlt />
                    </button>
                </WeatherTooltip>
            </div>
        </td>
    </>
    )
}
export default FavouriteLocation;