import { apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};
const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    auth: {
        signIn: {
            baseURL: `${apiUrl}auth/sign-in`,
            method: 'POST',
            headers: baseHeader,
        },
    },
    user: {
        getProfile: {
            baseURL: `${apiUrl}user/profile`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    file: {
        download: {
            baseURL: `${apiUrl}file/download/`,
            method: 'GET',
            headers: baseHeader,
        },
        upload: {
            baseURL: `${apiUrl}file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    category: {
        getList: {
            baseURL: `${apiUrl}category`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}category/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}category`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}category/:id`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}category/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
    kind: {
        getList: {
            baseURL: `${apiUrl}kind`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}kind/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}kind`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}kind/:id`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}kind/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
    product: {
        getList: {
            baseURL: `${apiUrl}product`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}product/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}product`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}product/:id`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}product/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
};

export default apiConfig;
