import { useRef } from "react";
import { useWriteContract, useSwitchChain, useWaitForTransactionReceipt } from "wagmi";
import { ApeChainBridgeAbi } from '../ABI/ApechainBridge.json'
import { WTokenAbi } from '../ABI/WTokenAbi.json'
import { parseUnits } from "viem";
import Navbar from "./Navbar";

const ClaimWTokens = () => {

    const withdrawTokenRef = useRef();
    const burnedTokenRef = useRef();

    const { data: hash, writeContractAsync } = useWriteContract();
    const { switchChain } = useSwitchChain();
    const { data: receipt } = useWaitForTransactionReceipt({ hash })

    async function switchToCurtisNetwork() {
        try {
            switchChain({ chainId: 33111 });
            alert("Switched to Curtis network");
        } catch (error) {
            console.error("Error switching network:", error);
        }
    }

    async function withdrawToken() {
        let amount = withdrawTokenRef.current.value;
        amount = parseUnits(amount, 18);
        try {
            await writeContractAsync({
                abi: ApeChainBridgeAbi,
                address: "0xDaB5058Ac0C79221DA223ddb64DC31Cf023e6A9f",
                functionName: "withdraw",
                args: [amount]
            });
            alert("Tokens deposited in your account");
        } catch (e) {
            console.log("ERR", e);
        }
    }

    async function burnedToken() {
        let amount = burnedTokenRef.current.value;
        amount = parseUnits(amount, 18);
        try {
            await writeContractAsync({
                abi: WTokenAbi,
                address: "0x80c9dBeeb4A861B854556c7eF2231474d73E5C2c",
                functionName: "approve",
                args: ["0xDaB5058Ac0C79221DA223ddb64DC31Cf023e6A9f", amount]
            });
        } catch (e) {
            console.log(e);
        }
        try {
            await writeContractAsync({
                abi: ApeChainBridgeAbi,
                address: "0xDaB5058Ac0C79221DA223ddb64DC31Cf023e6A9f",
                functionName: "burned",
                args: [amount]
            });
            alert("Token burned: " + amount + ", now you can unlock it!");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <p className="text-2xl font-semibold mb-4 text-center text-red-900">Switch to Curtis Network before proceeding</p>
                    <button onClick={switchToCurtisNetwork} className="bg-yellow-500 text-white px-4 py-2 w-full rounded hover:bg-yellow-600 transition duration-300 mb-4 cursor-pointer">Switch Network</button>

                    <p className="text-2xl font-semibold mb-4 text-center">Withdraw Your W-INR in ApeChain</p>
                    <input type="text" placeholder="Enter amount" ref={withdrawTokenRef} className="border p-2 w-full mb-4 rounded" />
                    <button onClick={withdrawToken} className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-700 transition duration-300 cursor-pointer">Withdraw</button>

                    <p className="mt-6 text-2xl font-semibold mb-4 text-center">Burn Your W-Tokens to unlock original tokens on Sepolia</p>
                    <input type="text" placeholder="Enter amount" ref={burnedTokenRef} className="border p-2 w-full mb-4 rounded" />
                    <button onClick={burnedToken} className="bg-red-500 text-white px-4 py-2 w-full rounded hover:bg-red-700 transition duration-300 cursor-pointer">Burn</button>
                </div>
            </div>
        </>
    )
}

export default ClaimWTokens;