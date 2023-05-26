import { createContext, ReactNode, useEffect, useState } from 'react';
import {createUserToDbFromAuth, onAuthStateChangedListener} from "../Utils/Firebase.ts";

export type UserContextType = {
    currentUser: any;
    setCurrentUser: (user: any) => void;
    userList: any[];
    setUserList: (list: any[]) => void;
};

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => {},
    userList: [],
    setUserList: () => {},
});

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [userList, setUserList] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user: any) => {
            console.log(user);
            if (user) {
                await createUserToDbFromAuth(user);
            }
            setCurrentUser(user);
            console.log(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(`https://cinmania1.azurewebsites.net/api/user/${currentUser?.uid}`);
                const userList = await response.json();
                setUserList(userList);
                console.log(userList);
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser) {
            getUsers();
        }
    }, [currentUser]);

    const value: UserContextType = {
        currentUser,
        setCurrentUser,
        userList,
        setUserList,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
