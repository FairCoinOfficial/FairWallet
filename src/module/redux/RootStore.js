import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import LanguageReducer from '../../persistence/language/LanguageReducer';
import WalletReducer from '../../persistence/wallet/WalletReducer';
import NetworkReducer from '../../persistence/network/NetworkReducer';
import ContactReducer from '../../persistence/contact/ContactReducer';
import ThemeReducer from '../../persistence/setting/ThemeReducer';

const applicationStore = configureStore({
    reducer: {
        LanguageReducer,
        WalletReducer,
        NetworkReducer,
        ContactReducer,
        ThemeReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})
export default applicationStore;
