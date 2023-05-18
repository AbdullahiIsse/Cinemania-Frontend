import {FavoritesList} from "../../components/Favorites-list/Favorites-list.tsx";
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext.tsx";

export default function Favorites() {
    const {currentUser} = useContext(UserContext)
    const data:any =
        [{
                "name": "Athena Weissnat",
                "company": "Little - Rippin",
                "email": "Elouise.Prohaska@yahoo.com"
            }];
    return (
        <div>
            {
                currentUser === null ? <h1>  Sign up to view this page   </h1>:     <FavoritesList data={data} />
            }
        </div>

    )
}
