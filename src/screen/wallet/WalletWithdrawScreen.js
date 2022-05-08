import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import LMButton from '../../component/common/LMButton';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import LMTextInput from '../../component/common/LMTextInput';
import Exit from '../../component/icon/Exit';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import WalletService from '../../persistence/wallet/WalletService';
import BitcoinUtil from '../../module/bitcoin/BitcoinUtil';
import _ from 'lodash';
import {WalletAction} from '../../persistence/wallet/WalletAction';
import Contact from '../../component/icon/Contact';
import LMImage from '../../component/common/LMImage';
import LMNotification from '../../component/common/LMNotification';
import {ApplicationProperties} from '../../ApplicationProperties';
import {Root} from 'popup-ui';
import LMLoading from '../../component/common/LMLoading';

yup.addMethod(yup.string, 'isAddressValid', function (errorMessage, network) {
    return this.test(`test-address`, errorMessage, function (value) {
        const {path, createError} = this;
        return (
            BitcoinUtil.validate(value, network) ||
            createError({path, message: errorMessage})
        );
    });
});

export default function WalletWithdrawScreen({navigation}) {
    const {activeWallet} = useSelector(state => state.WalletReducer);
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    const dispatch = useDispatch();
    const [selectedFee, setSelectedFee] = useState({key: 'average', value: 1});
    const [fees, setFees] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    useEffect(async () => {
        const fees = await WalletService.estimateFee();
        setFees(fees);
        refreshBalance();
    }, []);
    const schema = yup.object().shape({
        recipientAddress: yup.string().required(language.pleaseInputRecipientAddress).isAddressValid(language.addressIsIncorrect, activeNetwork.value),
        amount: yup.number().positive(language.shouldBePositiveNumber).typeError(language.shouldBeANumber),
    });
    const {control, handleSubmit, errors, getValues, trigger, setValue, formState} = useForm({
        resolver: yupResolver(schema),
    });
    const init = async () => {
        const fees = await WalletService.estimateFee();
        setFees(fees);
        setValue('recipientAddress', '', false);
        setValue('amount', '0', false);
        setSelectedFee({key: 'fast', value: 1})
    }
    const onRefresh = async () => {
        setRefreshing(true);
        const fees = await WalletService.estimateFee();
        setFees(fees);
        setRefreshing(false);
    };
    const syncData = () => {
        let count = 1;
        const fetchUntilConfirmed = setInterval(() => {
            dispatch(WalletAction.transactions({
                address: activeWallet.address
            })).then(({fetch}) => {
                if (!fetch) {
                    dispatch(WalletAction.list({network: activeNetwork})).then(() => {
                        clearInterval(fetchUntilConfirmed);
                    });
                }
            })
            count++;
            if (count == ApplicationProperties.LOOP) {
                clearInterval(fetchUntilConfirmed);
            }
        }, ApplicationProperties.SYNC_INTERVAL);
    }
    const onSubmit = async ({recipientAddress, amount}) => {
        const params = {
            ...activeWallet,
            network: activeNetwork,
            amount: amount,
            toAddress: recipientAddress,
            fee: fees[selectedFee.key]
        };
        try{
            LMLoading.show();
            const tx = await WalletService.send(params);
            LMLoading.hide();
            LMNotification.popupSuccess({
                buttonText: language.ok,
                callback: () => {
                    syncData();
                    init();
                },
                title: language.success,
                message: "Successfully sent."
            })
        }catch(e){
            console.log('error in sending',e)
            LMLoading.hide();
            LMNotification.error({
                title: language.error,
                text: "Failed. Please check insuffient funds",
            })
        }
       
    };
    const refreshBalance = async ()=>{
        function sleep(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });
        }
        while(1){
            dispatch(WalletAction.list({network: activeNetwork}));
            await sleep(2000);
        }
    }
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMText style={styles.headerTitle}>{language.send}</LMText>
                    <LMTouchableOpacity style={styles.drawer} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Exit/>
                    </LMTouchableOpacity>
                </View>
                <ScrollView
                    style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <View style={styles.btcAmountContainer}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <TextInput
                                    style={styles.btcAmountInput}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['amount']}
                                    maxLength={10}
                                    keyboardType={'numeric'}
                                    onEndEditing={handleSubmit()}
                                />
                            )}
                            name="amount"
                            defaultValue={'0'}
                        />
                        <View style={styles.btcLabelContainer}>
                            <LMText style={styles.btcLabel}>⊜</LMText>
                        </View>
                    </View>
                    <View style={styles.fiatAmountContainer}>
                        <LMTouchableOpacity onPress={async () => {
                            setValue('amount', `${activeWallet.balance}`, false);
                        }}>
                            <LMText style={styles.fiatLabel}>{activeWallet.balance} ⊜</LMText>
                        </LMTouchableOpacity>

                    </View>
                    <Controller
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <LMTextInput
                                label={language.recipientAddress}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                error={errors['recipientAddress']}
                                placeholder={language.recipientAddress}
                                onEndEditing={handleSubmit()}
                            />
                        )}
                        name="recipientAddress"
                        defaultValue={''}
                    />
                    <View style={styles.contactContainer}>
                        <LMTouchableOpacity style={styles.receive} onPress={() => {
                            navigation.navigate('SearchContactScreen', {
                                screenName: 'WalletWithdrawScreen',
                                onScanSuccess: async (address) => {
                                    setValue('recipientAddress', address, {shouldValidate: true});
                                }
                            });
                        }}>
                            <View style={styles.buttonIcon}>
                                <Contact color={Theme.colors.buttonAlternativeTextColor2}/>
                            </View>
                            <View style={styles.buttonText}>
                                <LMText style={styles.receiveText}>{language.contact}</LMText>
                            </View>
                        </LMTouchableOpacity>
                        <View style={{width: 0.5, backgroundColor: 'white'}}></View>
                        <LMTouchableOpacity style={styles.send} onPress={() => {
                            navigation.navigate('WalletScannerScreen', {
                                screenName: 'WalletWithdrawScreen',
                                onScanSuccess: async (address) => {
                                    setValue('recipientAddress', address, {shouldValidate: true});
                                }
                            });
                        }}>
                            <View style={styles.buttonText}>
                                <LMText style={styles.receiveText}>{language.scan}</LMText>
                            </View>

                            <View style={styles.buttonIcon}>
                                <LMImage source={require('../../../assets/img/scan.png')} style={styles.receiveIcon}/>
                            </View>
                        </LMTouchableOpacity>
                    </View>
                    <View style={styles.transactionFeeContainer}>
                        <LMText style={styles.label}>{language.transactionFee}</LMText>
                        <LMTouchableOpacity style={styles.fee} onPress={async () => {
                            setSelectedFee({
                                key: 'fast',
                                value: fees.fast,
                            });
                        }}>
                            {
                                selectedFee.key === 'fast' &&
                                <View style={styles.feeIcon}>
                                    <View style={styles.icon}>

                                    </View>
                                </View>
                            }

                            <View style={styles.feeInfo}>
                                <LMText>{language.fast}</LMText>
                            </View>
                            <View style={styles.feePrice}>
                                <LMText>{BitcoinUtil.toFixed(fees.fast)} (sat/vB)</LMText>
                            </View>
                        </LMTouchableOpacity>
                        <LMTouchableOpacity style={styles.fee} onPress={async () => {
                            setSelectedFee({
                                key: 'average',
                                value: fees.average,
                            });
                        }}>
                            {
                                selectedFee.key === 'average' &&
                                <View style={styles.feeIcon}>
                                    <View style={[styles.icon, styles.average]}>

                                    </View>
                                </View>
                            }

                            <View style={styles.feeInfo}>
                                <LMText>{language.average}</LMText>
                            </View>
                            <View style={styles.feePrice}>
                                <LMText>{BitcoinUtil.toFixed(fees.average)} (sat/vB)</LMText>
                            </View>
                        </LMTouchableOpacity>
                        <LMTouchableOpacity style={styles.fee} onPress={async () => {
                            setSelectedFee({
                                key: 'slow',
                                value: fees.slow,
                            });
                        }}>
                            {
                                selectedFee.key === 'slow' &&
                                <View style={styles.feeIcon}>
                                    <View style={[styles.icon, styles.slow]}>

                                    </View>
                                </View>
                            }
                            <View style={styles.feeInfo}>
                                <LMText>{language.slow}</LMText>
                            </View>
                            <View style={styles.feePrice}>
                                <LMText>{BitcoinUtil.toFixed(fees.slow)} (sat/vB)</LMText>
                            </View>
                        </LMTouchableOpacity>
                    </View>
                    {/* <View style={styles.transactionFeeContainer}>
                        <LMText style={styles.label}>{language.summary}</LMText>
                        <View style={{marginTop: 10}}>
                            <View style={styles.summaryInformation}>
                                <LMText>{language.requestAmount}</LMText>
                                <LMText>{fee.withdrawAmount} ⊜</LMText>
                            </View>
                            <View style={styles.summaryInformation}>
                                <LMText>{language.fee}</LMText>
                                <LMText>{fee.fee} ⊜</LMText>
                            </View>
                            <View style={styles.summaryInformation}>
                                <LMText>{language.totalAmount}</LMText>
                                <LMText>{fee.totalAmount} ⊜</LMText>
                            </View>
                        </View>

                    </View> */}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <LMButton label={language.send} onPress={handleSubmit(onSubmit)}/>
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Theme.colors.foregroundColor,
        paddingHorizontal: 4,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        paddingTop: 30,

    },
    sectionTitle: {
        color: Theme.colors.foregroundColor,
        fontWeight: '400',
        marginBottom: 10,
    },

    buttonContainer: {
        minHeight: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    addressContainer: {
        marginTop: 30,
    },
    addressText: {
        fontSize: 16,
        color: Theme.colors.alternativeTextColor,
        textAlign: 'center',
    },
    btcAmountContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70
    },
    btcAmountInput: {
        flex: 1,
        fontSize: 34,
        textAlign: 'right',
        color: Theme.colors.newBlue,
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btcLabelContainer: {
        width: 60,
        height: '100%',
        justifyContent: 'center'

    },
    btcLabel: {fontSize: 24, color: Theme.colors.newBlue, marginLeft: 10},
    fiatAmountContainer: {flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end'},
    fiatLabel: {
        fontSize: 16,
        color: Theme.colors.alternativeTextColor,
        textAlign: 'center',
    },
    fiatUnit: {fontSize: 24, color: Theme.colors.newBlue, marginLeft: 10},
    transactionFeeContainer: {
        width: '100%',
        marginTop: 10,
    },
    label: {
        color: Theme.colors.foregroundColor,
        fontWeight: '400',
    },
    fee: {
        width: '100%',
        height: 50,
        borderWidth: 0.2,
        borderRadius: 5,
        borderColor: '#d5d5d5',
        marginTop: 10,
        flexDirection: 'row',
        paddingRight: 10,
    },
    feeIcon: {
        width: 32, height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    feeInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    icon: {
        width: 16, height: 16, borderRadius: 50, backgroundColor: Theme.colors.msSuccessBG,
    },
    feePrice: {
        width: 100,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    average: {
        backgroundColor: Theme.colors.lnborderColor,
    },
    slow: {
        backgroundColor: Theme.colors.redText,
    },
    summaryInformation: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5},
    contactContainer: {
        minHeight: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    contact: {
        width: 100,
        height: 40,
        borderRadius: 10,
    },
    receive: {
        width: 130,
        height: 55,
        backgroundColor: Theme.colors.ballOutgoingExpired,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
    },
    send: {
        width: 130,
        height: 55,
        backgroundColor: Theme.colors.ballOutgoingExpired,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
    },
    buttonIcon: {
        width: 45,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    receiveIcon: {width: 29, height: 29, transform: [{rotate: '180deg'}]},
    receiveText: {color: Theme.colors.foregroundColor, fontSize: 16},
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
