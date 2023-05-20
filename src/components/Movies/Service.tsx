export async function getPopularMovies() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos',
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            const movieList: Movie[] = data.results;
            return movieList;
        } else {
            console.error('Request failed with status:', response.status);
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
