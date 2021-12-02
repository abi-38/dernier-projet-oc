import axios from 'axios';

// Routes qui  ne nécessite pas d'être authentifié
const ANONYMOUS_ROUTE = ['/api/signin', '/api/signup'];

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 60000;

axios.interceptors.request.use( async (AxiosConfig) => {
    const token = localStorage.getItem('token');
    if (AxiosConfig.url && !ANONYMOUS_ROUTE.includes(AxiosConfig.url)) {
        AxiosConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    return AxiosConfig;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use( async (AxiosResponse) => {
    if (AxiosResponse.status === 401) {
        if (localStorage.hasOwnProperty('token')) {
            localStorage.removeItem('token');
        }
    }
    return AxiosResponse;
}, error => {
    return Promise.reject(error);
});

export const GET = async (url) => {
    return await axios.get(url);
}

export const PUT = async (url, data) => {
    return await axios.put(url, data);
}

export const POST = async (url, data) => {
    return await axios.post(url, data);
}

export const DELETE = async (url, data) => {
    return await axios.delete(url, data);
}