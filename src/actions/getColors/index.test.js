import getColors from '.';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('getColors', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('fetch colors from the API and returns the data as json', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([{color: 'red'}, {color: 'blue'}]));

        const colors = await getColors();

        expect(colors).toEqual([{color: 'red'}, {color: 'blue'}]);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/colors');
    });

    it('throw an error when the API request fails', async () => {
        fetchMock.mockReject(new Error('fake error message'));

        expect(getColors()).rejects.toThrow('Error get /api/colors');
    });
});
