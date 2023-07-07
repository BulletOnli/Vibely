import axios from "axios";

const apiBaseUrl = axios.create({
    baseURL: "",
});

// /user/login
export const loginUser = async (url, data) => {
    const response = await apiBaseUrl.post(url, data);
    localStorage.setItem("vibelyToken", response.data.token);
    return response.data;
};

// /user/register
export const registerUser = async (url, data) => {
    const response = await apiBaseUrl.post(url, data);
    localStorage.setItem("vibelyToken", response.data.token);
    return response.data;
};

// /user/profile/id
export const getUserProfile = async (url) => {
    const response = await apiBaseUrl.get(url);
    localStorage.setItem("vibelyToken", response.data.token);
    return response.data;
};
