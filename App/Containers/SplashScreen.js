import React, { useEffect, useState } from 'react'
import { Text, Image, View, ImageBackground, Alert, Platform, DeviceEventEmitter, Linking } from 'react-native'
import { TemplateBackground } from '../Components/TemplateBackground'
import messaging from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

// import Geolocation from '@react-native-community/geolocation';
//redux
import TokenRedux from '../Redux/Authentication/TokenRedux';
// Styles
import styles from '../Containers/Styles/LaunchScreenStyles'
import { Screen } from '../Transforms/Screen'
import images from '../Themes/Images';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Initiate,Transition, ExtractURL } from '../Services/HandleDeeplink';
import { CallIncoming, handleRemoteMessage } from '../Services/IncomingCall';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background!', remoteMessage);
    handleRemoteMessage(remoteMessage)
  });
  

 function SplashScreen(props) {
    const { navigation, token } = props
    const { getParam,state,goBack, navigate } = navigation
    const { routeName } = state
    const [url, setUrl] = useState(null);
    const [came, setCame] = useState(false);
    const [nextStep, setnextStep] = useState(false);
    const [params, setParam] = useState(false);

    const checkToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
           console.log(fcmToken);
        } 
       }
    const requestUserPermission = async () => {
      if(Platform.OS==='ios'){
        await messaging().requestPermission({
          sound: false,
          announcement: true,
          // ... other permission settings
        });
      }else{
        await messaging().requestPermission({
          alert: true,
          announcement: true,
          badge: true,
          carPlay: true,
          provisional: true,
          sound: true
        });
      }
      
      }

      useEffect(() => {
        Initiate(setUrl,setCame,navigate,routeName,goBack)
        const pars = getParam('params')
        setParam(pars)
        checkToken()
        requestUserPermission();
        if( Platform.OS==='ios'){
          PushNotificationIOS.setNotificationCategories([
            {
              id: 'userAction',
              actions: [
                {id: 'open', title: 'Open', options: {foreground: true}},
                {
                  id: 'ignore',
                  title: 'Desruptive',
                  options: {foreground: true, destructive: true},
                },
                {
                  id: 'text',
                  title: 'Text Input',
                  options: {foreground: true},
                  textInput: {buttonTitle: 'Send'},
                },
              ],
            },
          ])
        }else{
          PushNotification.configure({
            onRegister: async (token) => {
              console.log('TOKEN:', token);
            },
            onNotification: function (notification) {
              console.log('NOTIFICATION:', notification);
              notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            onAction: function (notification) {
              console.log('ACTION:', notification.action);
              console.log('NOTIFICATION:', notification);
            },
            onRegistrationError: function (err) {
              console.error(err.message, err);
            },
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
          });
        }
        
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
                console.log(`token`, token)
                if(token) {
                    inAppMessaging().setMessagesDisplaySuppressed(true);
                    messaging().onMessage(async remoteMessage => {
                    //   console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
                    
                    PushNotification.localNotification({
                        title: remoteMessage.data.title,
                        message: remoteMessage.data.body,
                    })
                      if(remoteMessage?.data?.title === 'end_call'){
                        Linking.openURL('santooi://MainScreen')
                      }else{
                        CallIncoming( navigate, remoteMessage, token )
                      }
                    });
                    messaging().onNotificationOpenedApp(remoteMessage => {
                        console.log(
                          'Notification caused app to open from background state:',
                          remoteMessage,
                        );
                      });
                    messaging()
                        .getInitialNotification()
                            .then(remoteMessage => {
                            if (remoteMessage) {
                                console.log(
                                'Notification caused app to open from quit state:',
                                remoteMessage,
                                );
                            }
                    });
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
  // console.log(`state.nav`, state.nav)
    return {
      token: state.token.payload
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(TokenRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)