import {useContext} from "react";
import {Link, Outlet} from "react-router-dom";
import "./Navbar.scss";
import {Fragment} from "react";
import {UserContext} from "../../Context/UserContext.tsx";
import {signOutUser} from "../../Utils/Firebase.ts";

export default function Navbar() {
    const {currentUser} = useContext(UserContext)
    const signOutHandler = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <span> Cinemania</span>
                </Link>
                <div className='nav-links-container'>

                    <Link className='nav-link' to='/movies'>
                        Movies
                    </Link>

                    <Link className='nav-link' to='/TvSeries'>
                        Tv-Series
                    </Link>

                    <Link className='nav-link' to='/Person'>
                        Persons
                    </Link>

                    <Link className='nav-link' to='/Statistic'>
                        Statistic
                    </Link>

                    {currentUser === null ?
                        <Link className='nav-link' to='/auth'>
                            Sign In
                        </Link> : (<div>
                                <Link className='nav-link' to='/Favorites'>
                                    Favorites
                                </Link>
                                <Link className='nav-link' onClick={signOutHandler} to={""}>
                                    <span>Sign Out</span>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
            <Outlet/>
        </Fragment>
    );
}