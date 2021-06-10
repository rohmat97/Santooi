
import React, { useState } from "react";
import { FlatList, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';
import { Divider, Image, Overlay, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
import images from '../Themes/Images';
import { RadioButton } from 'react-native-paper'
import { Fonts } from '../Themes/'
import { Platform } from "react-native";
export const OverlayDaftarPsikolog = ({ visible, toggleOverlay }) => {

    const [date, setDate] = useState(new Date())
    const [showCalendar, setShowCalendar] = useState(false)
    const [show, setShow] = useState(false)
    const [dateBirth, setDateBirth] = useState('Pilih tanggal kelahiran...')
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
    return (
        <Overlay
            isVisible={visible}
            // onBackdropPress={toggleOverlay}
            overlayStyle={{ width: Screen.width * 0.9, borderRadius: 20, minHeight: Screen.height * 0.65, padding: Screen.width * 0.05 }}
        >
            <Text style={{ color: '#67308F', fontWeight: '500', marginBottom: 20 }}>Profil Psikolog</Text>
            {
                Platform.OS==='ios'?
                <View style={{ 
                    borderRadius: 12,
                    height: 60,
                    marginBottom: 12,
                    overflow: 'hidden' ,
                    borderColor: '#67308F',
                    borderWidth: 1,
                    }}>
                <TextInput
                    // inputRef={(ref) => (this.password = ref)}
                    label="Nama"
                    // value={password}
                    // error={errorPassword}
                    // onChangeText={password => setPassword(password)}
                    style={style.textInputIos}
                    theme={{
                        colors: {
                            placeholder: '#67308F',
                            text: '#67308F',
                            primary: '#67308F',
                        }
                    }}
                    // selectionColor={'#939598'}
                /></View>:
                <View style={{ flex: 1 }}>
                <View style={{ 
                    borderRadius: 12,
                    height: 60,
                    marginBottom: 12,
                    overflow: 'hidden' ,
                    borderColor: '#67308F',
                    borderWidth: 1,
                    }}>
                    <TextInput
                        // inputRef={(ref) => (this.password = ref)}
                        label="Nama"
                        // value={password}
                        // error={errorPassword}
                        // onChangeText={password => setPassword(password)}
                        style={style.textInput}
                        theme={{
                            colors: {
                                placeholder: '#67308F',
                                text: '#67308F',
                                primary: '#67308F',
                            }
                        }}
                        // selectionColor={'#939598'}
                    />
                </View>
            </View>
            } 
            <View style={{ 
                        borderRadius: 12,
                        height: 60,
                        marginBottom: 12,
                        overflow: 'hidden' ,
                        borderColor: '#67308F',
                        borderWidth: 1,
                        }}>
                {/* <Text style={[style.textInput],{color:'#67308F'}}>Tanggal Lahir</Text> */}
                <TouchableOpacity onPress={() => !showCalendar ? setShowCalendar(true) : setShowCalendar(false)} style={style.textBorder}>
                    <Text style={{ color: '#67308F', flex: 1, padding: 10 }}>{dateBirth?dateBirth:'Tanggal Lahir'}</Text>
                    <Image source={images.date} style={{ width: 20, height: 20, margin: 10 }}></Image>
                </TouchableOpacity>
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
            {/* {
                Platform.OS==='ios'?
                <View style={{ 
                    borderRadius: 12,
                    height: 60,
                    marginBottom: 12,
                    overflow: 'hidden' ,
                    borderColor: '#67308F',
                    borderWidth: 1,
                    }}>
                <TextInput
                // inputRef={(ref) => (this.password = ref)}
                label="Tanggal Lahir"
                // value={password}
                // error={errorPassword}
                // onChangeText={password => setPassword(password)}
                style={style.textInputIos}
                theme={{
                    colors: {
                        placeholder: '#67308F',
                        text: '#67308F',
                        primary: '#67308F',
                    }
                }}
                selectionColor={'#939598'}
            /></View>:
                <View style={{ flex: 1 }}>
                    <View style={{ 
                        borderRadius: 12,
                        height: 60,
                        marginBottom: 12,
                        overflow: 'hidden' ,
                        borderColor: '#67308F',
                        borderWidth: 1,
                        }}>
                        <TextInput
                        // inputRef={(ref) => (this.password = ref)}
                        label="Tanggal Lahir"
                        // value={password}
                        // error={errorPassword}
                        // onChangeText={password => setPassword(password)}
                        style={style.textInput}
                        theme={{
                            colors: {
                                placeholder: '#67308F',
                                text: '#67308F',
                                primary: '#67308F',
                            }
                        }}
                        selectionColor={'#939598'}
                    />
                    </View>
                </View>

            } */}
            {
                Platform.OS==='ios'?
                <View style={{ 
                    borderRadius: 12,
                    height: 60,
                    marginBottom: 12,
                    overflow: 'hidden' ,
                    borderColor: '#67308F',
                    borderWidth: 1,
                    }}>
                <TextInput
                // inputRef={(ref) => (this.password = ref)}
                label="Pengalaman Kerja"
                // value={password}
                // error={errorPassword}
                // onChangeText={password => setPassword(password)}
                style={style.textInputIos}
                theme={{
                    colors: {
                        placeholder: '#67308F',
                        text: '#67308F',
                        primary: '#67308F',
                    }
                }}
                selectionColor={'#939598'}
            /></View>:
                <View style={{ flex: 1 }}>
                <View style={{ 
                    borderRadius: 12,
                    height: 60,
                    marginBottom: 12,
                    overflow: 'hidden' ,
                    borderColor: '#67308F',
                    borderWidth: 1,
                    }}>
                    <TextInput
                    // inputRef={(ref) => (this.password = ref)}
                    label="Pengalaman Kerja"
                    // value={password}
                    // error={errorPassword}
                    // onChangeText={password => setPassword(password)}
                    style={style.textInput}
                    theme={{
                        colors: {
                            placeholder: '#67308F',
                            text: '#67308F',
                            primary: '#67308F',
                        }
                    }}
                    selectionColor={'#939598'}
                />
                </View>
            </View>

            }
            
            <Text style={{ color: '#67308F', marginBottom: 20 }}>Upload dokumen</Text>

            <View style={style.textInputDashed}>
                <Image source={images.foto} style={{ width: 25, height: 25 }} resizeMode='contain'></Image>
                <Text style={{ color: '#67308F', marginEnd: 15, fontSize: 16, marginLeft:10 }}>KTP</Text>
            </View>

            <View style={style.textInputDashed}>
                <Image source={images.foto} style={{ width: 25, height: 25 }} resizeMode='contain'></Image>
                <Text style={{ color: '#67308F', marginEnd: 15, fontSize: 16, marginLeft:10 }}>Sertifikat</Text>
            </View>

            <TouchableOpacity onPress={toggleOverlay} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10, marginTop: 20 }}>
                <Text style={{ color: '#67308F', marginEnd: 15, fontSize: Fonts.size.regular }}>Selesai</Text>
                <Image source={images.arrowRightPurple} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>

        </Overlay>
    )
}

const style = StyleSheet.create({
    borderShadow: {
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 12, elevation: 4
    },
    icon: { width: 35, height: 40, margin: Screen.width * 0.05 },
    textInput: {
        // overflow: 'hidden',
        backgroundColor: 'transparent',
        // marginBottom:12,
        // paddingVertical:12,
        minHeight:50
    },
    textInputIos: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        // borderColor: '#67308F',
        // borderWidth: 1,
        // marginBottom:24,
        // paddingVertical:12,
        minHeight:50
    },
    textInputDashed: {
        // overflow: 'hidden',
        backgroundColor: 'transparent',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#67308F',
        borderWidth: 1,
        borderStyle: 'dashed',
        flexDirection: 'row',
        alignItems: 'center',
        padding:15, 
        marginBottom:20
    },
    textBorder: {
        borderColor: 'white',
        alignItems: 'center',
        // padding:10,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        marginTop: 10
      }
})