
import React, { useState } from "react";
import { FlatList, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Divider, Image, Overlay, Text } from "react-native-elements";
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
import images from '../Themes/Images';
import { RadioButton } from 'react-native-paper'
import { Linking } from "react-native";
export const OverlayJalanYuk = ({ visible, toggleOverlay,selected, openMaps, token, UpdateHistoryRequest,HistoryPlaceRequest}) => {
    // console.log(selected)
    return (
        <Overlay
            isVisible={visible}
            // onBackdropPress={toggleOverlay}
            overlayStyle={{ width: Screen.width * 0.9, borderRadius: 20, minHeight: selected &&selected.is_featured===1? Screen.height * 0.20:Screen.height * 0.15, padding: Screen.width * 0.05 }}
        >
            <TouchableOpacity onPress={toggleOverlay} style={{justifyContent:'flex-end', flexDirection:'row',paddingHorizontal:12,height:20}}>
                <Image source={images.close} style={{ width: 15, height: 15}} resizeMode='cover'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={async()=> {
                    openMaps(selected.lat,selected.lng)
                    const payload ={
                        'token':token && token.data.access_token,
                        'body':{
                            "id_place":selected.id
                        },
                      }
   
                    const payloadHistory ={
                        'token':token && token.data.access_token,
                        'page':1,
                    }
                    await UpdateHistoryRequest(payload)
                    Linking.openURL(selected.url)
                    setTimeout(() => { 
                        HistoryPlaceRequest(payloadHistory)
                    }, 5000);
                }} style={{marginVertical:12}}>
                <View style={{ flexDirection: 'row',alignItems:'center',width:'60%' }}>
                    <Image source={images.location} style={{ width: 30, height: 30 }} resizeMode='contain' />
                    <Text style={{ color: '#67308F', fontWeight: '500', marginLeft: 10, fontSize: 16 }}>Petunjuk Jalan</Text>
                </View>
            </TouchableOpacity>
            {
                selected && selected.is_featured===1 &&
                    <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#D9078D', borderStyle: 'dashed', zIndex: 0, marginVertical: 12 }}>
                        <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                    </View>
            }
            
        {
                selected && selected.is_featured===1 &&
                
                <TouchableOpacity onPress={async()=>{
                    const payload ={
                        'token':token && token.data.access_token,
                        'body':{
                            "id_place":selected.id
                        },
                      }
   
                    const payloadHistory ={
                        'token':token && token.data.access_token,
                        'page':1,
                    }
                    await UpdateHistoryRequest(payload)
                    Linking.openURL(selected.url)
                    setTimeout(() => { 
                        HistoryPlaceRequest(payloadHistory)
                    }, 5000);
                    }}
                    style={{paddingVertical:16}}
                    >
                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                        <Image source={images.addChartOutline} style={{  width: 30, height: 30 }} resizeMode='contain' />
                        <Text style={{ color: '#67308F', fontWeight: '500', marginLeft: 10, fontSize: 16 }}>{selected.wording}</Text>
                    </View>
                </TouchableOpacity>
        }
        </Overlay>
    )
}

const style = StyleSheet.create({
    borderShadow: {
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 12, elevation: 4
    },
    icon: { width: 35, height: 40, margin: Screen.width * 0.05 }
})