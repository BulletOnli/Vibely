import "./globals.css";
import { App } from "./_app";

export const metadata = {
    title: "Vibely",
    description:
        "Connecting people through shared interests and creating a vibrant online community.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <App>{children}</App>
            </body>
        </html>
    );
}
