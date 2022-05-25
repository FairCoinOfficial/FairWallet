/* eslint-disable prettier/prettier */
import React, {useEffect,useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text, Card,TouchableWithoutFeedback,Image,Switch} from 'react-native';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import Exit from '../../component/icon/Exit';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import UserAvatar from 'react-native-user-avatar';
import LMButton from '../../component/common/LMButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Flag from 'react-native-flags-typescript';
import {LanguageAction} from '../../persistence/language/LanguageAction';



export default function ChangeLanguage({navigation}) {
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    //const {language} = useSelector(state => state.LanguageReducer);
    const {language, languages, defaultLanguage} = useSelector(state => state.LanguageReducer)

    const setLanguage = (item) => {
    dispatch(LanguageAction.set(item.code)).then(() => {
        dispatch(LanguageAction.setDefault(item));
    });
    }

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>{
                        navigation.navigate("SettingScreen");}}>
            <Image
            style={styles.Image}
            source={require('../../../assets/img/back.png')}
            />
            </TouchableOpacity>
            <Text style={{paddingLeft:20,fontSize:18}}>Change Language</Text>
        </View>
        <View style={styles.horizontalline}/>
            <View style={styles.MainView}>
                {languages.map((item)=>
                    <TouchableOpacity
                    onPress={()=>{dispatch(LanguageAction.set(item.code)).then(() => {
                        console.log("theme mode set==lag>",item)

                        dispatch(LanguageAction.setDefault(item));
                        navigation.navigate("SettingScreen");
                    });}}
                    >
                        <View key={item.name}>
                            <View style={styles.childView}>
                                <Flag
                                    code={item.icon}
                                    size={32}
                                />
                                <View style={styles.childView1}>
                                    <Text style={{fontSize:16,fontWeight:'900'}}>{item.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
    </ScrollView>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F7F7F7",
    },
    mainCardView: {
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#fff",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
      flexDirection: 'row',
     // justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 14,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    subCardView: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: "#fff",
      borderColor: "#eee",
      borderWidth: 1,
      borderStyle: 'solid',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
    width:'100%',
    height:50,
    backgroundColor:'#F7F7F7',
    flexDirection:'row',
    alignItems:'center'
    },
    Image:{
        width:20,
        height:20,
        marginLeft:10
    },
    MainView:{
       width:'94%',
       alignSelf:'center',
       paddingTop:15
    },
    subView:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:5,
        marginVertical:20
    },
    subView1:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:5,
        marginVertical:20
    },
    childView:{
        flexDirection:'row',
        padding:20,
        alignItems:'center'
    },
    childViewCol:{
        padding:20,
        alignItems:'center'
    },
    childView1:{
        paddingLeft:20
    },
    horizontalline:{
        width:'100%',
        height:5,
        backgroundColor:'#F0F0F0'
    },
    subView2:{
        padding:20,
       flexDirection:'row',
       justifyContent:'space-between'
    },
    switchView:{
        flexDirection:'row'
    }
  });
  
