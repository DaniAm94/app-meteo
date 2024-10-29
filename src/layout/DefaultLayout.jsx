import { NavLink, Outlet } from "react-router-dom";
import "./defaultLayout.scss"
const DefaultLayout = () => {
    return (
        <>
            <header >
                <nav className="container">
                    <ul>
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
                <div className="container">

                    <Outlet></Outlet>
                </div>
            </main>
            <footer >
                <div className="container footer-content">
                    Footer
                </div>
            </footer>
        </>
    )
}
export default DefaultLayout;