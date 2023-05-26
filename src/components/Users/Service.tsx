import {Follower} from "./Types.tsx";

export const FollowUser = async (followedUser: Follower) => {
    try {
        const follow = await fetch('https://cinmania1.azurewebsites.net/api/follower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(followedUser),
        });
        if (!follow.ok) {
            throw new Error('Network response failed');
        }
        const result = await follow.json();
        console.log(result);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

export const RemoveFollower = async (userId: string, followedId: string) => {
    try {
        const response = await fetch(
            `https://cinmania1.azurewebsites.net/api/follower/${userId}/${followedId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete the follow');
        }
    } catch (error) {
        console.error(error);
    }
};