import postSubmit from '.';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('postSubmit', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('submit data to the API and return a success status', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

        const response = await postSubmit({ data: 'test' });

        expect(response).toEqual({ status: 'success' });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: 'test' })
        });
    });

    it('return an error status when the API request fails', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ error: 'Bad Request' }), { status: 400 });

        const response = await postSubmit({ data: 'test' });

        expect(response).toEqual({ status: 'error', error: 'Bad Request' });
    });

    it('throws an error when the fetch operation fails', async () => {
        fetchMock.mockReject(new Error('fake error message'));

        expect(postSubmit({ data: 'test' })).rejects.toThrow('Error post /api/submit');
    });
});
