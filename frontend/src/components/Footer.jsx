import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                <p className="mb-4 sm:mb-0 text-sm">
                    &copy; {new Date().getFullYear()} Token Bridge. All rights reserved.
                </p>
                <div className="flex space-x-6">
                    <a
                        href="https://www.linkedin.com/in/mohammad-farman-900289220/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={24} />
                    </a>
                    <a
                        href="https://github.com/farman13/Token_Bridge_Web3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                        aria-label="GitHub"
                    >
                        <FaGithub size={24} />
                    </a>
                    <a
                        href="mailto:farman327440@gmail.com"
                        className="hover:text-white transition"
                        aria-label="Email"
                    >
                        <FaEnvelope size={24} />
                    </a>
                </div>
            </div>
            <div className="mt-1 ml-5 text-sm text-slate-200">
                ~ Developed by Farman
            </div>
        </footer>
    );
};

export { Footer };
