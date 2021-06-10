import React, { useEffect, useState } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import { TemplateBackground } from '../../Components/TemplateBackground'

// Redux
import ResetPasswordRedux from '../../Redux/Authentication/ResetPasswordRedux';
// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors } from '../../Themes';
import { PasswordEye } from '../../Components/PasswordEye'
import RoundedButton from '../../Components/RoundedButton'
import ErrorButton from '../../Components/ErrorButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function CreateNewPassword(props) {
    const { navigation, ResetPasswordRequest,data,ResetPasswordSuccess } = props
    const { navigate, getParam } = navigation
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorPassword1, setErrorPassword1] = useState()
    const [errorPassword2, setErrorPassword2] = useState()
    const [secureTextEntry1, setSecureTextEntry1] = useState(true)
    const [secureTextEntry2, setSecureTextEntry2] = useState(true)
    const [passwordMatch, setPasswordMatch] = useState(false)

    const onAccessoryPress1 = () => {
        setSecureTextEntry1(!secureTextEntry1)
    }

    const onAccessoryPress2 = () => {
        setSecureTextEntry2(!secureTextEntry2)
    }

    const checkingPassword1 = (password) => {
        setPassword1(password)
        if (password2 == password) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
        // if (password2.length == password.length) {
        //     if (password2.toString == password.toString) {
        //         setPasswordMatch(true)
        //     } else {
        //         setPasswordMatch(false)
        //     }
        // } else {
        //     setPasswordMatch(false)
        // }

    }

    const checkingPassword2 = (password) => {
        setPassword2(password)

        if (password1 == password) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
    }

    const Submit = () =>{

        const params = getParam('params')
        const data = {
            'email':params.email,
            'token':params.token,
            'password':password1
        }
        ResetPasswordRequest(data)
    }

    useEffect(()=>{
        if(data){
            const params = getParam('params')
            navigate('CreateNewPasswordSuccessScreen',{email:params.email})
        }
    },[data])
    useEffect(() => {
        ResetPasswordSuccess(null)
    }, [])
    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>

                    <View style={styles.textbox}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                borderRadius: 4,
                                height: 55,
                                marginBottom: 12,
                                overflow: 'hidden',
                            }}>
                                <TextInput
                                    inputRef={(ref) => (this.password1 = ref)}
                                    label="Masukan password baru"
                                    value={password1}
                                    error={errorPassword1}
                                    onChangeText={password1 => checkingPassword1(password1)}
                                    secureTextEntry={secureTextEntry1}
                                    renderAccessory={() => onAccessoryPress1(secureTextEntry1)}
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

                        {passwordMatch && password1.length>0 &&
                            <Image source={images.ok} style={{ margin: 10 }} resizeMode='center'></Image>
                        }

                        {!passwordMatch &&
                            <TouchableOpacity onPress={() => setSecureTextEntry1(!secureTextEntry1)}>
                                <Image source={secureTextEntry1 ? images.closeEye : images.eye} style={{ margin: 10,maxWidth:25,maxHeight:25 }} resizeMode='contain'></Image>
                            </TouchableOpacity>
                        }
                    </View>

                    {password1.length > 0 ? password1.length < 8 &&
                        <View style={{ marginBottom: 10 }}>
                            <ErrorButton text={'Password minimal 8 karakter'} />
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
                                    inputRef={(ref) => (this.password2 = ref)}
                                    label="Konfirmasi password baru"
                                    value={password2}
                                    error={errorPassword2}
                                    onChangeText={password2 => checkingPassword2(password2)}
                                    secureTextEntry={secureTextEntry2}
                                    renderAccessory={() => onAccessoryPress2(secureTextEntry2)}
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
                        {passwordMatch&& password2.length>0 &&
                            <Image source={images.ok} style={{ margin: 10 }} resizeMode='center'></Image>
                        }

                        {!passwordMatch &&
                            <TouchableOpacity onPress={() => setSecureTextEntry2(!secureTextEntry2)}>
                                <Image source={secureTextEntry2 ? images.closeEye : images.eye} style={{ margin: 10,maxWidth:25,maxHeight:25 }} resizeMode='contain' ></Image>
                            </TouchableOpacity>
                        }
                    </View>

                    {password1 !== password2 ? !passwordMatch &&
                        <View style={{ marginBottom: 10 }}>
                            <ErrorButton text={'Password tidak sesuai'} />
                        </View> : <View />
                    }

                    <View style={{ marginTop: Screen.width * 0.1 }} />
                    <RoundedButton
                        text={'Konfirmasi'}
                        onPress={() => {
                            if(passwordMatch && password1.length>7 && password2.length>7){
                                Submit()
                            }
                        }}
                        backgroundColor={passwordMatch && password1.length>7 && password2.length>7? '#266CF5' : '#b3b3cc'}  />
                </View>
            </View>
        </TemplateBackground>
    )
}



const mapStateToProps = (state) => {
    return {
      data: state.resetPassword.payload
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(ResetPasswordRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPassword)