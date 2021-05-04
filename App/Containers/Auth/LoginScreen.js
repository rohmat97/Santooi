import React, { useState } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import { TemplateBackground } from '../../Components/TemplateBackground'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors } from '../../Themes';
import { PasswordEye } from '../../Components/PasswordEye'
import RoundedButton from '../../Components/RoundedButton'

export function LoginScreen(props) {
    const { navigation } = props
    const { navigate } = navigation
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState()
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState()
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [validateEmail, setValidateEmail] = useState(false)

    const onAccessoryPress = () => {
        setSecureTextEntry(!secureTextEntry)
    }

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
                                    marginBottom:12,
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
                    <View style={styles.textbox}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                        borderRadius: 4,
                                        height: 55,
                                        marginBottom:12,
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
                            <Image source={images.eye} style={{ margin: 10 }} resizeMode='center'></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: Screen.width * 0.1 }} />
                    <RoundedButton
                        text={'Lanjut'}
                        onPress={() => navigate('YourNameScreen')}
                        backgroundColor={'#266CF5'} />
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
                        onPress={() => navigate('LoginScreen')}
                        backgroundColor={'#5B87E4'}
                        image={images.google}
                        width={15}
                        height={15} />
                    <RoundedButton
                        text={'Masuk dengan Facebook'}
                        onPress={() => navigate('LoginScreen')}
                        backgroundColor={'#374F8B'}
                        image={images.fb}
                        width={10}
                        height={20} />
                    <RoundedButton
                        text={'Masuk dengan Apple'}
                        onPress={() => navigate('LoginScreen')}
                        backgroundColor={'#000000'}
                        image={images.apple}
                        width={15}
                        height={15} />
                </View>
            </View>
        </TemplateBackground>
    )
}