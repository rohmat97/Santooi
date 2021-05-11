
import React, { useState } from "react";
import { FlatList, TextInput, View, ScrollView, TouchableOpacity, StyleSheet  } from "react-native";
import { Divider, Image, Overlay, Text } from "react-native-elements";
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
export const OverlayHomepage =({visible,toggleOverlay,setquote,categoryData, PickedEmoticon, setPickedEmoticon})=>{
    let picked = []
    return (
        <Overlay 
            isVisible={visible} 
            // onBackdropPress={toggleOverlay}
            overlayStyle={{width: Screen.width*0.9, borderRadius:20, minHeight: Screen.height*0.4,padding:Screen.width*0.05}}
            >
            <Text style={{color:'#67308F', fontWeight:'700'}}>Pilih Emosimu :</Text>
            <View style={{height:Screen.height*0.4}}>
                <ScrollView>
                   <FlatList 
                    style={{ width: '100%', margin:10, backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center'}}
                    // bounces={false}
                    numColumns={3}
                    data={categoryData}
                    renderItem={({item}) => {
                        return(
                        <TouchableOpacity onPress={()=>{
                            const check = picked.find(data => data.category === item.category)
                            if(picked.length>0){
                                if(check && check.length>0) {
                                    
                                }else{
                                    picked.push(item)
                                }
                            }else{
                                picked.push(item)
                            }
                            setPickedEmoticon(picked)
                        }}>
                            <View style={[{justifyContent:'center',alignItems:'center',padding:4},style.borderShadow]}>
                                <Image source={{uri:item.gambar}} style={[style.icon]} resizeMode='contain'/>
                                <Text>{item.category}</Text>
                            </View>
                        </TouchableOpacity>
                        )
                   
                    }
                    }
                    />
                </ScrollView>
            </View>
            <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#D9078D', borderStyle: 'dashed', zIndex: 0,marginVertical:24 }}>
                <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
            </View>
            <Text style={{color:'#67308F', fontWeight:'700', fontSize:14}}>Apa yang ada dalam pikiranmu?</Text>
            <View style={{flexDirection:'column',justifyContent:'flex-start'}}>
                <TextInput 
                    placeholder="Bagaimana Perasaanmu Hari ini"   
                    style={{borderWidth:1, height:Screen.height*0.15, width:Screen.width*0.8, marginBottom:24, borderRadius:20, textAlign:'center', backgroundColor:'white',borderColor:'#67308F', marginTop:12}}
                    onChangeText={text => setquote(text)}
                 />
                 <TouchableOpacity onPress={toggleOverlay}>
                    <View style={{flexDirection:'row', justifyContent:'flex-end',alignItems:'center'}}>
                        <Text style={{color:'#67308F', fontWeight:'500', fontSize:14, marginRight:12}}>Selesai</Text>
                        <Image source={Images.iconNext} style={{width:20, height:20}} resizeMode='contain' />
                    </View>
                 </TouchableOpacity>
            </View>
        </Overlay>
    )
}

const style =StyleSheet.create({
    borderShadow:{
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 12,elevation:4
    },
    icon: {width:35, height:40, margin:Screen.width*0.05}
})