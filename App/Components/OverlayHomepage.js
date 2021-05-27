
import React, { useState } from "react";
import { FlatList, TextInput, View, ScrollView, TouchableOpacity, StyleSheet,KeyboardAvoidingView  } from "react-native";
import { Divider, Image, Overlay, Text } from "react-native-elements";
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
export const OverlayHomepage =({visible,toggleOverlay,setquote,listEmoticon, picked, RemovePickedEmotion,setpicked,quote})=>{
    const ValidateTextForEmoticon =(text) =>{
        setquote(text)
        const filtertext = text.split(' ')
        const filter =listEmoticon.filter(dat => filtertext.find(text =>{
            console.log(dat.name.toLowerCase() + ' = ' + text.toLowerCase())
            return dat.name.toLowerCase() === text.toLowerCase()
        }))
        if(filter.length>0){
            filter.map(data =>setpicked([...picked,data]))
        }else{
            setpicked([])
        }
        
        console.log('validasi', filter)
    }
    return (
        <Overlay 
            isVisible={visible} 
            onBackdropPress={()=>toggleOverlay()}
            overlayStyle={{width: Screen.width*0.95, borderRadius:20, minHeight: Screen.height*0.4}}
            >
                <KeyboardAvoidingView behavior = 'height' >
            <Text style={{color:'#67308F', fontWeight:'700'}}>Pilih Emosimu :</Text>
            <View style={{height:Screen.height*0.4}}>
                <ScrollView>
                   <FlatList 
                    style={{ width: '100%', margin:10, backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center'}}
                    // bounces={false}
                    numColumns={4}
                    data={listEmoticon}
                    renderItem={({item}) => {
                        const check = picked.filter(data => data === item)
                        return(
                        <TouchableOpacity onPress={()=>{
                            console.log(item.name)
                            // console.log('hasil checkcok',check)
                            if(picked.length>0){
                                if(check && check.length>0) {
                                    RemovePickedEmotion(check)
                                }else{
                                    setpicked([...picked,item])
                                }
                            }else{
                                setpicked([...picked,item]) 
                            }
                            // setPickedEmoticon(picked)
                        }}>
                            <View style={[{justifyContent:'center',alignItems:'center',margin:8,marginRight:12,height:80,width:60},check.length>0?style.borderShadow:{}]}>
                                <View style={check.length>0?{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}:{}}>
                                    <Image source={{uri:item.image && item.image.url?item.image.url:null}} style={[style.icon]} resizeMode='contain'/>
                                    <Text style={{textAlign:'center',marginTop:-16}} numberOfLines={1}>{item.name}</Text>
                                </View>
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
                    value={quote}
                    placeholder="Bagaimana Perasaanmu Hari ini"   
                    style={{borderWidth:1, height:Screen.height*0.15, width:'100%', marginBottom:24, borderRadius:20, textAlign:'center', backgroundColor:'white',borderColor:'#67308F', marginTop:12}}
                    onChangeText={text => ValidateTextForEmoticon(text)}
                 />
                 <TouchableOpacity onPress={toggleOverlay}>
                    <View style={{flexDirection:'row', justifyContent:'flex-end',alignItems:'center'}}>
                        <Text style={{color:'#67308F', fontWeight:'500', fontSize:14, marginRight:12}}>Selesai</Text>
                        <Image source={Images.iconNext} style={{width:20, height:20}} resizeMode='contain' />
                    </View>
                 </TouchableOpacity>
            </View></KeyboardAvoidingView>
        </Overlay>
    )
}

export const style =StyleSheet.create({
    borderShadow:{
        shadowColor: "#000", shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.25, shadowRadius: 2
    },
    icon: {width:35, height:40, margin:Screen.width*0.05},

    iconDashboard: {width:15, height:15, margin:Screen.width*0.05}
})