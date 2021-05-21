import React, { useEffect, useState } from 'react'
import { Text, Image, View } from 'react-native'
import { TemplateBackground } from '../Components/TemplateBackground'

//redux
import LoginRedux from '../Redux/LoginRedux';
// Styles
import styles from '../Containers/Styles/LaunchScreenStyles'
import { Screen } from '../Transforms/Screen'
import images from '../Themes/Images';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Initiate,RemoveEvent,Transition, ExtractURL } from '../Services/HandleDeeplink';

 function SplashScreen(props) {
    const { navigation, login, } = props
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
                if(login){
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
            }, 2000);
        }
    },[nextStep,login])
    
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
                    <View style={{justifyContent:'center', alignItems:'center', height:Screen.height*0.8, zIndex:1,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, marginHorizontal:Screen.width*0.3}}>
                        <Text style={{ color: '#35385D', fontSize: 32, fontWeight: "bold", textAlign:'center', }}>Tenangkan pikiranmu setiap saat</Text>
                        {/* <Text>
                            {!url
                            ? `Processing the initial url from a deep link`
                            : `The deep link is: ${url || "None"}`}
                        </Text> */}
                    </View>
                    <Image source={images.circleSplash} style={{ width: Screen.width*0.8, marginHorizontal:Screen.width*0.1,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} resizeMode='contain'></Image>
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