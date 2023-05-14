export async function getPerson(): Promise<Person[]> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/trending/person/day?language=en-US', options);
        const data = await response.json();
        return data.results as Person[];
    } catch (err) {
        console.error(err);
        return [];
    }
}