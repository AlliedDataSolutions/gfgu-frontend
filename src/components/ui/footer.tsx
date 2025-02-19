import { Twitter, LinkedinIcon, Facebook, Instagram, ArrowRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 px-5 md:px-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
                {/* Social Media */}
                <div>
                    <div className="w-10 h-10 rounded-full mb-4 bg-gradient-to-r from-[#24601F] to-[#53DE48]"></div>

                    <h2 className="text-sm font-bold mb-3">SOCIAL MEDIA</h2>
                    <div className="flex space-x-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer  ">
                            <Twitter className="w-8 h-8 fill-black" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer  ">
                            <LinkedinIcon className="w-6 h-8 text-black fill-black" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer  ">
                            <Facebook className="w-6 h-8 text-black fill-black" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer  ">
                            <Instagram className="w-6 h-6 text-black" />
                        </div>
                    </div>
                </div>

                {/* Pages */}
                <div>
                    <h2 className="text-sm font-bold mb-3">Pages</h2>
                    <ul className="space-y-2">
                        <li className="hover:text-gray-400 cursor-pointer">Home Page</li>
                        <li className="hover:text-gray-400 cursor-pointer">About</li>
                        <li className="hover:text-gray-400 cursor-pointer">Delivery Days</li>
                        <li className="hover:text-gray-400 cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Newsletter Subscription */}
                <div>
                    <h2 className="text-sm font-bold mb-3">Subscribe to our newsletter</h2>
                    <p className="text-sm mb-4">To get latest updates from Us</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your e-mail"
                            className="bg-white text-black px-4 py-2 rounded-l-lg flex-1 outline-none"
                        />
                        <button className="bg-white text-black p-3 rounded-r-lg">
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 text-center border-t bg-white text-black px-2 py-2 rounded-sm flex-1  outline-none">
                © All Rights Reserved by Farmer
            </div>
        </footer>
    );
};

export default Footer;
