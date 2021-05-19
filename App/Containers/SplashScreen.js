import React, { useEffect, useRef, useState } from 'react'
import { Text, Image, View, Linking, AppState } from 'react-native'
import { TemplateBackground } from '../Components/TemplateBackground'

//redux
import LoginRedux from '../Redux/LoginRedux';
// Styles
import styles from '../Containers/Styles/LaunchScreenStyles'
import { Screen } from '../Transforms/Screen'
import images from '../Themes/Images';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

 function SplashScreen(props) {
    const { navigation, login } = props
    const { navigate, getParam } = navigation
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);
    // const appState = useRef(AppState.currentState);
    // const [appStateVisible, setAppStateVisible] = useState(appState.current);
    
    // const _handleAppStateChange = (nextAppState) => {
    //     if (
    //       appState.current.match(/inactive|background/) &&
    //       nextAppState === "active"
    //     ) {
    //       console.log("App has come to the foreground!");
    //     }
    
    //     appState.current = nextAppState;
    //     setAppStateVisible(appState.current);
    //     console.log("AppState", appState.current);
    //   };

    //   useEffect(() => {
    //     // Linking.addEventListener("url",getUrlAsync )
    //     Linking.addEventListener('url',(url)=>{ 
    //         console.log('this is the url: ',url);
    //         setUrl(url.url);
    //         setTimeout(() => {
    //             setProcessing(false)
    //         }, 1000);
    //     });
    //     // AppState.addEventListener("change", _handleAppStateChange);
    //     return () => {
    //     //   Linking.removeEventListener("url",getUrlAsync )
    //     Linking.removeEventListener('url',(url)=>{ 
    //         console.log('this is the url: ',url);
    //         setUrl(url.url);
    //         setProcessing(true)
    //     });
    //     //   AppState.removeEventListener("change", _handleAppStateChange);
    //     };
    //   }, []);
      
    // useEffect(()=>{
        // const params = getParam('params')
        // Linking.addEventListener('url', getUrlAsync());
        // if(processing) {
        //     Linking.canOpenURL(initialUrl)
        // }
        // if(params && params.type ==='transition'){
        //     setTimeout(() => {
        //             navigate(params.root, {
        //                 screen: params.screen,
        //                 initial: true,
        //             }) 
        //     }, 3000);
        // }else{
        //     setTimeout(() => {
        //         if(login){
        //             navigate('Main', {
        //                 screen: 'LoginScreen',
        //                 initial: true,
        //             }) 
        //         }else{
        //             navigate('Auth', {
        //                 screen: 'MainScreen',
        //                 initial: true,
        //             }) 
        //         }   
        //     }, 3000);

        // }
    // },[])

    useEffect(()=>{
        if(!processing && url){
          const route = url && url.replace(/.*?:\/\//g, '');
          const paramName = route && route.split('?')
          const email = paramName && paramName[1].match(/email=([^&]*)/)
          const token = paramName && paramName[1].match(/token=([^&]*)/)
            console.log('  param',paramName)
            console.log('  email ',email )
            console.log('  token ',token )
        }
    },[processing,url])
    return (
        <TemplateBackground cover={false}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', height:Screen.height*0.5, marginHorizontal:Screen.width*0.2, zIndex:1}}>
                        <Text style={{ color: '#35385D', fontSize: Screen.width*0.07, fontWeight: "bold", textAlign:'center' }}>Tenangkan pikiranmu setiap saat</Text>
                        <Text>
                            {processing
                            ? `Processing the initial url from a deep link`
                            : `The deep link is: ${url || "None"}`}
                        </Text>
                    </View>
                    <Image source={images.circleSplash} style={{ width: Screen.width*0.8, marginHorizontal:Screen.width*0.1,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} resizeMode='contain'></Image>
                </View>
            </View>
        </TemplateBackground>
    )
}


const mapStateToProps = (state) => {
    return {
      login: state.login.payload
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(LoginRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)