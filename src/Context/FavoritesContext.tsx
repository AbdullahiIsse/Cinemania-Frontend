import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext.tsx";

interface movie {
    id:number,
    title:string,
    releaseDate:string,
    voteAverage:number,
    image:string,
    userId:string
}
const addListItem = async (movies:movie) => {
    try {
        const movie = await fetch("https://cinmania1.azurewebsites.net/api/movie", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movies),
        });
        if (!movie.ok) {
            throw new Error('Network response failed');
        }
        const result = await movie.json();
        console.log(result);

    }catch (error){
        console.error(`Error: ${error}`);
    }
};


const removeListItem = async (userId:string,movieId:number) => {
    try {
        const response = await fetch(`https://cinmania1.azurewebsites.net/api/movie/${userId}/${movieId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete the movie');
        }

        const movieResponse = await response.json();
        return movieResponse;
    } catch (error) {
        console.error(error);
    }
}


export const FavoritesContext = createContext<{
    favoritesListItems: movie[];
    addFavoritesListItem: (movie: movie) => void;
    removeFavoritesListItem: (userId:string,movieId:number) => void;
}>({
    favoritesListItems: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addFavoritesListItem: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeFavoritesListItem: () => {}
});


type FavoritesProviderProps = {
    children:ReactNode
}
const FavoritesProvider = ({children}:FavoritesProviderProps) => {
    const [favoritesListItems, setFavoritesListItems] = useState<movie[]>([]);
    const {currentUser} = useContext(UserContext)


    useEffect(()=> {
        const getMoviesById = async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const movie = await fetch(`https://cinmania1.azurewebsites.net/api/movie/${currentUser.uid}`);
            const movieResponse = await movie.json();
            setFavoritesListItems(movieResponse);
        }
        getMoviesById().catch((error: any) => {
            console.error(error);
        });

    },[currentUser])

    const addFavoritesListItem = async (Items:movie) => {
       await addListItem(Items)
        const array  = [...favoritesListItems,Items]
        setFavoritesListItems(array)
    }
    const removeFavoritesListItem = async (userId:string,movieId:number) => {
        await removeListItem(userId,movieId);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setFavoritesListItems(favoritesListItems.filter(movie => movie.id !== movieId));
    }

    return (<FavoritesContext.Provider value={{ favoritesListItems, addFavoritesListItem, removeFavoritesListItem }}>{children}</FavoritesContext.Provider>)

};

export default FavoritesProvider;