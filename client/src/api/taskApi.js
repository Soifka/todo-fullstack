import CONSTANTS from '../constants';
import history from '../BrowserHistory';
import { refreshSession } from './userApi';

export const getTasks = async() => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${CONSTANTS.API_BASE}/tasks/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if(res.status === 400) {
        const error = await res.json();
        return Promise.reject(error);
    }
    if(res.status === 403) {
        await refreshSession();
        return await getTasks();
    }

    return res.json();
}

export const addNewTask = async(data) => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${CONSTANTS.API_BASE}/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    });
    if(res.status === 400) {
        const error = await res.json();
        return Promise.reject(error);
    };
    if(res.status === 403) {
        await refreshSession();
        return await addNewTask(data);
    };

    return res.json();
}

export const deleteTask = async(taskId) => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${CONSTANTS.API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if(res.status === 400) {
        const error = await res.json();
        return Promise.reject(error);
    }
    if(res.status === 403) {
        await refreshSession();
        return await deleteTask(taskId);
    }

    return res.json();
}
