import  {createContext, ReactNode, useEffect, useState} from 'react';
import {createUserToDbFromAuth, onAuthStateChangedListener} from "../Utils/Firebase.ts";



export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

type UserProviderProps = {
    children:ReactNode
}

export const UserProvider = ({children}:UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value:any = {currentUser, setCurrentUser};
    useEffect(() => {

        const unsubscribe = onAuthStateChangedListener(async (user: any) => {
            console.log(user)
            if (user) {
                await createUserToDbFromAuth(user)
            }
            setCurrentUser(user)
            console.log(currentUser)
        });

        return unsubscribe;
    }, [currentUser])
    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}
