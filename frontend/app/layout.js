import "./globals.css";
import dynamic from "next/dynamic";

import { App } from "./_app";
// const App = dynamic(() => import("./App"), {
//     ssr: false,
// });

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
