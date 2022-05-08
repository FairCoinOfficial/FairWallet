import BitcoinWallet from '../../module/bitcoin/BitcoinWallet';
import BitcoinService from '../../module/bitcoin/BitcoinService';
import BitcoinUtil from '../../module/bitcoin/BitcoinUtil';
import {LMStorageService, STORAGE_KEYS} from '../storage/LMStorageService';
import _ from 'lodash';
import moment from 'moment';
import CoinKey from 'coinkey';
import cs from 'coinstring';

/**
 * add a new wallet
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const add = async (params) => {
    console.log('here')
    const ck = CoinKey.createRandom({public:0x23,private:0xd4});
    const compressed = ck.compressed;
    const privateKey = ck.privateKey.toString('hex');
    // const address = ck.publicAddress;
    const privateKeyHexBuf = Buffer.from(privateKey, 'hex')
    const version = 0xd4;
    const wif =cs.encode(privateKeyHexBuf, version); 
    const ckc = CoinKey.fromWif(wif,{public:0x23,private:0xd4});
    const address = ckc.publicAddress;
    const wallet = {...params, ...{ address, private: privateKey, compressed, wif , mnemonic: wif}};
    console.log('added wallet',wallet)
    return wallet;
}
/**
 * import a new wallet 
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const importWallet = async (params) => {
    const {name,mnemonic,wif,network} = params;
    const ck = CoinKey.fromWif(wif, { public: 0x23, private: 0xd4 });
    const privatekey = ck.privateKey.toString('hex');
    const address = ck.publicAddress;
    const compressed = ck.compressed;
    const wallet = { ...params, ...{ address, private: privatekey, compressed, wif} };
    return wallet;
}
/**
 * get wallet balance
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const balance = async (address) => {
    const currentBalance = await BitcoinService.balance(address);
    return currentBalance;
}
/**
 * get latestTransaction
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const latestTransaction = async (address) => {
    //This is from old wallet function. Check and delete if dont used
    return '';
}
/**
 * send
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
 const send = async (params) => {
    let {wif, address, toAddress, amount, fee} = params;
    console.log('send params',wif, address, toAddress, amount, fee)
    const lastTxs = await BitcoinService.getLastTx(address);
    const withdrawAmount = BitcoinUtil.toSatoshi(amount);
    const currentBalance = await BitcoinService.balance(address);
    const changeAmount = BitcoinUtil.toSatoshi(currentBalance - amount - fee);

    if (changeAmount < 0) {
        throw new Error('Insufficient balance');
    }
    const pushTxRes = await BitcoinService.pushTx(
        {
            lastTxs,
            address,
            receivers:[
                {address:toAddress,value:withdrawAmount}, // withdraw
                {address: address, value: changeAmount}, // output for change
            ],
            prvKey:wif
        });
    console.log('pushTxResult',pushTxRes.data);
    return pushTxRes.data.data;
}
/**
 * estimateFee
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const estimateFee = async () => {
    const data = {
        "1":0.1,
        "25":0.05,
        "144":0.01,
    };
    return {
        fast: data["1"],
        average: data["25"],
        slow: data["144"]
    };
}
/**
 * get the latest 25 transactions
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const transactions = async (address, last_seen_txid) => {
    const txList = await BitcoinService.getTransactions(address, last_seen_txid);
    return txList;
}
/**
 * get the latest 25 transactions
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const isExists = async (address, network) => {
    const wallets = await LMStorageService.getItem(network + "_" + STORAGE_KEYS.WALLETS) || [];
    const index = _.findIndex(wallets, function (wallet) {
        return address == wallet.address;
    })
    return index == -1 ? false : true;
}
const WalletService = {
    add,
    send,
    balance,
    estimateFee,
    transactions,
    importWallet,
    isExists,
    latestTransaction
}
export default WalletService;
