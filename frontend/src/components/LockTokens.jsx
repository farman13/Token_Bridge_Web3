import { useRef, useState } from "react";
import { useSwitchChain, useWriteContract, usePublicClient } from "wagmi";
import { EthBridgeAbi } from '../ABI/EthBridgeAbi.json';
import { TokenAbi } from '../ABI/TokenAbi.json'
import { parseUnits } from "viem";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

const LockTokens = () => {

    const lockTokenRef = useRef();
    const unlockTokenRef = useRef();

    const { switchChain } = useSwitchChain();
    const [lockedTokens, setlockedTokens] = useState(0);

    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();

    async function switchToSepoliaNetwork() {
        try {
            switchChain({ chainId: 11155111 });
            alert("Switched to Sepolia network");
        } catch (error) {
            console.error("Error switching network:", error);
        }
    }

    async function lockTokens() {
        let amount = lockTokenRef.current.value;
        amount = parseUnits(amount, 18);
        try {
            const approveTxnHash = await writeContractAsync({
                abi: TokenAbi,
                address: "0x5E3Dd28cF940B00638B639D23B36cB347E4b9767",
                functionName: "approve",
                args: ["0x081587A7a8fFb06172A0520C8bfbA1bCCA6a2Be1", amount]
            });

            console.log("Approval transaction sent:", approveTxnHash);
            await publicClient.waitForTransactionReceipt({ hash: approveTxnHash });
            console.log("Approval confirmed");

            await writeContractAsync({
                abi: EthBridgeAbi,
                address: "0x081587A7a8fFb06172A0520C8bfbA1bCCA6a2Be1",
                functionName: "lock",
                args: ["0x5E3Dd28cF940B00638B639D23B36cB347E4b9767", amount]
            });
            setlockedTokens(lockedTokens + amount);
            setWtokens(WTokens + amount);
            alert("Tokens locked, now you can withdraw in ApeChain");
        } catch (e) {
            console.log(e);
        }
    }

    async function unlockTokens() {
        let amount = unlockTokenRef.current.value;
        amount = parseUnits(amount, 18);
        try {
            await writeContractAsync({
                abi: EthBridgeAbi,
                address: "0x081587A7a8fFb06172A0520C8bfbA1bCCA6a2Be1",
                functionName: "unlock",
                args: ["0x5E3Dd28cF940B00638B639D23B36cB347E4b9767", amount]
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 m-4 bg-white rounded-lg shadow-md shadow-black">
                    <p className="text-xl font-semibold mb-4 text-center text-red-900">SWITCH TO SEPOLIA NETWORK BEFORE PROCEEDING</p>
                    <button onClick={switchToSepoliaNetwork} className="bg-yellow-500 text-white px-4 py-2 w-full rounded hover:bg-yellow-600 transition duration-300 mb-4 cursor-pointer">Switch Network</button>

                    <p className="text-xl font-semibold mb-4 text-center text-gray-700">LOCK YOUR TOKENS AND GET W-TOKEN ON CURTIS</p>
                    <input type="text" placeholder="Enter amount" ref={lockTokenRef} className="border p-2 w-full mb-4 rounded" />
                    <button onClick={lockTokens} className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-700 transition duration-300 cursor-pointer">Lock</button>

                    <p className="mt-6 text-xl font-semibold mb-4 text-center text-gray-700">UNLOCK YOUR TOKENS (NOTE: PLEASE BURN W-TOKEN BEFORE UNLOCKING)</p>
                    <input type="text" placeholder="Enter amount" ref={unlockTokenRef} className="border p-2 w-full mb-4 rounded" />
                    <button onClick={unlockTokens} className="bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition duration-300 cursor-pointer">Unlock</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LockTokens;
