import { create } from "zustand";
import axios from "axios";

const authStore = () => ({
    registerUser: async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/user/register",
                data
            );
            localStorage.setItem("token", response.data.token);
            console.log(response.data);
        } catch (error) {
            alert(error);
        }
    },
    loginUser: async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/user/login",
                data
            );

            localStorage.setItem("token", response.data.token);
            console.log(response.data);
        } catch (error) {
            alert(error);
        }
    },
});

export const useAuthStore = create(authStore);
