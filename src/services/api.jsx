import axios from 'axios';
const axiosInstance = axios.create();
export const sendRequest = async (options, payload, cancelToken) => {
    const { params = {}, pathParams = {}, data = {} } = payload;
    let { method, baseURL, headers } = options;
    // update path params
    for (let key of Object.keys(pathParams)) {
        const keyCompare = `:${key}`;
        if (baseURL.indexOf(keyCompare) !== -1) {
            baseURL = baseURL.replace(keyCompare, pathParams[key]);
        }
    }
    // handle multipart
    if (options.headers['Content-Type'] === 'multipart/form-data') {
        let formData = new FormData();
        Object.keys(data).forEach((item) => {
            formData.append(item, data[item]);
        });
        try {
            const res = await axios.post(options.baseURL, formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            });
            console.log(res);
            return { data: res.data };
        } catch (err) {
            console.log(err);
        }
    }

    return axiosInstance.request({
        method,
        baseURL,
        headers,
        params,
        data,
        cancelToken,
    });
};
