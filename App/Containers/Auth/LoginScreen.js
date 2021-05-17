import React, { useEffect, useState } from 'react'
import { Text, Image, View, TouchableOpacity, Alert, Button, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
    AccessToken,
    AuthenticationToken,
    LoginButton,
    LoginManager,
    Settings
  } from 'react-native-fbsdk-next';

// Component
import { TemplateBackground } from '../../Components/TemplateBackground'
// Redux 

import LoginRedux from '../../Redux/LoginRedux'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors } from '../../Themes';
import { PasswordEye } from '../../Components/PasswordEye'
import RoundedButton from '../../Components/RoundedButton'
import ErrorButton from '../../Components/ErrorButton'
import { Overlay } from 'react-native-elements';
import SignUp from './SignUp';


async function Setup() {
    // You can await here
    await GoogleSignin.configure({
        webClientId: '838643060564-l0m9kf3sempgvroimh4nhng3lo8elobq.apps.googleusercontent.com',
        offlineAccess: true
      })
    // Ask for consent first if necessary
    // Possibly only do this for iOS if no need to handle a GDPR-type flow
   await Settings.initializeSDK();
    // ...
  }

function LoginScreen(props) {
    const { navigation, LoginRequest, login, errorLogin } = props
    const { navigate } = navigation
    const { type } = navigation.state.params
    // for form login/register and validation
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState()
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState()
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [validateEmail, setValidateEmail] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(true)
    // for google signin
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);
    const [error, setError] =useState('')
    const [visible, setvisible] = useState(false)
    //show/hide password
    const onAccessoryPress = () => {
        setSecureTextEntry(!secureTextEntry)
    }
    // validation email
    const validate = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            setEmail(email)
            setValidateEmail(false)
            return false
        }
        else {
            setEmail(email)
            setValidateEmail(true)
        }
    }
     const signInGoogle =async()=> {
        try {
        await GoogleSignin.hasPlayServices();
        const data = await GoogleSignin.signIn();

        console.log('data',data)
        // console.log('idToken',idToken)
        setloggedIn(true);
        const credential = auth.GoogleAuthProvider.credential(
            data.idToken,
            data.accessToken,
        );
        // console.log('credential',credential)
        await auth().signInWithCredential(credential);
        //  Alert.alert(data)
        // console.log('credential',credential)
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // when user cancels sign in process,
            Alert.alert('Process Cancelled');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // when in progress already
            Alert.alert('Process in progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // when play services not available
            Alert.alert('Play services are not available');
          } else {
            // some other error
            Alert.alert('Something else went wrong... ', error.toString());
            setError(error);
          }
        }
      }
      const signInFacebook =async()=> {
        // if (Platform.OS === "android") {
            // await LoginManager.setLoginBehavior('web_only')
        // }
        await LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
            if (result.isCancelled) {
            console.log("Login Cancelled " + JSON.stringify(result))
            } else {
            console.log("Login success with  permisssions: " + result.grantedPermissions.toString());
            console.log("Login Success " + JSON.stringify(result));
            AccessToken.getCurrentAccessToken().then(
                async(data) => {
                  console.log('success',JSON.stringify(data))
                // console.log('credential',credential)
                await auth().signInWithCredential(auth.FacebookAuthProvider.credential(data.accessToken)).then(naise =>{
                    console.log('naise', naise)
                }).catch(err =>{
                    console.log('error ', err)
                })
                }
              ).catch(err =>{
                  console.log('error', JSON.stringify(err))
              })
            }
            },
            function (error) {
            alert("Login failed with error: " + error);
            })
        }
    const signOut = async () => {
        try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setloggedIn(false);
        setuserInfo([]);
        console.log('success logout')
        } catch (error) {
        console.log('error logout',error)
        }
    };
    
    const LoginByEmail = () =>{
        setvisible(true)
        setTimeout(() => {
            LoginRequest({
                'email': 'user1@mailinator.com',
                'password': '123456'
            })
        }, 1000);
       
    }
    useEffect(()=>{
        console.log('LOGIN BOIS',login)
        if(login) {
            setvisible(false)
            // navigate('Main', {
            //     screen: 'MainScreen',
            //     initial: true,
            // })
        }
        if(errorLogin){
            setvisible(false)
            alert(JSON.stringify(errorLogin))
        }
    },[login,errorLogin])

    const Register =()=>{
        if(validateEmail && password.length>7) {
            navigate('SignUpScreen',{ params : {
                email: email,
                password: password
            }})
        }
       
    }
    useEffect(()=>{
        Setup()
    },[])
    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>

                    {type == 'login' ? !loginSuccess &&
                        <ErrorButton text={'Kombinasi email dan password tidak tepat'} /> : <View />
                    }

                    <View style={styles.textbox}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                borderRadius: 4,
                                height: 55,
                                marginBottom: 12,
                                overflow: 'hidden',
                            }}>
                                <TextInput
                                    label="Email atau Nomor Telepon"
                                    value={email}
                                    onChangeText={email => validate(email)}
                                    inputRef={(ref) => (this.email = ref)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    error={errorEmail}
                                    returnKeyType="next"
                                    onSubmitEditing={() => {
                                        this.password.focus()
                                    }}
                                    theme={{
                                        colors: {
                                            placeholder: 'white',
                                            text: 'white',
                                            primary: 'white',
                                        }
                                    }}
                                    style={styles.textInput}
                                    selectionColor={'#939598'}
                                />
                            </View>
                        </View>
                        {validateEmail &&
                            <Image source={images.ok} style={{ margin: 10 }} resizeMode='center'></Image>
                        }
                    </View>

                    {!validateEmail ? email.length > 0 &&
                        <View style={{ marginBottom: 10 }}>
                            <ErrorButton text={'Email tidak terdaftar'} />
                        </View>
                        : <View />}

                    <View style={styles.textbox}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                borderRadius: 4,
                                height: 55,
                                marginBottom: 12,
                                overflow: 'hidden',
                            }}>
                                <TextInput
                                    inputRef={(ref) => (this.password = ref)}
                                    label="Kata Sandi"
                                    value={password}
                                    error={errorPassword}
                                    onChangeText={password => setPassword(password)}
                                    secureTextEntry={secureTextEntry}
                                    renderAccessory={() => onAccessoryPress(secureTextEntry)}
                                    returnKeyType="done"
                                    style={styles.textInput}
                                    theme={{
                                        colors: {
                                            placeholder: 'white',
                                            text: 'white',
                                            primary: 'white',
                                        }
                                    }}
                                    selectionColor={'#939598'}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Image source={secureTextEntry? images.closeEye : images.eye} style={{ margin: 10 }} resizeMode='center'></Image>
                        </TouchableOpacity>
                    </View>

                    {password.length > 0 ? password.length < 8 &&
                        <View style={{ marginBottom: 10 }}>
                            <ErrorButton text={'Password minimal 8 karakter'} />
                        </View>
                        : <View />}

                    {type == 'login' &&
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 13, marginRight: 10 }}>Lupa password?</Text>
                            <TouchableOpacity onPress={() => navigate('ForgotPasswordScreen')}>
                                <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold', textDecorationLine: 'underline' }}>Buat password baru</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <View style={{ marginTop: Screen.width * 0.1 }} />
                    {type == 'signup' &&
                        <RoundedButton
                            text={'Lanjut'}
                            onPress={() =>  Register()}
                            backgroundColor={'#266CF5'} />
                    }

                    {type == 'login' &&
                        <RoundedButton
                            text={'Login'}
                            onPress={() => LoginByEmail()}
                            backgroundColor={'#266CF5'} />
                    }

                    <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View
                            style={{
                                borderBottomColor: '#C4C4C4',
                                borderBottomWidth: 1,
                                flex: 0.5,
                            }}
                        />
                        <Text style={{ marginHorizontal: 10, color: '#C4C4C4' }}>atau</Text>
                        <View
                            style={{
                                borderBottomColor: '#C4C4C4',
                                borderBottomWidth: 1,
                                flex: 0.5,
                            }}
                        />
                    </View>
                    <RoundedButton
                        text={'Masuk dengan Google'}
                        onPress={() => signInGoogle()}
                        backgroundColor={'#5B87E4'}
                        image={images.google}
                        width={15}
                        height={15} />
                    <RoundedButton
                        text={'Masuk dengan Facebook'}
                        onPress={() => signInFacebook()}
                        backgroundColor={'#374F8B'}
                        image={images.fb}
                        width={10}
                        height={20} />
                    {!loggedIn && <Text>You are currently logged out</Text>}
                    {loggedIn && (
                        <Button
                        onPress={()=>signOut()}
                        title="LogOut"
                        color="red"></Button>
                    )}
                </View>
            </View>
            <Overlay visible={visible} overlayStyle={{width:Screen.width, height:Screen.height, backgroundColor:'transparent',justifyContent:'center',alignContent:'center'}}>
                <ActivityIndicator  color={'#9A5EBA'} size='large'/>
            </Overlay>
        </TemplateBackground>
    )
}


const mapStateToProps = (state) => {
  return {
    login: state.login.payload,
    errorLogin: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(LoginRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)