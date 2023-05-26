import {useContext} from "react";
import {UserContext} from "../../Context/UserContext.tsx";
import FollowerList from "../../components/FollowerList/follower-list.tsx";


const Follower = () => {
    const {currentUser} = useContext(UserContext)

    return (  <div>
            {
                currentUser === null ? <h1>  Sign up to view this page   </h1>:     <FollowerList/>
            }
        </div>
    )

};

export default Follower;