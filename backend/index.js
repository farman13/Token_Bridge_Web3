const { JsonRpcProvider, ethers, Interface, id, formatUnits } = require('ethers');
const { EthAbi } = require("./ABI/ETHBridge.json");
const { ApeAbi } = require("./ABI/ApeChain.json");
const { Wallet } = require('ethers');
const { Contract } = require('ethers');
const { blockModel, logModel } = require('./db');
const { default: mongoose } = require('mongoose');
require('dotenv').config();


const ApeProvider = new JsonRpcProvider(process.env.APE_PROVIDER);
const EthProvider = new JsonRpcProvider(process.env.ETH_PROVIDER);

const EthContractAddress = process.env.ETH_CONTRACT_ADDRESS;
const ApeContractAddress = process.env.APE_CONTRACT_ADDRESS;

const EthContractInterface = new Interface(EthAbi);
const ApeContractInterface = new Interface(ApeAbi);

const PRIVATE_KEY = process.env.PRIVATE_KEY;

function getApeWallet() {
    const wallet = new Wallet(PRIVATE_KEY, ApeProvider);
    return wallet;
}

function getEthWallet() {
    const wallet = new Wallet(PRIVATE_KEY, EthProvider);
    return wallet;
}

async function getLastProcessedBlock(chain) {
    const record = await blockModel.findOne({ chain });
    return record ? record.lastBlock : null;
}

async function updateLastProcessedBlock(chain, blockNumber) {
    await blockModel.findOneAndUpdate({ chain },
        { lastBlock: blockNumber },
        { upsert: true, new: true }
    );
}

async function storeLog(chain, txnHash, blockNumber, from, amount) {
    const existingLog = await logModel.findOne({ transactionHash: txnHash });
    if (!existingLog) {
        await logModel.create({
            chain: chain,
            transactionHash: txnHash,
            blockNumber: blockNumber,
            from: from,
            amount: amount,
            processed: false
        })
    }
}

async function listenEthereum(provider) {

    try {
        const latestBlock = await provider.getBlockNumber();
        console.log(latestBlock);

        let lastProcessedBlock = await getLastProcessedBlock("ethereum") || 8762284
        console.log("LP E :", lastProcessedBlock);
        const logs = await provider.getLogs({
            address: EthContractAddress,
            fromBlock: lastProcessedBlock,
            toBlock: latestBlock,
            topics: [id("Lock(address,uint256)")]
        });

        console.log("Ethereum logs:", logs.length);

        // if (logs.length > 0) {
        await updateLastProcessedBlock("ethereum", latestBlock);
        // }

        for (const log of logs) {
            const parsedLog = EthContractInterface.parseLog(log);
            const txnHash = log.transactionHash;
            const from = parsedLog.args[0].toString();
            const amount = parsedLog.args[1].toString();
            // const formattedAmount = formatUnits(amount, 18);
            await storeLog("ethereum", txnHash, log.blockNumber, from, amount);
        }

    } catch (err) {
        console.log(err);
    }
}

async function listenApechain(provider) {

    try {
        const latestBlock = await provider.getBlockNumber();
        let lastProcessedBlock = await getLastProcessedBlock("apeChain") || 24477493;
        const logs = await provider.getLogs({
            address: ApeContractAddress,
            fromBlock: lastProcessedBlock,
            toBlock: latestBlock,
            topics: [id("Burned(address,uint256)")]
        })

        console.log("apeChain logs :", logs.length);
        // if (logs.length > 0) {
        await updateLastProcessedBlock("apeChain", latestBlock);
        // }

        for (const log of logs) {  // Process logs sequentially , it supports await inside loop
            const parsedLog = ApeContractInterface.parseLog(log);

            const txnHash = log.transactionHash;
            const from = parsedLog.args[0].toString();
            const amount = parsedLog.args[1].toString();
            const formattedAmount = formatUnits(amount, 18);

            console.log("txnHash", txnHash);
            console.log("from:", from);
            console.log("amount:", formattedAmount);

            await storeLog("apeChain", txnHash, log.blockNumber, from, amount);
        }

    } catch (err) {
        console.log(err);
    }
}

let isProcessing = false;
async function processPendingTransactions() {

    if (isProcessing) {
        return;
    }

    isProcessing = true;
    let pendingLogs = await logModel.find({ processed: false });

    for (const log of pendingLogs) {
        try {
            if (log.chain == "ethereum")
                await sendApeTxn(log.from, log.amount);
            else if (log.chain == "apeChain")
                await sendEthTxn(log.from, log.amount);

            await logModel.updateOne({ transactionHash: log.transactionHash }, { processed: true });
            console.log("processed txn :", log.transactionHash);
        }
        catch (err) {
            console.log("Failed to process txn :", log.transactionHash);
        }
    }
    isProcessing = false;
}

async function sendApeTxn(from, amount) {
    try {
        console.log("Enteering sendApeTxn")
        const wallet = getApeWallet();
        const contract = new Contract(ApeContractAddress, ApeAbi, wallet);
        const tx = await contract.lockOnOppositeChain(from, amount);
        await tx.wait();
        console.log("Txn completed:", tx.hash);
    } catch (err) {
        console.error("Transaction failed:", err);
    }
}

async function sendEthTxn(from, amount) {
    try {
        console.log("Enteering Eth sendTxn")
        const wallet = getEthWallet();
        const contract = new Contract(EthContractAddress, EthAbi, wallet);
        const tx = await contract.burnedOnOtherSide(from, amount);
        await tx.wait();
        console.log("Txn completed:", tx.hash);
    } catch (err) {
        console.error("Transaction failed:", err);
    }
}

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    setInterval(() => { listenEthereum(EthProvider) }, 5000);
    setInterval(() => { listenApechain(ApeProvider) }, 5000);
    setInterval(() => { processPendingTransactions() }, 5000);
}
main();
