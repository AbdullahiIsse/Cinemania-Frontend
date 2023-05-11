import searchImage from "../../assets/searchImage.jpeg";
import "./Searchbar.css";

export default function Searchbar() {
    return (

        <div>
            <img className="searchImage" src={searchImage} alt="logo"/>
            <div className="title">
                <h2>Welcome.</h2>
                <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>

                <form className="search-form">
                    <input type="text" placeholder="Search" className="search-input" />
                </form>
            </div>
        </div>

    )
}


