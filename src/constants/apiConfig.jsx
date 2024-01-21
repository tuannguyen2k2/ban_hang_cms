import { apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const apiConfig = {
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
};

export default apiConfig;
