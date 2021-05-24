
import React, { useState } from "react";
import { FlatList, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Divider, Image, Overlay, Text } from "react-native-elements";
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
import images from '../Themes/Images';
import { RadioButton } from 'react-native-paper'
export const OverlayBerhitung = ({ visible, toggleOverlay }) => {
    const [music, setMusic] = useState('2')
    const [pemandu, setPemandu] = useState('')
    return (
        <Overlay
            isVisible={visible}
            // onBackdropPress={toggleOverlay}
            overlayStyle={{ width: Screen.width * 0.9, borderRadius: 20, minHeight: Screen.height * 0.4, padding: Screen.width * 0.05 }}
        >
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.25, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Musik</Text>
                    </View>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <Text style={{ color: '#67308F', marginLeft: 10, fontWeight: 'bold' }}>OK</Text>
                    </TouchableOpacity>
                </View>

                <RadioButton.Group onValueChange={newValue => setMusic(newValue)} value={music}>
                <View style={{ flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ color: '#67308F', fontSize: 13, marginStart: 10 }}>Off</Text>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="1" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10 }}>Body Relaxion</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="2" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10 }}>Piano Moods</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="3" />
                </View>
                </RadioButton.Group>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10 }}>The Colors of the Winds</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                    <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.18, alignItems: 'center', borderRadius: 100, padding: 2, flexDirection: 'row', justifyContent: 'center' }}>
                        <Image source={images.key} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        <Text style={{ color: 'white', fontWeight: '500', marginLeft: 5, fontSize: 13 }}>Beli</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10 }}>Discover your spirit</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                    <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.18, alignItems: 'center', borderRadius: 100, padding: 2, flexDirection: 'row', justifyContent: 'center' }}>
                        <Image source={images.key} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        <Text style={{ color: 'white', fontWeight: '500', marginLeft: 5, fontSize: 13 }}>Beli</Text>
                    </View>
                </View>

                <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#D9078D', borderStyle: 'dashed', zIndex: 0, marginVertical: 24 }}>
                    <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom: 20  }}>
                    <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.25, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Pemandu</Text>
                    </View>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <Text style={{ color: '#67308F', marginLeft: 10, fontStyle: 'italic' }}>(coming soon)</Text>
                    </TouchableOpacity>
                </View>
                <RadioButton.Group onValueChange={newValue => setPemandu(newValue)} value={pemandu}>
                <View style={{ flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ color: '#67308F', fontSize: 13, marginStart: 10 }}>Off</Text>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="1" disabled={true}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10 }}>Eva Green</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="2" disabled={true}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10 }}>Matthew McConaughey</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="3" disabled={true}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10 }}>Lucy Liu</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="4" disabled={true}/>
                </View>
                </RadioButton.Group>
            </ScrollView>
        </Overlay>
    )
}

const style = StyleSheet.create({
    borderShadow: {
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 12, elevation: 4
    },
    icon: { width: 35, height: 40, margin: Screen.width * 0.05 }
})