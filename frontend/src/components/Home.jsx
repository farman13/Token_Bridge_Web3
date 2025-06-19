import Navbar from "./Navbar";
import bgImg from "../assets/bg-token.png";
import { Footer } from "./Footer";

const Home = () => {
    return (
        <div
            className="relative bg-cover bg-center min-h-screen w-full"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="absolute inset-0 bg-black/60 z-0" />
            <div className="relative z-10">
                <Navbar />

                <div className="min-h-screen flex flex-col justify-center px-8 sm:px-16 md:px-24 py-10 text-white">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-4xl mb-10">
                        BRIDGE YOUR ERC20 TOKENS <br />
                        FROM <span className="text-blue-400">SEPOLIA BlOCKCHAIN</span> <br />
                        TO <span className="text-yellow-400">CURTIS BLOCKCHAIN!</span>
                    </h1>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 sm:p-10 max-w-4xl space-y-6">
                        <h2 className="text-3xl font-bold underline text-gray-200">How It Works</h2>

                        <p className="text-lg text-gray-100 leading-relaxed font-medium">
                            Users can lock their ERC20 tokens on Sepolia (Ethereum), minting equivalent W-Tokens on Curtis (ApeChain). These tokens represent the locked assets and can be used within Curtis.
                        </p>

                        <p className="text-lg text-gray-100 leading-relaxed font-medium">
                            To retrieve original tokens, users must first burn their W-Tokens on Curtis, then unlock the originals on Sepolia.
                        </p>

                        <h3 className="text-2xl font-semibold text-gray-200 underline">Steps:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-100 text-base font-medium">
                            <li>Lock your ERC20 tokens on Sepolia.</li>
                            <li>Receive equivalent W-Tokens on Curtis.</li>
                            <li>Use W-Tokens on Curtis.</li>
                            <li>Burn W-Tokens when done.</li>
                            <li>Unlock your tokens on Sepolia.</li>
                        </ol>

                        <p className="text-purple-400 font-semibold text-base mt-4">
                            This process ensures secure and seamless cross-chain token transfers.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
