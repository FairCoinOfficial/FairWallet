import axios from 'axios';
const faircoinExplorer = 'https://blockchain.fairco.in/';
const faircoinBackend = 'http://27.0.175.48:3000/api/';
/**
 * fetch the wallet information
 *
 * @param address   string  wallet address
 * @returns {object}        wallet information
 */
const getInfo = async (address) => {
    const data = await axios.post(`${faircoinExplorer}address/${address}`);
    return data.data;
}
/**
 * fetch the unspent transaction output information
 *
 * @param address   string  wallet address
 * @returns [{object}]      array of unspent transactions
 */
const getUtxo = async (address) => {
    let lastTx = [];
    try{
        const data = await axios.get(`${faircoinExplorer}ext/getaddress/${address}`);
        lastTx = data.data.last_txs;
    }catch(e){
        // console.log(e)
        lastTx = [];
    }
    let TxData = [];
    for(let i = 0; i < lastTx.length; i++){
        if(lastTx[i].type!='vout') continue;
        TxData.push({
            "tx":lastTx[i].addresses,
            "id":0,
        });
    }
    return TxData;
}

const getLastTx = async (address) => {
    let lastTx = [];
    try{
        const data = await axios.get(`${faircoinExplorer}ext/getaddress/${address}`);
        lastTx = data.data.last_txs;
    }catch(e){
        // console.log(e)
        lastTx = [];
    }
    return lastTx;
}
/**
 * fetch the transaction information
 *
 * @param txid   string  transaction id
 * @returns string      transaction information in hex or as binary data.
 */
const pushTx = async (data) => {
    const result = await axios.post(`${faircoinBackend}pushtx`, data);
    return result.data;
}

/**
 * Get transaction history for the specified address/scripthash, sorted with newest first.
 *
 * @param address            string  wallet address
 * @returns [{object}]      transactions
 */
const getTransactions = async (address, last_seen_txid) => {
    try {
        const result = await axios.get(`${faircoinExplorer}ext/getaddress/${address}`);
        return result.data.last_txs;
    } catch (error) {
        return [];
    }
}
const balance = async (address) => {
    try{
        const result = await axios.get(`${faircoinExplorer}ext/getbalance/${address}`);
        if(result.data.error) return 0;
        else return Math.floor(Number(result.data).toFixed(2) * 100)/100;
    }catch(e){
        return 0;
    }
}
const BitcoinService = {
    getInfo,
    getUtxo,
    getLastTx,
    pushTx,
    getTransactions,
    balance,
}
export default BitcoinService;
