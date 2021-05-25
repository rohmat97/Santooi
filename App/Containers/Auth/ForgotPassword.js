import React, { useEffect, useState } from 'react'
import { Text, Image, View, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { TemplateBackground } from '../../Components/TemplateBackground'
//redux
import ForgotRedux from '../../Redux/ForgotRedux';
import CheckEmailRedux from '../../Redux/CheckEmailRedux'
// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors } from '../../Themes';
import { PasswordEye } from '../../Components/PasswordEye'
import RoundedButton from '../../Components/RoundedButton'
import ErrorButton from '../../Components/ErrorButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CheckEmail } from './Function';

function ForgotPassword(props) {
    const { navigation, ForgotRequest, forgot, ForgotSuccess,check, CheckEmailRequest } = props
    const { navigate, getParam } = navigation
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState()
    const [validateEmail, setValidateEmail] = useState(false)
    const [avail, setavail] = useState(false)

    const validate = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setEmail(email)
        CheckEmailRequest(email)
        if (reg.test(email) === false) {
            setValidateEmail(false)
            return false
        }
        else {
            setValidateEmail(true)
        }
    }
    const SubmitResetPassword= () =>{
        if(validateEmail){
            ForgotRequest({
                'email':email
            })
        }
    }
    useEffect(()=>{
        if(forgot){
            Alert.alert('Email berhasil dikirimkan');
            navigate('LoginScreen')
            ForgotSuccess(null)
        }
    },[forgot])

    useEffect(()=>{
        if(check){
            CheckEmail(setavail, 'forgot', check)
        }
    },[check])
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
                                    label="Masukan email"
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
                        {validateEmail && avail &&
                            <Image source={images.ok} style={{ margin: 10 }} resizeMode='center'></Image>
                        }
                    </View>

                    {!validateEmail ? email.length > 0 &&
                        <View style={{ marginBottom: 10 }}>
                            <ErrorButton text={'Email tidak valid'} />
                        </View>
                        :!avail?
                        <View style={{ marginBottom: 10 }}>
                            <ErrorButton text={'Email tidak terdaftar'} />
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 13, marginRight: 10 }}>Kami akan mengirimkan email konfirmasi untuk mengganti password-mu</Text>
                        </View>}

                    <View style={{ marginTop: Screen.width * 0.1 }} />
                    <RoundedButton
                        text={'Lanjut'}
                        onPress={() => SubmitResetPassword()}
                        disabled={validateEmail && avail ? false : true}
                        backgroundColor={validateEmail && avail ? '#266CF5' : '#b3b3cc'} />
                </View>
            </View>
        </TemplateBackground>
    )
}

const mapStateToProps = (state) => {
  return {
    forgot: state.forgot.payload,
    check: state.checkEmail.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(ForgotRedux, CheckEmailRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)