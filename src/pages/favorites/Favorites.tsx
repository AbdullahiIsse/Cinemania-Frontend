import {FavoritesList} from "../../components/Favorites-list/Favorites-list.tsx";
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext.tsx";
import {FavoritesContext} from "../../Context/FavoritesContext.tsx";

export default function Favorites() {
    const {currentUser} = useContext(UserContext)
    const {favoritesListItems} = useContext(FavoritesContext)

    return (
        <div>
            {
                currentUser === null ? <h1>  Sign up to view this page   </h1>:     <FavoritesList data={favoritesListItems} />
            }
        </div>

    )
}
