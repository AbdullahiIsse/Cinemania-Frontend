import axios, { AxiosResponse } from 'axios';

export function getPopularMovies() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos',
        },
    };
        return axios
            .get<MovieListResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&page_size=8',
                options
            )
            .then((response: AxiosResponse<MovieListResponse>) => {
                const movieList: Movie[] = response.data.results.slice(0, 8);
                return movieList;
            })
            .catch((error: any) => {
                console.error(error);
                return [];
            });

}

export function getTopRatedMovies() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos',
        },
    };
    return axios
        .get<MovieListResponse>(
            'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&page_size=8',
            options
        )
        .then((response: AxiosResponse<MovieListResponse>) => {
            const movieList: Movie[] = response.data.results.slice(0, 8);
            return movieList;
        })
        .catch((error: any) => {
            console.error(error);
            return [];
        });


}

