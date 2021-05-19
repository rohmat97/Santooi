import React, { useEffect } from 'react'
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
import { get } from 'lodash';

 function SplashScreen(props) {
    const { navigation, login } = props
    const { navigate, getParam } = navigation

    useEffect(()=>{
        const params = getParam('params')
        console.log(params)
        if(params && params.type ==='transition'){
            setTimeout(() => {
                    navigate(params.root, {
                        screen: params.screen,
                        initial: true,
                    }) 
            }, 3000);
        }else{
            setTimeout(() => {
                if(login){
                    navigate('Main', {
                        screen: 'LoginScreen',
                        initial: true,
                    }) 
                }else{
                    navigate('Auth', {
                        screen: 'MainScreen',
                        initial: true,
                    }) 
                }   
            }, 3000);

        }
    },[])

    return (
        <TemplateBackground cover={false}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', height:Screen.height*0.5, marginHorizontal:Screen.width*0.2, zIndex:1}}>
                        <Text style={{ color: '#35385D', fontSize: Screen.width*0.07, fontWeight: "bold", textAlign:'center' }}>Tenangkan pikiranmu setiap saat</Text>
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