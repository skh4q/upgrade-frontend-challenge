const getColors = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/colors', { cache: 'default' });
        const json = await response.json();
        return json;
    } catch(e) {
        throw Error('Error get /api/colors');
    }
}

export default getColors;