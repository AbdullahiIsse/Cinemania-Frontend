import {Link, Outlet} from "react-router-dom";
import "./Navbar.scss";
import {Fragment} from "react";

export default function Navbar() {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <span> Cinemania</span>

                </Link>
                <div className='nav-links-container'>

                    <Link className='nav-link' to='/'>
                        Movies
                    </Link>

                    <Link className='nav-link' to='/TvSeries'>
                        Tv-Series
                    </Link>

                    <Link className='nav-link' to='/Person'>
                        Person
                    </Link>

                    <Link className='nav-link' to='/Favorites'>
                        Favorites
                    </Link>

                    <Link className='nav-link' to='/SignIn'>
                        Sign In
                    </Link>

                </div>

            </div>
            <Outlet/>
        </Fragment>
    );
}