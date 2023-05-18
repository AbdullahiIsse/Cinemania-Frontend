import SignIn from "../../components/Sign-in/sign-in.tsx";
import SignUp from "../../components/Sign-up/sign-up.tsx";
import './Authentication.css'
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext.tsx";

const Authentication = () => {
    const {currentUser} = useContext(UserContext)
    return (
        <div>
            {currentUser === null ? (
                <div className='authentication-container'>
                <SignIn/>
                <SignUp/>
                </div>
            ): <h1>Sign out to create or use a different account </h1>}

        </div>
    )


};

export default Authentication;