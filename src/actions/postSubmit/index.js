const postSubmit = async (data) => {
    try {
        const response = await fetch('http://localhost:3001/api/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.status === 200) {
            return {
                status: 'success',
            }
        } else {
            const errorReason = await response.json();
            return {
                status : 'error',
                ...errorReason
            }
        };
    } catch(e) {
        throw Error('Error post /api/submit');
    }
}

export default postSubmit;