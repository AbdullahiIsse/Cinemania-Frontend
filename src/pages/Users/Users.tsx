import {useContext} from "react";
import {UserContext} from "../../Context/UserContext.tsx";
import UsersList from "../../components/Users/Users-list.tsx";


const Users = () => {
    const {currentUser, userList} = useContext(UserContext)
    return (<div>
        {
            currentUser === null ? <h1> Sign up to view this page </h1> : <UsersList data={userList}/>
        }
    </div>)

};

export default Users;