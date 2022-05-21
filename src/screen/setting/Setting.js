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

export default function SettingScreen({navigation}) {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.header}>
            <TouchableOpacity>
            <Image
            style={styles.Image}
            source={require('../../../assets/img/back.png')}
            />
            </TouchableOpacity>
            <Text style={{paddingLeft:20,fontSize:18}}>Settings</Text>
        </View>
        <View style={styles.horizontalline}/>
            <View style={styles.MainView}>
                <Text style={{color:'#818386'}}>Appearance</Text>
                <View style={styles.subView}>
                        <View style={styles.childView}>
                                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/theme.png')}
                            />
                            <View style={styles.childView1}>
                                <Text style={{fontSize:16,fontWeight:'900'}}>Theme</Text>
                                <Text style={{color:'#A4A7A8'}}>dark mode</Text>

                            </View>
                        </View>
                        <View style={styles.childView}>
                                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/world.png')}
                            />
                            <View style={styles.childView1}>
                                <Text style={{fontSize:16,fontWeight:'900'}}>Language</Text>
                               
                            </View>
                        </View>
                </View>
                <Text style={{color:'#818386'}}>Security</Text>
                <View style={styles.subView}>
                        <View style={styles.childView}>
                                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/passcode.png')}
                            />
                            <View style={styles.childView1}>
                                <Text style={{fontSize:14,fontWeight:'900'}}>Change passcode</Text>
                                <Text style={{color:'#A4A7A8'}}>pin</Text>
                            </View>
                        </View>
                      
                      
                        <View style={styles.subView2}>
                            <View style={styles.switchView}>
                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/finger.png')}
                            /> 
                            <View>
                            <Text style={{paddingLeft:20}}>Use fingerprint</Text>
                            <Text style={{fontSize:10,paddingLeft:20,color:'#A4A7A8'}}>
                               Toggle
                            </Text>
                            </View>
                            </View>
                                     <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />     
                        </View>
                       
                </View>


                <Text style={{color:'#818386'}}>About</Text>
                <View style={styles.subView1}>
                <View style={styles.childView}>
                                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/rate.png')}
                            />
                            <View style={styles.childView1}>
                                <Text style={{fontSize:16,fontWeight:'900'}}>Rate us on Google Play/App Store</Text>
                               
                            </View>
                        </View>
                        <View style={styles.childView}>
                                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/close.png')}
                            />
                            <View style={styles.childView1}>
                                <Text style={{fontSize:16,fontWeight:'900'}}>App information</Text>
                               
                            </View>
                        </View>
                        <View style={styles.childView}>
                                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/close.png')}
                            />
                            <View style={styles.childView1}>
                                <Text style={{fontSize:16,fontWeight:'900'}}>Follow us on Twitter</Text>
                               
                            </View>
                        </View>
                        <View style={styles.childView}>
                                        <Image
                            style={styles.Image}
                            source={require('../../../assets/img/close.png')}
                            />
                            <View style={styles.childView1}>
                                <Text style={{fontSize:16,fontWeight:'900'}}>Like us on Facebook</Text>
                               
                            </View>
                        </View>
                      
                      
                    
                       
                </View>
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
  
