import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg";

export default function Navbar() {
    return (
        <nav className="navbar">
            <img className="logo" src={logo} alt="logo"/>
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
        </nav>
    );
}


{/*  <form className="search-form">
                <input type="text" placeholder="Search" className="search-input" />
            </form>*/}