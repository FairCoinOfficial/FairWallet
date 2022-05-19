import axios from 'axios';
import * as bitcoin from "bitcoinjs-lib";
const faircoinNet = {
    messagePrefix: "\x18Faircoin Signed Message:\n",
    bech32: "tb",
    bip32: { public: 70617039, private: 70615956 },
    pubKeyHash: 0x23,
    scriptHash: 0xc4,
    wif: 0xd4,
};
const faircoinExplorer = 'https://blockchain.fairco.in/';
const faircoinBackend = 'http://27.0.175.48:3000/api/';
/**
 * fetch the transaction information
 *
 * @param txid   string  transaction id
 * @returns string      transaction information in hex or as binary data.
 */
const pushTx = async (data) => {
    try {
        const {lastTxs, address, receivers, prvKey} = data;
        // console.log('lastTxs',lastTxs);
        // console.log('address',address);
        // console.log('receivers',receivers);
        // console.log('prvKey',prvKey);
        const key = bitcoin.ECPair.fromWIF(prvKey, faircoinNet);
        const psbt = new bitcoin.Psbt({ network: faircoinNet });
    
        psbt.setVersion(1);
        psbt.setLocktime(0);
    
        const utxosRes = await axios.post(`${faircoinBackend}getUtxos`, {addr:address, txIds:lastTxs});
        const utxos = utxosRes.data.data;
        for (var i = 0; i < utxos.length; i++) {
          utxo = utxos[i];
          const prevTxDataRes = await axios.post(`${faircoinBackend}getRawTransaction`, {txId:utxo.tx});
          const prevTxData = prevTxDataRes.data.data;
          if (prevTxData === false || prevTxData === "") {
            throw new Error('Failed to get txData');
          }
          psbt.addInput({
            hash: utxo.tx,
            index: utxo.id,
            sequence: 0xffffffff,
            nonWitnessUtxo: Buffer.from(prevTxData, "hex"),
          });
        }
    
        for (i = 0; i < receivers.length; i++) {
          const receiver = receivers[i];
          psbt.addOutput({
            address: receiver.address,
            value: receiver.value,
          });
        }
        psbt.signAllInputs(key);
    
        psbt.finalizeAllInputs();
    
        const txData = psbt.extractTransaction(true).toHex();    
        console.log('txData',txData);
        const newTransaction = (await axios.post(`${faircoinBackend}pushtx`, {txData})).data.data;
        console.log('txid',newTransaction)
        return newTransaction;
      } 
      catch (error) {
        console.log(error);
        throw new Error('Failed');
      }
}
const getTransactions = async (address) => {
    try {
        const result = await axios.get(`${faircoinExplorer}ext/getaddress/${address}`);
        if(result.data.error) return []
        else return result.data.last_txs;
    } catch (error) {
        return [];
    }
}
const balance = async (address) => {
    try{
        const result = await axios.get(`${faircoinExplorer}ext/getbalance/${address}`);
        if(result.data.error) return 0;
        else return result.data;
    }catch(e){
        return 0;
    }
}

const getTxInfo = async (tx) => {
    try{
        const result = await axios.get(`${faircoinExplorer}ext/gettx/${tx}`);
        if(result.data.error) return false;
        else return result.data;
    }catch(e){
        return false;
    }
}
const BitcoinService = {
    pushTx,
    getTransactions,
    balance,
    getTxInfo,
}
export default BitcoinService;
