import React, { useState } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import { RadioButton } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import ErrorButton from '../../Components/ErrorButton'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors, Fonts } from '../../Themes'

export function SignUp(props) {
    const { navigation } = props
    const { navigate } = navigation
    const [name, setName] = useState('')
    const [state, setState] = useState(0)
    const [show, setShow] = useState(false)
    const [greeting, setGreeting] = useState('')

    const d = new Date()
    const formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
    const [date, setDate] = useState(d)
    const [dateBirth, setDateBirth] = useState('Pilih tanggal kelahiran...')
    const [showCalendar, setShowCalendar] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [validatePhoneNumber, setValidatePhoneNumber] = useState(false)

    const onNameChange = (name) => {
        setName(name)
        setShow(true)
    }

    const onPhoneChange = (number) => {
        setPhoneNumber(number)
        if (phoneNumber.length >= 10) {
            setValidatePhoneNumber(true)
            setShow(true)
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
            navigate('SplashScreen')
        } else {
            setState(state + 1)
            setShow(false)
        }
    }

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
                                    maxLength={8}
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
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <RadioButton color='white' uncheckedColor='white' value="kamu" />
                                                    <Text style={{ color: 'white', fontSize: Fonts.size.medium, marginStart: 10 }}>Kamu</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <RadioButton color='white' uncheckedColor='white' value="anda" />
                                                    <Text style={{ color: 'white', fontSize: Fonts.size.medium, marginStart: 10 }}>Anda</Text>
                                                </View>
                                            </RadioButton.Group>
                                        </View>
                                    }
                                    {state == 2 &&
                                        <View >
                                            <Text style={{ color: 'white', fontSize: Fonts.size.regular }}>Kapan ulang {greeting == 'kamu' ? 'tahunmu?' : 'tahun anda?'}</Text>
                                            <TouchableOpacity onPress={() => !showCalendar ? setShowCalendar(true) : setShowCalendar(false)} style={styles.textBorder}>
                                                <Text style={{ color: 'white', flex: 1, padding: 10 }}>{dateBirth}</Text>
                                                <Image source={images.date} style={{ width: 20, height: 20, margin: 10 }}></Image>
                                            </TouchableOpacity>

                                            {showCalendar && (
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={date}
                                                    maximumDate={new Date()}
                                                    mode={'date'}
                                                    is24Hour={true}
                                                    // display="calendar"
                                                    onChange={onDateChange}
                                                />
                                            )}

                                        </View>
                                    }
                                    {state == 3 &&
                                        <View>
                                            <Text style={{ color: 'white', fontSize: Fonts.size.regular }}>Berapa nomor {greeting == 'kamu' ? 'ponselmu?' : 'ponsel anda?'}</Text>
                                            <View style={styles.textBorder}>
                                                <Text style={{ color: 'white', paddingHorizontal: 10 }}>+62</Text>
                                                <View style={{ width: 1, height: Screen.height * 0.055, backgroundColor: 'white', marginEnd: 10 }}></View>
                                                <TextInput style={{ color: 'white', flex: 1 }}
                                                    value={phoneNumber}
                                                    onChangeText={number => onPhoneChange(number)}
                                                    inputRef={(ref) => (this.number = ref)}></TextInput>
                                            </View>
                                            {!validatePhoneNumber &&
                                                <View style={{ marginTop: Screen.height * 0.06, marginBottom: 20, marginHorizontal: -15 }}>
                                                    <ErrorButton text={'Nomor ponsel minimal 11 angka'} />
                                                </View>
                                            }
                                        </View>}
                                </View>
                            }
                        </View>
                    }

                    {!validatePhoneNumber && <View style={{ marginTop: 20 }} />}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => state == 0 ? navigation.pop() : setState(state)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginStart: 10 }}>
                            <Image source={images.arrowLeft} style={{ width: 20, height: 20 }} />
                            <Text style={{ color: 'white', marginStart: 15, fontSize: Fonts.size.regular }}>Kembali</Text>
                        </TouchableOpacity>

                        {state <= 3 ? show &&
                            <TouchableOpacity onPress={() => onClick()} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                                <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>{state != 0 ? 'Selanjutnya' : 'Masuk'}</Text>
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
        </TemplateBackground >
    )
}