import { getPopularMovies } from "../components/Movies/Service.tsx";
import {getPerson} from "../components/person/Service.tsx";
import {getPopularTVseries} from "../components/tvSeries/Service.tsx";
test('get a list of data for movies,series and person for test', async () => {
    const response = {
        ok: true,
        json: () =>
            Promise.resolve({
                results: [
                    { id: 123, data: 'Data' },
                    { id: 234, data: 'Data' },
                ],
            }),
    };
    global.fetch = jest.fn().mockResolvedValue(response);

    const movies = await getPopularMovies('1');
    const persons : Person[]  = await getPerson(1);
    const tvSeries :TvSeries[] = await getPopularTVseries('1');

    expect(movies).toEqual([
        { id: 123, data: 'Data' },
        { id: 234, data: 'Data' },
    ]);

    expect(persons).toEqual([
        { id: 123, data: 'Data' },
        { id: 234, data: 'Data' },
    ]);

    expect(tvSeries).toEqual([
        { id: 123, data: 'Data' },
        { id: 234, data: 'Data' },
    ]);
});