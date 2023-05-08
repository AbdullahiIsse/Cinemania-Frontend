import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Cinemania</h1>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Genre" className="navbar-link">Genre</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/TvSeries" className="navbar-link">Tv - Series</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Profile" className="navbar-link">Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Favorites" className="navbar-link">Favorites</Link>
                </li>
            </ul>
            <form className="search-form">
                <input type="text" placeholder="Search" className="search-input" />
            </form>


        </nav>
    );
}
