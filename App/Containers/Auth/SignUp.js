import React, { useEffect, useState } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Overlay } from 'react-native-elements';
import { RadioButton } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';

//component
import { TemplateBackground } from '../../Components/TemplateBackground'
import ErrorButton from '../../Components/ErrorButton'
// Redux
import RegisterRedux from '../../Redux/RegisterRedux';
// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors, Fonts } from '../../Themes'

function SignUp(props) {
    const { navigation, RegisterRequest, regist, registerror } = props
    const { navigate, getParam } = navigation
    const [name, setName] = useState('')
    const [state, setState] = useState(0)
    const [show, setShow] = useState(false)
    const [greeting, setGreeting] = useState('2')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setvisible] = useState(false)
    const d = new Date()
    const formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
    const [date, setDate] = useState(d)
    const [dateBirth, setDateBirth] = useState('Pilih tanggal kelahiran...')
    const [showCalendar, setShowCalendar] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [validatePhoneNumber, setValidatePhoneNumber] = useState(false)

    const onNameChange = (name) => {
        setName(name)

        if (name.length > 0) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    const onPhoneChange = (number) => {
        setPhoneNumber(number)
        if (number.length >= 10) {
            if (number.length > 13) {
                setValidatePhoneNumber(false)
                setShow(false)
            } else {
                setValidatePhoneNumber(true)
                setShow(true)
            }
        } else {
            setValidatePhoneNumber(false)
            setShow(false)
        }
    }

    const onGreetingChange = (value) => {
        setGreeting(value)
        setShow(true)
    }

    const onDateChange = (event, selectedDate) => {
        if (selectedDate != null) {
            if (showCalendar) {
                setShowCalendar(false)
            }

            const date = selectedDate || dateBirth
            setDate(date)

            const formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            setDateBirth(formattedDate)

            if (dateBirth != null) {
                setShow(true)
            }
        } else {
            if (showCalendar) {
                setShowCalendar(false)
            }
        }
    }

    const onClick = () => {
        if (state == 3) {
            setvisible(true)
            Signup()
        } else {
            setState(state + 1)

            if (state == 0) {
                setShow(true)
            } else {
                if (state == 1 && dateBirth !== 'Pilih tanggal kelahiran...') {
                    setShow(true)
                } else if (state == 2 && phoneNumber.length > 9) {
                    if (phoneNumber.length > 13) {
                        setShow(false)
                    } else {
                        setShow(true)
                    }
                } else {
                    setShow(false)
                }
            }
        }
    }

    const onBackClick = () => {
        state == 0 ? navigation.pop() : setState(state - 1)
        setShow(true)
    }

    const Signup = () => {
        const params = {
            'name': name,
            'email': email,
            'password': password,
            'call': greeting,
            'birt_date': dateBirth,
            'phone_number': phoneNumber
        }
        // console.log(params)
        setTimeout(() => {
            RegisterRequest(params)
        }, 1000);
    }
    useEffect(() => {
        const params = getParam('params')
        setEmail(params.email)
        setPassword(params.password)
    }, [])

    useEffect(() => {
        if (regist && regist.status) {
            // console.log('register',JSON.stringify(regist))
            setvisible(false)
            navigation.navigate('Splash', {
                screen: 'SplashScreen',
                initial: true,
                params: {
                    type: 'transition',
                    root: 'Main',
                    screen: 'MainScreen'
                }
            })
        }
        if (registerror) {
            setvisible(false)
            alert(JSON.stringify(registerror))
        }
    }, [regist, registerror])
    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    {state == 0 &&
                        <View>
                            <Text style={{ color: '#35385D', fontWeight: 'bold', fontSize: 35, width: Screen.width * 0.7, marginBottom: 20 }}>Halo sahabat, Siapa namamu?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TextInput
                                    placeholder="Tulis namamu disini..."
                                    value={name}
                                    onChangeText={name => onNameChange(name)}
                                    inputRef={(ref) => (this.name = ref)}
                                    autoCapitalize='words'
                                    returnKeyType="next"
                                    placeholderTextColor={'white'}
                                    style={styles.textInputNoHeader}
                                    maxLength={24}
                                />
                            </View>
                        </View>
                    }
                    {state > 0 &&
                        <View>
                            <Text style={{ color: '#35385D', fontWeight: 'bold', fontSize: 35, width: Screen.width * 0.7, marginBottom: 20 }}>Selamat datang, {name}.</Text>
                            {state >= 1 &&
                                <View style={styles.containerTextbox}>
                                    {state == 1 &&
                                        <View>
                                            <Text style={{ color: 'white', fontSize: Fonts.size.regular, marginBottom: 10 }}>Bagaimana kamu ingin disapa?</Text>
                                            <RadioButton.Group onValueChange={newValue => onGreetingChange(newValue)} value={greeting}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 12 }}>
                                                    {
                                                        Platform.OS === 'ios' ?
                                                            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 40, backgroundColor: 'transparent' }}>
                                                                <RadioButton color='white' uncheckedColor='white' value="2" />
                                                            </View>
                                                            :
                                                            <RadioButton color='white' uncheckedColor='white' value="2" />
                                                    }

                                                    <Text style={{ color: 'white', fontSize: Fonts.size.medium, marginStart: 10 }}>Kamu</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {
                                                        Platform.OS === 'ios' ?
                                                            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 40, backgroundColor: 'transparent' }}>
                                                                <RadioButton color='white' uncheckedColor='white' value="1" />
                                                            </View>
                                                            :
                                                            <RadioButton color='white' uncheckedColor='white' value="1" />
                                                    }
                                                    <Text style={{ color: 'white', fontSize: Fonts.size.medium, marginStart: 10 }}>Anda</Text>
                                                </View>
                                            </RadioButton.Group>
                                        </View>
                                    }
                                    {state == 2 &&
                                        <View >
                                            <Text style={{ color: 'white', fontSize: Fonts.size.regular }}>Kapan ulang {greeting == '2' ? 'tahunmu?' : 'tahun anda?'}</Text>
                                            <TouchableOpacity onPress={() => !showCalendar ? setShowCalendar(true) : setShowCalendar(false)} style={styles.textBorder}>
                                                <Text style={{ color: 'white', flex: 1, padding: 10 }}>{dateBirth}</Text>
                                                <Image source={images.date} style={{ width: 20, height: 20, margin: 10 }}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    {state == 3 &&
                                        <View>
                                            <Text style={{ color: 'white', fontSize: Fonts.size.regular }}>Berapa nomor {greeting == '2' ? 'ponselmu?' : 'ponsel anda?'}</Text>
                                            <View style={styles.textBorder}>
                                                <Text style={{ color: 'white', paddingHorizontal: 10 }}>+62</Text>
                                                <View style={{ width: 1, height: Screen.height * 0.055, backgroundColor: 'white', marginEnd: 10 }}></View>
                                                <TextInput style={{ color: 'white', flex: 1 }}
                                                    value={phoneNumber}
                                                    onChangeText={number => onPhoneChange(number)}
                                                    keyboardType={'numeric'}
                                                    inputRef={(ref) => (this.number = ref)}></TextInput>
                                            </View>
                                            {!validatePhoneNumber &&
                                                <View style={{ marginTop: 10, marginHorizontal: -5 }}>
                                                    <ErrorButton text={'Nomor ponsel minimal 11 angka dan maksimal 15 angka'} />
                                                </View>
                                            }
                                        </View>}
                                </View>
                            }
                        </View>
                    }

                    {!validatePhoneNumber && <View style={{ marginTop: 20 }} />}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => onBackClick()} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginStart: 10 }}>
                            <Image source={images.arrowLeft} style={{ width: 20, height: 20 }} />
                            <Text style={{ color: 'white', marginStart: 15, fontSize: Fonts.size.regular }}>Kembali</Text>
                        </TouchableOpacity>

                        {state <= 3 ? show &&
                            <TouchableOpacity onPress={() => onClick()} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                                <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>Selanjutnya</Text>
                                <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => navigate('SplashScreen')} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                                <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>{Selanjutnya}</Text>
                                <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        }
                    </View>

                </View>
            </View>
            {
                Platform.OS === 'ios' ?
                    <Overlay visible={showCalendar} overlayStyle={{ width: Screen.width, height: Screen.height * 0.5 }} onBackdropPress={() => setShowCalendar(false)}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            maximumDate={new Date()}
                            mode={'date'}
                            is24Hour={true}
                            display='inline'
                            onChange={onDateChange}
                        />
                    </Overlay> :
                    showCalendar && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            maximumDate={new Date()}
                            mode={'date'}
                            is24Hour={true}
                            // display="calendar"
                            onChange={onDateChange}
                        />
                    )
            }

            <Overlay visible={visible} overlayStyle={{ width: Screen.width, height: Screen.height, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'#9A5EBA'} size='large' />
            </Overlay>

        </TemplateBackground >
    )
}


const mapStateToProps = (state) => {
    return {
        regist: state.regist.payload,
        registerror: state.regist.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(RegisterRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)