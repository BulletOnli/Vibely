import axios from "axios";

const apiBaseUrl = axios.create({
    baseURL: "http://localhost:4000",
});

// /post
export const getPost = async (url) => {
    const response = await apiBaseUrl.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};

// /post/all
export const getAllPost = async (url) => {
    const response = await apiBaseUrl.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibeSlyToken")}`,
        },
    });
    return response.data;
};

// /post/create
export const createPost = async (url, data) => {
    const response = await apiBaseUrl.post(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};

// /post/update
export const updatePost = async (url, data) => {
    const response = await apiBaseUrl.put(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};

// /post/delete
export const deletePost = async (url) => {
    const response = await apiBaseUrl.delete(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};

// /post/likes/like
export const likePost = async (url) => {
    const response = await apiBaseUrl.post(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};

// /post/likes/unlike
export const unlikePost = async (url) => {
    const response = await apiBaseUrl.post(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};

// /post/likes/dislike
export const dislikePost = async (url) => {
    const response = await apiBaseUrl.post(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};

// /post/likes/undislike
export const undislikePost = async (url) => {
    const response = await apiBaseUrl.post(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("vibelyToken")}`,
        },
    });
    return response.data;
};
