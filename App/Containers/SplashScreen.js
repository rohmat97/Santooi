import React, { useEffect, useState } from 'react'
import { Text, Image, View, ImageBackground } from 'react-native'
import { TemplateBackground } from '../Components/TemplateBackground'

//redux
import TokenRedux from '../Redux/TokenRedux';
// Styles
import styles from '../Containers/Styles/LaunchScreenStyles'
import { Screen } from '../Transforms/Screen'
import images from '../Themes/Images';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Initiate,RemoveEvent,Transition, ExtractURL } from '../Services/HandleDeeplink';

 function SplashScreen(props) {
    const { navigation, token } = props
    const { navigate, getParam,state,goBack } = navigation
    const { routeName } = state
    const [url, setUrl] = useState(null);
    const [came, setCame] = useState(false);
    const [nextStep, setnextStep] = useState(false);
    const [params, setParam] = useState(false);
      useEffect(() => {
        Initiate(setUrl,setCame,navigate,routeName,goBack)
        const pars = getParam('params')
        setParam(pars)
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
                setCame(false)
                setnextStep(false) 
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
                    <ImageBackground source={images.circleSplash} style={[styles.backgroundImage,{marginTop:-Screen.height*0.2}]} resizeMode='contain'>
                    <Text style={{ color: '#35385D', fontSize: 32, fontWeight: "bold", textAlign:'center'}}>Tenangkan pikiranmu setiap saat</Text>
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