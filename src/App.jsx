import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/homePage/HomePage";
import FavouritesPage from "./pages/favouritesPage/FavouritesPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Lista rotte */}
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="preferiti" element={<FavouritesPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
