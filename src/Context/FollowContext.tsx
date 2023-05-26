import  { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

interface Follower {
    userId: string;
    followedId: string;
    // Add any additional properties specific to a follower
}

export const FollowerContext = createContext<{
    followersList: Follower[];
}>({
    followersList: [],
});

type FollowerProviderProps = {
    children: ReactNode;
};

const FollowerProvider = ({ children }: FollowerProviderProps) => {
    const [followersList, setFollowersList] = useState<Follower[]>([]);
    const { currentUser } = useContext(UserContext);


    useEffect(() => {
        const getFollowersUsersById = async () => {
            try {
                const followerList = await fetch(`https://cinmania1.azurewebsites.net/api/follower/user/${currentUser.uid}`);
                const followerListResponse = await followerList.json();
                setFollowersList(followerListResponse);
                console.log(followerListResponse);
            } catch (error) {
                console.error(error);
            }
        };
        if (currentUser) {
            getFollowersUsersById();
        }
    }, [currentUser]);


    return (
        <FollowerContext.Provider value={{ followersList }}>
            {children}
        </FollowerContext.Provider>
    );
};

export default FollowerProvider;
