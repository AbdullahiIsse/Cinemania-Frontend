export async function getFollowersByUserId(userId: string) {
    const url = `https://cinmania1.azurewebsites.net/api/follower/${userId}`;
    const options = {
        method: 'GET',
       
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getFollowedUserByUserId(userId: string) {
    const url = `https://cinmania1.azurewebsites.net/api/follower/followed/${userId}`;
    const options = {
        method: 'GET',

    };
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const RemoveFollower = async (userId: string, email: string) => {
    try {
        const response = await fetch(
            `https://cinmania1.azurewebsites.net/api/follower/email/${userId}/${email}`,
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
