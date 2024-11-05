import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/homePage/HomePage";
import FavouritesPage from "./pages/favouritesPage/FavouritesPage";
import { ContextProvider } from "./contexts/GlobalContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";

function App() {

  return (
    <BrowserRouter>
      <ContextProvider>
        <FavouritesProvider>
          <Routes>

            {/* Lista rotte */}
            <Route element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="preferiti" element={<FavouritesPage />} />
            </Route>

          </Routes>
        </FavouritesProvider>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
