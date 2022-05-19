import {loadActiveWalletSuccess, loadSuccess, loadTransactionsSuccess} from './WalletReducer';
import WalletService from './WalletService';
import {LMStorageService, STORAGE_KEYS} from '../storage/LMStorageService';
import _ from 'lodash'

export const WalletAction = {
    list,
    listForBalance,
    add,
    transactions,
    importWallet,
    setActiveWallet,
    remove
};
function listForBalance(params) {
    return async dispatch => {
        const { network, address } = params;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS) || [{
            name: 'Create a new wallet',
            address: 'NONE'
        }];
        let activeWallet = null;
        for (let i = 0; i < wallets.length; i++) {
            if (wallets[i].address !== 'NONE') {
                const balance = await WalletService.balance(wallets[i].address);
                const latestTransaction = await WalletService.latestTransaction(wallets[i].address);
                wallets[i].balance = balance;
                wallets[i].latestTransaction = latestTransaction;
            }
        }
        dispatch(loadSuccess(wallets));
        if (!_.isNil(activeWallet)) {
            dispatch(loadActiveWalletSuccess(activeWallet));
        }
    };
}
function list(params) {
    return async dispatch => {
        const { network, address } = params;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS) || [{
            name: 'Create a new wallet',
            address: 'NONE'
        }];
        let activeWallet = null;
        for (let i = 0; i < wallets.length; i++) {
            if (wallets[i].address !== 'NONE') {
                const balance = await WalletService.balance(wallets[i].address);
                const latestTransaction = await WalletService.latestTransaction(wallets[i].address);
                wallets[i].balance = balance;
                wallets[i].latestTransaction = latestTransaction;
                // console.log('latesteTransaction',latestTransaction)
            }
            if (address == wallets[i].address) {
                activeWallet = wallets[i]; 
            }
        }
        dispatch(loadSuccess(wallets));
        if (!_.isNil(activeWallet)) {
            dispatch(loadActiveWalletSuccess(activeWallet));
        }
    };
}
function add(params) {
    return async dispatch => {
        const {network} = params;
        const wallet = await WalletService.add(params);
        const balance = await WalletService.balance(wallet.address);
        wallet.balance = balance;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS) || [{
            name: 'Create a new wallet',
            address: 'NONE'
        }];
        const updatedWallets = [wallet, ...wallets];
        await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.WALLETS, updatedWallets);
        dispatch(loadSuccess(updatedWallets));
        return wallet;
    };
}

function remove(params) {
    return async dispatch => {
        const {wallet, network} = params;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS);
        _.remove(wallets, function (w) {
            return wallet.address == w.address;
        });
        await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.WALLETS, wallets);
        dispatch(loadSuccess(wallets));
        return wallets;
    };
}

function importWallet(params) {
    return async dispatch => {
        const {network} = params;
        const wallet = await WalletService.importWallet(params);
        if (_.isNil(wallet)) {
            return 'invalid';
        }
        if (await WalletService.isExists(wallet.address, network.key)) {
            return 'imported';
        }
        const balance = await WalletService.balance(wallet.address);
        wallet.balance = balance;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS) || [{
            name: 'Create a new wallet',
            address: 'NONE'
        }];
        const updatedWallets = [wallet, ...wallets];
        await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.WALLETS, updatedWallets);
        dispatch(loadSuccess(updatedWallets));
        return wallet;
    };
}

function transactions(params) {
    return async dispatch => {
        const { address, last_seen_txid } = params;
        const transactions = await WalletService.transactions(address, last_seen_txid);
        dispatch(loadTransactionsSuccess(transactions));
        return transactions;
    };
}

function setActiveWallet(params) {
    return async dispatch => {
        dispatch(loadActiveWalletSuccess(params));
    };
}
