
import React, { useState } from "react";
import { FlatList, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';
import { Divider, Image, Overlay, Text } from "react-native-elements";
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
import images from '../Themes/Images';
import { RadioButton } from 'react-native-paper'
import { Fonts } from '../Themes/'
export const OverlayDaftarPsikolog = ({ visible, toggleOverlay }) => {
    return (
        <Overlay
            isVisible={visible}
            // onBackdropPress={toggleOverlay}
            overlayStyle={{ width: Screen.width * 0.9, borderRadius: 20, minHeight: Screen.height * 0.65, padding: Screen.width * 0.05 }}
        >
            <Text style={{ color: '#67308F', fontWeight: '500', marginBottom: 20 }}>Profil Psikolog</Text>
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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#67308F',
        borderWidth: 1,
        marginBottom:12,
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
    }
})