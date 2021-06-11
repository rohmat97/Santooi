
import React, { useState } from "react";
import { FlatList, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox, Divider, Image, Overlay, Text } from "react-native-elements";
import { Colors, Images, Metrics } from "../Themes";
import { Screen } from "../Transforms/Screen";
import images from '../Themes/Images';
import { RadioButton } from 'react-native-paper'
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
export const OverlayBerhitung = ({ visible, toggleOverlay, music, setMusic, pemandu, setPemandu, listMusic , playSound, MusicRequest, token, playlistMusic}) => {

    const [onfetch, setonfetch] = useState(false);
    let page =1
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      }
    const fetchMusic =(page) =>{
        MusicRequest({"token":token,'page':page})
    }
    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={()=>toggleOverlay()}
            overlayStyle={{ width: Screen.width * 0.9, borderRadius: 20, minHeight: Screen.height * 0.4, padding: Screen.width * 0.05,height:Screen.height*0.85, }}
        >
            {/* <ScrollView style={{ height:Screen.height*0.8}}> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.25, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Musik</Text>
                    </View>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <Text style={{ color: '#67308F', marginLeft: 10, fontWeight: 'bold' }}>OK</Text>
                    </TouchableOpacity>
                </View>


                <ScrollView
                    onMomentumScrollEnd={(event)=>{
                        if (isCloseToBottom(event.nativeEvent)) {
                            if(listMusic.current_page !== listMusic.last_page){
                                page += 1
                                console.log(`page`,listMusic.current_page + ' === '+listMusic.last_page)
                                fetchMusic(listMusic.current_page+1)
                            }else{
                                console.log(`page`,listMusic.current_page + ' === '+listMusic.last_page)
                            }
                            // }
                            
                        }
                        
                    
                    }}
                >
                <View style={{ flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ color: '#67308F', fontSize: 13, marginStart: 10 }}>Off</Text>
                    <CheckBox
                        checkedIcon={<Image source={images.Checked} style={{width:20,height:20}} resizeMode='contain'/>}
                        uncheckedIcon={<Image source={images.unChecked} style={{width:20,height:20}} resizeMode='contain'/>}
                        checked={music?false:true}
                        onPress={() => setMusic(null)}
                    />
                </View>
                    {
                        playlistMusic && listMusic && playlistMusic.map(
                            data =>{
                                // console.log(data)
                                if(data){
                                    return(
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                                <Text style={{ color: '#67308F', marginLeft: 10,marginTop:4,maxWidth:'80%' }}>{data.name}</Text>
                                                <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10}} resizeMode='contain' onPress={()=> playSound(data.file.url, true)}/>
                                            </View>
                                            {
                                                data.col_is_paid?
                                                <CheckBox
                                                    checkedIcon={<Image source={images.Checked} style={{width:20,height:20}} resizeMode='contain'/>}
                                                    uncheckedIcon={<Image source={images.unChecked} style={{width:20,height:20}} resizeMode='contain'/>}
                                                    checked={music && music.id===data.id?true:false}
                                                    onPress={() => setMusic(data)}
                                                />:
                                                <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.18, alignItems: 'center', borderRadius: 100, padding: 2, flexDirection: 'row', justifyContent: 'center' }}>
                                                    <Image source={images.key} style={{ width: 20, height: 20,marginTop:-4 }} resizeMode='contain' />
                                                    <Text style={{ color: 'white', fontWeight: '500', marginLeft: 5, fontSize: 13 }}>Beli</Text>
                                                </View>
                                            }
                                        
                                        </View>
                                )
                                }
                                
                            }
                        )
                    }
                    
                </ScrollView>
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
                    <Text style={{ color: '#67308F', fontSize: 13, marginStart: 10, opacity:0.5 }}>Off</Text>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="1" disabled={true}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10, opacity:0.5 }}>Eva Green</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10, opacity:0.5,marginTop:-4 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="2" disabled={true}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10, opacity:0.5 }}>Matthew McConaughey</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10, opacity:0.5,marginTop:-4 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="3" disabled={true}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{ color: '#67308F', marginLeft: 10, opacity:0.5 }}>Lucy Liu</Text>
                        <Image source={images.play} style={{ width: 35, height: 35, marginLeft: 10, opacity:0.5,marginTop:-4 }} resizeMode='contain' />
                    </View>
                    <RadioButton color='#67308F' uncheckedColor='#67308F' value="4" disabled={true}/>
                </View>
                </RadioButton.Group>
            {/* </ScrollView> */}
        </Overlay>
    )
}

const style = StyleSheet.create({
    borderShadow: {
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 12, elevation: 4
    },
    icon: { width: 35, height: 40, margin: Screen.width * 0.05 }
})