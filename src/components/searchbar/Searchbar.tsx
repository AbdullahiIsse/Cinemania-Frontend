import searchImage from "../../assets/searchImage.jpeg";
import "./Searchbar.css";

export default function Searchbar() {
    return (

        <div className="searchImage">
            <img src={searchImage} alt="logo"/>
            <div className="title">
                <h2>Welcome</h2>
                <h3>Millions of movies, TV - Series and personalized toplist to discover. Explore now.</h3>

                <form className="search-form">
                    <input type="text" placeholder="Search for a movie title..." className="search-input" />
                </form>
            </div>
        </div>

    )
}


