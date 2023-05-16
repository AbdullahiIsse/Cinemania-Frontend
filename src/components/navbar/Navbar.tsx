import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to={`/`}>
                <img className="logo" src={logo} />
            </Link>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Movies</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/TvSeries" className="navbar-link">Tv - Series</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Person" className="navbar-link">Person</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Favorites" className="navbar-link">Favorites</Link>
                </li>
            </ul>
        </nav>
    );
}