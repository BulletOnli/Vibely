import "./globals.css";

const loading = () => {
    return (
        <div className="loader">
            <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
                <div className="dot3"></div>
            </div>
        </div>
    );
};

export default loading;
