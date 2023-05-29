import {ReviewAdd} from "./types.tsx";

export async function getReviewsByMovie(movieId: number) {
    const url = `https://cinmania1.azurewebsites.net/api/review/movie/${movieId}`;
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

export const addReview = async (reviews:ReviewAdd) => {
    try {
        const response = await fetch("https://cinmania1.azurewebsites.net/api/review", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviews),
        });
        if (!response.ok) {
            throw new Error('Network response failed');
        }
        const result = await response.json();
        console.log(result);

    }catch (error){
        console.error(`Error: ${error}`);
    }
};


export const updateReview = async (reviews:ReviewAdd,id:number,userId:string) => {
    try {
        const response = await fetch(`https://cinmania1.azurewebsites.net/api/review/${id}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviews),
        });
        if (!response.ok) {
            throw new Error('Network response failed');
        }
        const result = await response.json();
        console.log(result);

    }catch (error){
        console.error(`Error: ${error}`);
    }
};

export const RemoveReview = async (id: number, userId: string) => {
    try {
        const response = await fetch(
            `https://cinmania1.azurewebsites.net/api/review/${id}/${userId}`,
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




