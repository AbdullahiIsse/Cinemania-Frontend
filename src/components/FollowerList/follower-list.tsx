import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext.tsx";
import {getFollowedUserByUserId, getFollowersByUserId, removeFollower} from "./Service.tsx";
import {FollowedUser, followerUserMovie} from "./types.tsx";
import defaultImages from "../../assets/images.png";
import CardList from "../card-list/card-list.tsx";
import './follower-list.css'
import {Button, Table} from "@mantine/core";


const FollowerList = () => {

    const {currentUser} = useContext(UserContext)
    const [followersMovieSeiesList, setFollowersMovieSeiesList] = useState<followerUserMovie[]>([]);
    const [followedUserList, setFollowedUserList] = useState<FollowedUser[]>([]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = currentUser.uid;
    let followedId = "";
    followersMovieSeiesList.map((f) => (
        followedId = f.userId
    ))

    useEffect(() => {
        getFollowersByUserId(userId)
            .then((data: followerUserMovie[]) => {
                setFollowersMovieSeiesList(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [userId]);

    useEffect(() => {
        getFollowedUserByUserId(userId)
            .then((data: FollowedUser[]) => {
                setFollowedUserList(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [userId]);


    const UnFollowButton = async () => {
        await removeFollower(userId, followedId);
        const newFollowerList = followersMovieSeiesList.filter(
            (follower) => follower.userId !== userId && follower.followedId !== followedId
        );
        setFollowersMovieSeiesList(newFollowerList);
        window.location.reload();
    }

    const rows = followedUserList.map((follow) => (
        <tr key={follow.email}>
            <td>{follow.email}</td>
            <td>{follow.displayName}</td>
            <td><Button onClick={UnFollowButton}>Unfollow</Button></td>
        </tr>
    ));


    return (
        <div>
            <h2>Follower Movie List:</h2>

            <br/>
            <br/>
            {followersMovieSeiesList.length === 0 ? (
                <div>Follow a user to view there favorite list or wait for the user to put movies/tv-series in there favorite list</div>
            ) : (
                <>
                    {Array.from(new Set(followersMovieSeiesList.map(f => f.email))).map((email) => (
                        <div key={email}>
                            <h3>Email: {email}</h3>
                            <br/>
                            <Button onClick={UnFollowButton}>Unfollow</Button>

                            <div className='follower-list'>
                                {followersMovieSeiesList
                                    .filter((follower) => follower.email === email)
                                    .map((follower) => {
                                        console.log("the id is " + follower.followedId);
                                        const images = follower.image === null ? defaultImages : `https://image.tmdb.org/t/p/w300${follower.image}`;
                                        return (
                                            <div key={follower.email}>
                                                <CardList
                                                    category={follower.releaseDate}
                                                    heading={follower.title}
                                                    backgroundImage={images}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </>
            )}
            <br/>
            <br/>

            <h3>Followers List</h3>
            <br/>
            <Table>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>DisplayName</th>
                    <th>UnFollow</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );



};

export default FollowerList;