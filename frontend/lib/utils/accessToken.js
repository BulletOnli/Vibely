import jwtDecode from "jwt-decode";

export const checkAccessToken = () => {
    const token = localStorage.getItem("vibelyToken");

    if (!token) {
        console.log("no token");
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();

        if (currentTime > expirationTime) {
            console.log("token expired");
            localStorage.removeItem("vibelyToken");
            return false;
        }
        console.log("token is available and not expired");
        return true;
    } catch (error) {
        localStorage.removeItem("vibelyToken");
        console.log("token expired");
        return false;
    }
};
