import appLoader from "./appLoader.module.scss";
import loaderIcon from "../../assets/loader/rain.gif";
const AppLoader = () => {
    return (
        <div className={appLoader.overlay}>
            <img
                className={appLoader.loader}
                src={loaderIcon}
                alt="loader" />

        </div>
    )
}
export default AppLoader;