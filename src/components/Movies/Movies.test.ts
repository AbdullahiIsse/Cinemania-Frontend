
import { getPopularMovies } from "../Movies/Service";
test('list of popular movies', async () => {
    const response = {
        ok: true,
        json: () =>
            Promise.resolve({
                results: [
                    { id: 238, title: 'The Godfather' },
                    { id: 123, title: 'Inception' },
                ],
            }),
    };
    global.fetch = jest.fn().mockResolvedValue(response);

    const movies = await getPopularMovies('1');

    expect(movies).toEqual([
        { id: 238, title: 'The Godfather' },
        { id: 123, title: 'Inception' },
    ]);
    expect(fetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.' +
                    'eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU' +
                    '2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmU' +
                    'wNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos',
            },
        }
    );
});