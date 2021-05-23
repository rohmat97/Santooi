import React, { useEffect, useState } from 'react'
import { Text, Image, View, TouchableOpacity, Linking, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { TemplateBackground } from '../../Components/TemplateBackground'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors } from '../../Themes';
import { PasswordEye } from '../../Components/PasswordEye'
import RoundedButton from '../../Components/RoundedButton'
import ErrorButton from '../../Components/ErrorButton'

export function CreateNewPasswordSuccess(props) {
    const { navigation } = props
    const { navigate, getParam } = navigation
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorPassword1, setErrorPassword1] = useState()
    const [errorPassword2, setErrorPassword2] = useState()
    const [secureTextEntry1, setSecureTextEntry1] = useState(true)
    const [secureTextEntry2, setSecureTextEntry2] = useState(true)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [openUrl,setOpenUrl] = useState('')

    const onAccessoryPress1 = () => {
        setSecureTextEntry1(!secureTextEntry1)
    }

    const onAccessoryPress2 = () => {
        setSecureTextEntry2(!secureTextEntry2)
    }

    const checkingPassword1 = (password) => {
        setPassword1(password)

        console.log((password1.length + 1) + " " + password2.length)

        if (password2.length == password1.length + 1) {
            if (password2.toString == password1.toString + 1) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
        } else {
            setPasswordMatch(false)
        }

    }

    const checkingPassword2 = (password) => {
        setPassword2(password)

        console.log(password1.length + " " + (password2.length + 1))

        if (password1.length == password2.length + 1) {
            if (password2.toString == password1.toString) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
        } else {
            setPasswordMatch(false)
        }

    }

    useEffect(()=>{
       const email = getParam('email') 
       const split = email.split('@')
       setOpenUrl(split[1])
       console.log(split)
    },[])
    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>

                    <View style={{ marginLeft: Screen.width*0.06, marginTop: 10, width:Screen.width*0.8,  }}>
                        <Text style={{ color: '#662D91', fontSize: 15, marginRight: 10 }}>Password berhasil diubah. Pesan konfirmasi telah dikirim ke email-mu</Text>
                    </View>

                    <View style={{ marginTop: Screen.width * 0.05}} />
                    <RoundedButton
                        text={'Cek Email'}
                        onPress={async() =>{
                            const supported = await Linking.canOpenURL('https://'+openUrl);

                            if (supported) {
                              // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                              // by some browser in the mobile
                              await Linking.openURL('https://'+openUrl);
                              navigation.popToTop()
                            } else {
                              Alert.alert(`Don't know how to open this URL: ${openUrl}`);
                            }
                        }}
                        backgroundColor={'#266CF5'} />
                </View>
            </View>
        </TemplateBackground>
    )
}