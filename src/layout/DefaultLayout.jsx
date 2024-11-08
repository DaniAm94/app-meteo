import { NavLink, Outlet } from "react-router-dom";
import "./defaultLayout.scss"
import AppLoader from "../components/appLoader/AppLoader";
import WeatherDisplay from "../components/weatherDisplay/WeatherDisplay";
import { useGlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/logo/logo.png"


const DefaultLayout = () => {

    const { isLoading, searchLocation } = useGlobalContext();
    return (
        <>
            <header >
                <nav className="container">
                    <ul>
                        <li className="d-flex justify-content-center align-items-center">
                            <img className="rounded rounded-5" src={logo} alt="logo" />
                        </li>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/preferiti">Preferiti</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main >
                <div className="container h-100 d-flex align-items-start  justify-content-center">
                    <div className="jumbotron"></div>
                    <Outlet></Outlet>
                </div>

                {/* Modale che mostra le condizioni meteo della località scelta */}
                {searchLocation ? <WeatherDisplay isFavourite={false} /> : null}

                {isLoading &&
                    <AppLoader />
                }
            </main>
            <footer >
                <div className="container h-100">
                    <div className="row row-cols-3 h-100 d-flex align-items-center">

                        <p className="col d-flex flex-column flex-md-row gap-sm-1 mb-0">© 2024 App Meteo <span className="d-none d-md-inline">|</span>   <a href="https://www.linkedin.com/in/danilo-amico-6a6708303/?trk=opento_sprofile_topcard" target="_blank">Danilo Amico</a></p>
                        <p className="col d-flex flex-column flex-md-row column-gap-md-1  mb-0">Dati meteo forniti da <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open Meteo API</a></p>
                        <div className="footer-links col d-flex flex-column flex-md-row column-gap-md-1">
                            <a href="mailto:dani.amico94@gmail.com">Contattami</a>
                            <span className="d-none d-md-inline">
                                |
                            </span>
                            <a href="https://github.com/DaniAm94/app-meteo" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default DefaultLayout;