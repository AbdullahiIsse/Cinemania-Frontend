
import axios, { AxiosResponse } from 'axios';
import "../toprated/Types.tsx";
import "../toprated/Toprated.css";
import {useEffect, useState} from "react";

export default function Toprated() {

    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos',
            },
        };
        axios
            .get<MovieListResponse>(
                'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&page_size=8',
                options
            )
            .then((response: AxiosResponse<MovieListResponse>) => {
                const movieList: Movie[] = response.data.results.slice(0, 8);
                setMovieList(movieList);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Top Rated</h1>
            <div className="movies">
                {movieList.map((movie: Movie) => (
                    <div key={movie.id} className="movieItems">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date}</p>
                        <p className="vote_average">{movie.vote_average}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
