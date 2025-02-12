const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();


const logSchema = new Schema({
    chain: String,
    transactionHash: String,
    blockNumber: Number,
    from: String,
    amount: String,
    processed: { type: Boolean, default: false }
})

const blockSchema = new Schema({
    chain: String,
    lastBlock: Number
})

const logModel = mongoose.model("logs", logSchema);
const blockModel = mongoose.model("blocks", blockSchema);

module.exports = {
    logModel,
    blockModel
}