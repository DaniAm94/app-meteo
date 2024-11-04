import appLoader from "./appLoader.module.scss";
// import loaderIcon from "../../assets/loader/rain.gif";
const AppLoader = () => {
    return (
        <div className={appLoader.overlay}>
            {/* <img
                className={appLoader.loader}
                src="/loader/rain-ezgif.com-split.webp"
                alt="loader" /> */}
            <div className={appLoader.loader}>
            </div>

        </div>
    )
}
export default AppLoader;