import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.tsx";
import Genre from "./pages/genre/Genre.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import TvSerie from "./pages/tvserie/TvSerie.tsx";
import Favorites from "./pages/favorites/Favorites.tsx";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Genre" element={<Genre />} />
                <Route path="/TvSeries" element={<TvSerie />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Favorites" element={<Favorites />} />

                {/*route path * means whatever else route you go to. It will redirect you to an Error page. */}
                <Route path="*" element={<h1> Error page</h1>} />

            </Routes>
        </Router>
    );
}

export default App;

