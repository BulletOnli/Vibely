import { create } from "zustand";
import { getRequest } from "../utils/fetcher";

const userStore = (set, get) => ({
    currentAccount: [],
    getCurrentAccount: async () => {
        const accountDetails = await getRequest("/user/current");

        if (Object.values(accountDetails).length === 0) {
            console.log("token expired");
            localStorage.removeItem("vibelyToken");
        }

        set({ currentAccount: accountDetails });
    },
});

export const useUserStore = create(userStore);
