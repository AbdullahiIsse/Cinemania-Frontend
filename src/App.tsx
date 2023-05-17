import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Person from "./pages/person/Person.tsx";

import TvSeries from "./pages/tvseries/TvSeries.tsx";
import Favorites from "./pages/favorites/Favorites.tsx";
import Movie_Details from "./pages/moviedetails/Movie_Details.tsx";
import Serie_Details from "./pages/seriedetails/Serie_Details.tsx";
import Person_Details from "./pages/persondetails/Person_Details.tsx";
import Navbar from "./pages/Navigation/Navbar.tsx";

function App() {
    return (


            <Routes>
                <Route path="/" element={<Navbar />} >
                    <Route index element={<Home />} />
                    <Route path="/tvseries" element={<TvSeries />} />
                    <Route path="/person" element={<Person />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/moviedetails/:id" element={<Movie_Details />} />
                    <Route path="/seriedetails/:id" element={<Serie_Details />} />
                    <Route path="/persondetails/:id" element={<Person_Details />} />
                    {/*route path * means whatever else route you go to. It will redirect you to an Error page. */}
                    <Route path="*" element={<h1> Error page</h1>} />
                </Route>
            </Routes>

    );
}

export default App;
