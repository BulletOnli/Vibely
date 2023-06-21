/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                custom: "0 2px 2px rgb(0, 0, 0, .2);",
                custom2: "0 4px 8px rgb(0, 0, 0, .3);",
            },
            backgroundColor: {
                custom: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
            },
            fontFamily: {
                custom: ["Titillium Web", "-apple-system", "sans-serif"],
            },
        },
    },
    plugins: [],
};
