import React, { useEffect, useState } from 'react'
import { Text, Image, View, ImageBackground, Alert } from 'react-native'
import { TemplateBackground } from '../Components/TemplateBackground'

// import Geolocation from '@react-native-community/geolocation';
//redux
import TokenRedux from '../Redux/Authentication/TokenRedux';
// Styles
import styles from '../Containers/Styles/LaunchScreenStyles'
import { Screen } from '../Transforms/Screen'
import images from '../Themes/Images';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Initiate,RemoveEvent,Transition, ExtractURL } from '../Services/HandleDeeplink';
import messaging from '@react-native-firebase/messaging';

 function SplashScreen(props) {
    const { navigation, token } = props
    const { navigate, getParam,state,goBack } = navigation
    const { routeName } = state
    const [url, setUrl] = useState(null);
    const [came, setCame] = useState(false);
    const [nextStep, setnextStep] = useState(false);
    const [params, setParam] = useState(false);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
    
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission({
            alert: true,
            announcement: true,
            badge: true,
            carPlay: true,
            provisional: true,
            sound: true
          });
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
          getFcmToken()
        //   console.log('Authorization status:', authStatus);
        }
      }
    
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        // if (fcmToken) {
        //  console.log(fcmToken);
        //  console.log("Your Firebase Token is:", fcmToken);
        // } else {
        //  console.log("Failed", "No token received");
        // }
      }
      useEffect(() => {
        // Geolocation.requestAuthorization()
        Initiate(setUrl,setCame,navigate,routeName,goBack)
        const pars = getParam('params')
        setParam(pars)

        requestUserPermission();
        messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        // return unsubscribe;
        // return () => {
        // RemoveEvent(setUrl)
        // };
      }, []);

    useEffect(()=>{
        if(came){
            if(url){
                ExtractURL(url, navigate,routeName,goBack)
            }else{
                setnextStep(true)
            }
        }
    },[came,url])

    useEffect(()=>{
        if(nextStep){
            setTimeout(() => {
                if(token) {
                    // navigate('Main', {
                    //     screen: 'MainScreen',
                    //     initial: true,
                    // })
                    navigate('Main', {
                        screen: 'MainScreen',
                        initial: true,
                    }) 
                       
                }else{
                    navigate('Auth', {
                        screen: 'LoginScreen',
                        initial: true,
                    }) 
                }
            }, 3000 );
        }
    },[nextStep,token])
    
    useEffect(()=>{
        if(params){
            Transition(navigate, getParam)
        }
    },[params])
    return (
        <TemplateBackground cover={false}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    {/* <View style={{ width: Screen.width*0.95, position:'absolute',top:0,margin:Screen.width*0.05, zIndex:1}}>
                        <Text style={{ color: '#35385D', fontSize: 32, fontWeight: "bold", textAlign:'center'}}>Tenangkan pikiranmu setiap saat</Text>
                    </View> */}
                    <ImageBackground source={images.circleSplash} style={[styles.backgroundImage,{marginTop:-Screen.height*0.2,alignItems:'center'}]} resizeMode='contain'>
                        <Text style={{ color: '#35385D', fontSize: 32, fontWeight: "bold", textAlign:'justify'}}>Tenangkan{'\n'}pikiranmu {'\n'}setiap saat</Text>
                    </ImageBackground>
                    {/* <Image source={images.circleSplash} style={{ width: Screen.width*0.95, position:'absolute',top:0,margin:Screen.width*0.05}} resizeMode='contain'></Image> */}
                </View>
            </View>
        </TemplateBackground>
    )
}


const mapStateToProps = (state) => {
    return {
      token: state.token.payload
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(TokenRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)