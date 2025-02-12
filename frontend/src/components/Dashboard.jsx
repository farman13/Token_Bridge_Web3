import { useRef, useState } from "react";
import Connectbutton from "./ConnectButton";
import { useWriteContract, useSwitchChain, useWaitForTransactionReceipt } from "wagmi";
import { EthBridgeAbi } from '../ABI/EthBridgeAbi.json';
import { TokenAbi } from '../ABI/TokenAbi.json'
import { ApeChainBridgeAbi } from '../ABI/ApechainBridge.json'
import { WTokenAbi } from '../ABI/WTokenAbi.json'
import { parseUnits } from "viem";

const Dashboard = () => {

    const lockTokenRef = useRef();
    const withdrawTokenRef = useRef();
    const burnedTokenRef = useRef();
    const unlockTokenRef = useRef();

    const { data: hash, writeContractAsync } = useWriteContract();
    const { switchChain } = useSwitchChain();
    const { data: receipt } = useWaitForTransactionReceipt({ hash })
    const [lockedTokens, setlockedTokens] = useState(0);
    const [WTokens, setWtokens] = useState(0);

    async function switchToCurtisNetwork() {
        try {
            switchChain({ chainId: 33111 });
            alert("Switched to Curtis network");
        } catch (error) {
            console.error("Error switching network:", error);
        }
    }

    async function lockTokens() {
        let amount = lockTokenRef.current.value;
        amount = parseUnits(amount, 18);
        try {
            await writeContractAsync({
                abi: TokenAbi,
                address: "0x5E3Dd28cF940B00638B639D23B36cB347E4b9767",
                functionName: "approve",
                args: ["0x081587A7a8fFb06172A0520C8bfbA1bCCA6a2Be1", amount]
            });
        } catch (e) {
            console.log("ERR:", e);
        }
        try {
            await writeContractAsync({
                abi: EthBridgeAbi,
                address: "0x081587A7a8fFb06172A0520C8bfbA1bCCA6a2Be1",
                functionName: "lock",
                args: ["0x5E3Dd28cF940B00638B639D23B36cB347E4b9767", amount]
            });
            setlockedTokens(lockedTokens + amount);
            setWtokens(WTokens + amount);
            alert("Tokens locked , Now youu can wtihdraw in ApeChain")
        } catch (e) {
            console.log(e);
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
            alert("Token burned: " + amount + ",now u can unlock it!");
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
        <div className="p-4 relative z-10 text-white">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold underline">Bridge your ERC20-tokens from Sepolia(Ethereum) blockchain to Curtis(ApeChain)</h1>
                <Connectbutton />
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div className="border p-6 rounded-lg shadow-lg">
                    <p className="text-xl font-semibold">Lock Your Tokens and get W-token on ApeChain</p>
                    <input type="text" placeholder="Enter amount" ref={lockTokenRef} className="border p-2 w-full my-2" />
                    <button onClick={lockTokens} className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">Lock</button>

                    <p className="mt-4 text-xl font-semibold">Unlock your tokens (note: please burn W-Token before unlocking)</p>
                    <input type="text" placeholder="Enter amount" ref={unlockTokenRef} className="border p-2 w-full my-2" />
                    <button onClick={unlockTokens} className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">Unlock</button>
                </div>
                <div className="border p-6 rounded-lg shadow-lg">
                    <p className="text-xl font-semibold text-red-900">Switch to Curtis Network before proceeding</p>
                    <button onClick={switchToCurtisNetwork} className="bg-yellow-500 text-white px-4 py-2 rounded mb-4 hover:cursor-pointer">Switch Network</button>

                    <p className="text-xl font-semibold">Withdraw Your W-INR in ApeChain</p>
                    <input type="text" placeholder="Enter amount" ref={withdrawTokenRef} className="border p-2 w-full my-2" />
                    <button onClick={withdrawToken} className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">Withdraw</button>

                    <p className="mt-4 text-xl font-semibold">Burn Your W-Tokens to unlock original tokens on Sepolia</p>
                    <input type="text" placeholder="Enter amount" ref={burnedTokenRef} className="border p-2 w-full my-2" />
                    <button onClick={burnedToken} className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer">Burn</button>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
