import { getTopRatedMovies } from './Service.tsx';

// successful test
test('get top-rated movies', async () => {
    const reponse = {
        ok: true,
        json: () => Promise.resolve({
            results: [
                { id: 238, title: 'The Godfather' },
            ],
        }),
    };
    global.fetch = jest.fn().mockResolvedValue(reponse);

    const movies = await getTopRatedMovies();

    //tester her
    expect(movies).toEqual([
        { id: 238, title: 'The Godfather' },

    ]);

    expect(fetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/top_rated?language=en-US', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos',
        },
    });
});



