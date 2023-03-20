import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../BrowserHistory';

const instance = axios.create({
    baseURL: CONSTANTS.API_BASE
});

// User Api

export const registerUser = async(userInput) => await instance.post('/users/sign-up', userInput);
export const loginUser = async(userInput) => await instance.post('/users/sign-in', userInput);
export const authUser = async() => await instance.get('/users');
export const logoutUser = async() => {
    localStorage.clear();
}

// Task Api

export const getTasks = async() => await instance.get('/tasks/');
export const addNewTask = async(taskData) => await instance.post('/tasks/', taskData);
export const deleteTask = async(taskId) => await instance.delete(`/tasks/${taskId}`);


instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
        }
    }
    return config;
}, (err) => Promise.reject(err));

instance.interceptors.response.use((responce) => {
    if(responce.data.tokens) {
        const { data: { tokens } } = responce;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }
    return responce;
}, (err) => {
    if(err.responce.status === 403 && localStorage.getItem('refreshToken')) {
        refreshUser();
    }
    if(err.responce.status === 401) {
        history.replace('/');
    }

    return Promise.reject(err);
});

export const refreshUser = async() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const { data } = await instance.post('/users/refresh', {refreshToken});
    return data;
};

export default instance;

