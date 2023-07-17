import axios from "axios";

const apiBaseUrl = axios.create({
    baseURL: "https://vibelybackend-1-a9532540.deta.app",
});

export const loginUser = async (url, data) => {
    const response = await apiBaseUrl.post(url, data);
    localStorage.setItem("vibelyToken", response?.data?.accessToken);

    return response.data;
};

export const registerUser = async (url, data) => {
    const response = await apiBaseUrl.post(url, data);
    localStorage.setItem("vibelyToken", response?.data?.accessToken);

    return response.data;
};

export const getRequest = async (url) => {
    const response = await apiBaseUrl.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });

    return response.data;
};

export const postRequest = async (url, data) => {
    const response = await apiBaseUrl.post(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });

    return response.data;
};

export const putRequest = async (url, data) => {
    const response = await apiBaseUrl.put(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });

    return response.data;
};

export const deleteRequest = async (url) => {
    const response = await apiBaseUrl.delete(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });

    return response.data;
};
