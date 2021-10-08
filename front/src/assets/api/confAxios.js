const axios = require('axios').default;
// éviter les require -> retirer !

// Routes qui  ne nécessite pas d'être authentifié
const ANONYMOUS_ROUTE = ['/api/signin', '/api/signup'];

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 60000;


axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem({key: 'token'});
    if (config.url && !ANONYMOUS_ROUTE.includes(config.url)) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

axios.interceptors.response.use(function (response) {
    if (response.status === 401) {
        if (localStorage.hasOwnProperty( {v:'token'} )) {
            localStorage.removeItem( {key: 'token'} );
        }
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const GET = async (url) => {
    return await axios.get(url);
}

export const POST = async (url, data) => {
    return await axios.post(url, data);
}

// pensez à mettre en place les interceptors !!

/*
axios.interceptors.request.use(
    async (conf: AxiosRequestConfig) => {
        const token = localStorage.getItem({key: 'token'});
        if (conf.url && !ANONYMOUS_ROUTE.includes(conf.url)) {
            conf.headers['Authorization'] = `Bearer ${token}`;
        }

        return conf;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    async (response: AxiosResponse) => {
        if (response.status === 401) {
            if (localStorage.hasOwnProperty( {v:'token'} )) {
                localStorage.removeItem( {key: 'token'} );
            }
        }
    },
    err => {
        console.log(err);
    }
);
*/


