import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Person from "./pages/person/Person.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import TvSeries from "./pages/tvseries/TvSeries.tsx";
import Favorites from "./pages/favorites/Favorites.tsx";
import Movie_Details from "./pages/moviedetails/Movie_Details.tsx";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tvseries" element={<TvSeries />} />
                <Route path="/person" element={<Person />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/moviedetails/:id" element={<Movie_Details />} />

                {/*route path * means whatever else route you go to. It will redirect you to an Error page. */}
                <Route path="*" element={<h1> Error page</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
