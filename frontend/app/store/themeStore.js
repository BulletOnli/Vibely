import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const themeStore = (set, get) => ({
    isDarked: false,
    toggleTheme: () => {
        set({ isDarked: !get().isDarked });
    },
});

export const useThemeStore = create(themeStore);
// export const useThemeStore = create(
//     persist(devtools(themeStore), { name: "darkTheme" })
// );
