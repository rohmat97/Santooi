
import React, { useState } from "react";
import { FlatList, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Divider, Image, Overlay, Text } from "react-native-elements";
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
import images from '../Themes/Images';
import { RadioButton } from 'react-native-paper'
import { Fonts } from '../Themes/'

export const OverlayPhone = ({ visible, toggleOverlay }) => {
    return (
        <Overlay
            isVisible={visible}
            // onBackdropPress={toggleOverlay}
            overlayStyle={{ width: Screen.width * 0.9, borderRadius: 20, minHeight: Screen.height * 0.22, padding: Screen.width * 0.05 }}
        >
            <TouchableOpacity onPress={toggleOverlay} style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Image source={images.close} style={{ width: 15, height: 15 }} resizeMode='contain' />
            </TouchableOpacity>

            <Text style={{ color: '#67308F', fontWeight: 'bold', marginLeft: 10, fontSize: 15, textAlign: 'center' }}>Find User</Text>

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                <Text style={{ color: '#67308F', fontWeight: '500', marginLeft: 10, fontSize: 14 }}>Country Code</Text>
                <Text style={{ fontWeight: '500', marginLeft: 10, fontSize: 14 }}>+62(ID)</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems:'center' }}>
                <Text style={{ color: '#67308F', fontWeight: '500', marginLeft: 10, fontSize: 14 }}>Phone Number</Text>
                <TextInput
                placeholder={'Enter Number'}
                ></TextInput>
            </View>

            <Text style={{ color:'#333333',fontWeight: '500', fontSize: 13, textAlign:'right', opacity:0.5}}>Example:812-345-678</Text>

            <TouchableOpacity onPress={toggleOverlay} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginEnd: 10, marginTop: 50 }}>
                <Text style={{ color: '#67308F', marginEnd: 15, fontSize: Fonts.size.regular }}>Search</Text>
                <Image source={images.arrowRightPurple} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>

        </Overlay>
    )
}

const style = StyleSheet.create({
    borderShadow: {
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 12, elevation: 4
    },
    icon: { width: 35, height: 40, margin: Screen.width * 0.05 }
})