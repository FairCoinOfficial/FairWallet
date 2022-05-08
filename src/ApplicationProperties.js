import * as bitcoin from 'bitcoinjs-lib';
export const ApplicationProperties = {
    NETWORKS : [{
        key : 'mainnet',
        value: {
            bech32: "bc",
            bip32: {public: 76067358, private: 76066276},
            messagePrefix: "\u0018Bitcoin Signed Message:\n",
            pubKeyHash: 0x23,
            scriptHash: 15,
            wif: 0xd4,
        },
        api : 'https://blockchain.fairco.in/api/',
        explore : 'https://blockchain.fairco.in/',
    },{
        key : 'testnet',
        value : bitcoin.networks.testnet,
        api : 'https://blockstream.info/testnet/api/',
        explore : 'https://blockstream.info/testnet/',
    }],
    USING_MAIN_NET : true,
    DEFAULT_LANGUAGE : {
        code : 'en',
        icon : 'GB',
        name : 'English'
    },
    LANGUAGE_LIST : [{
            code : 'vi',
            icon : 'VN',
            name : 'Tiếng Việt'
        },
        {
            code : 'en',
            icon : 'GB',
            name : 'English'
        }
    ],
    TIME_FORMATTER : 'MMMM Do YYYY, h:mm:ss a',
    SYNC_INTERVAL : 10000,
    LOOP : 18
};
