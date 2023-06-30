import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full h-[25rem] flex items-end justify-center ">
            <div className="w-[75%] h-[12rem] text-gray-800 grid grid-cols-4 justify-items-center px-4 py-8 border-t border-gray-600">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-extrabold text-blue-700">
                        Vibely
                    </h2>
                    <small>©2023 Vibely | Social Media</small>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-black">Resources</h2>
                    <Link href="#">Help</Link>
                    <Link href="#">Privacy</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-black">Socials</h2>
                    <Link href="#">Discord</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-black">
                        Open Source
                    </h2>
                    <Link href="#">Contribute</Link>
                    <Link href="#">Bug Report</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
