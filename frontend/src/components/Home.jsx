import Background from "./Background";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="relative z-20 min-h-screen flex flex-col items-start justify-center text-left px-12 py-8">
                <h1 className="text-5xl font-extrabold text-white leading-tight mb-12 max-w-3xl">
                    Bridge your ERC20 Tokens <br /> from <span className="text-blue-600">Sepolia Blockchain</span> <br /> to <span className="text-yellow-500">Curtis Blockchain!</span>
                </h1>

                <div className="text-white max-w-3xl space-y-8">
                    <h2 className="text-4xl font-extrabold underline text-gray-700 ">How It Works</h2>

                    <p className="text-xl leading-relaxed mb-6 font-extrabold">
                        Users can lock their ERC20 tokens on Sepolia (Ethereum), which mints an equivalent amount of W-Tokens on Curtis (ApeChain). These W-Tokens represent the locked assets and can be used on Curtis.
                    </p>
                    <p className="text-xl leading-relaxed mb-6 font-extrabold">
                        When users want to retrieve their original tokens, they must unlock them on Sepolia after completing the burn process on Curtis.
                    </p>

                    <h3 className="text-2xl font-extrabold text-gray-700 underline mb-4">Steps:</h3>
                    <ol className="list-decimal list-inside space-y-4 text-xl font-extrabold">
                        <li>Lock your ERC20 tokens on Sepolia.</li>
                        <li>Receive equivalent W-Tokens on Curtis.</li>
                        <li>Use W-Tokens on Curtis as needed.</li>
                        <li>Burn W-Tokens on Curtis when you want to retrieve your original tokens.</li>
                        <li>Unlock your original tokens on Sepolia.</li>
                    </ol>
                    <p className="font-extrabold text-lg text-purple-500 mt-7">This process ensures the secure transfer and usage of tokens across different blockchains.</p>
                </div>
            </div>
            <Background />
        </>
    );
}

export default Home;
