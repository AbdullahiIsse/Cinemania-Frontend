
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
});