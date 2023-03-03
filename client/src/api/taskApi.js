import CONSTANTS from '../constants';

export const getTasks = async(userId) => {
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks/${userId}`);
    if(responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
    }

    return responce.json();
}

export const addNewTask = async(data) => {
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
    };

    return responce.json();
}
