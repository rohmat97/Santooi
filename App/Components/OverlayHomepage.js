
import React, { useState } from "react";
import { Platform } from "react-native";
import { FlatList, View, ScrollView, TouchableOpacity, StyleSheet,KeyboardAvoidingView  } from "react-native";
import { Divider, Image, Overlay, Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { Colors, Images } from "../Themes";
import { Screen } from "../Transforms/Screen";
export const OverlayHomepage =({visible,toggleOverlay,listEmoticon, picked, RemovePickedEmotion,ValidateTextForEmoticon,quote,manualPicked, setmanualPicked})=>{
    // Object.size = function(obj) {
    //     var size = 0,
    //       key;
    //     for (key in obj) {
    //       if (obj.hasOwnProperty(key)) size++;
    //     }
    //     return size;
    //   };
    // let sizeOfWord = 0
    // const MapingValidationEmoticonByText = (filter) =>{
    //     // console.log('filter',filter)
    //     setpicked(filter)
    // }

    const [onKeyboardView, setonKeyboardView] = useState(0)
    return (
        <Overlay 
            isVisible={visible} 
            onBackdropPress={()=>toggleOverlay(true)}
            overlayStyle={{width: Screen.width*0.9,paddingVertical:24, borderRadius:20, minHeight: Screen.height*0.4}}
            >
     
            <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : null} keyboardVerticalOffset={Platform.OS === 'ios' ?  Screen.height*0.15 : 0}>
            <Text style={{color:'#67308F', fontWeight:'700'}}>Pilih Emosimu :</Text>
            <View style={{height:Screen.height*0.4}}>
                {/* <ScrollView> */}
                   <FlatList 
                    style={{ width: '100%', backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center',alignContent:'space-around'}}
                    // bounces={false}
                    numColumns={4}
                    data={listEmoticon}
                    renderItem={({item}) => {
                        // console.log('check',check)
                        const manual = manualPicked && manualPicked.length>0 && manualPicked.filter(data => {return data.id === item.id})
                        const auto = picked && picked.length>0 && picked.filter(data =>{return data.id === item.id})
                        const isExistOnAuto = auto && auto.find(data => data.id === item.id)
                        // console.log('isExistOnAuto',isExistOnAuto)
                        // console.log('auto',auto)
                        return(
                        <TouchableOpacity onPress={()=>{
                            // console.log(item.name)
                            // console.log('hasil checkcok',check)
                            if(manualPicked.length>0){
                                if(manual && manual.length>0) {
                                    RemovePickedEmotion(manual)
                                }else if(!isExistOnAuto){
                                    setmanualPicked([...manualPicked,item])
                                }
                            }else if(!isExistOnAuto){
                                setmanualPicked([...manualPicked,item])
                            }
                        }}>
                            <View style={[{justifyContent:'space-around',alignItems:'center',marginTop:Screen.width*0.005, marginRight:Screen.width*0.015,height:Screen.width*0.2,width:Screen.width*0.2},(manual && manual.length>0) || (auto && auto.length>0)?{ backgroundColor:'rgba(0, 0, 0, 0.1)'}:{}]}>
                                <View style={(manual && manual.length>0) || (auto && auto.length>0)?{backgroundColor:'white',alignItems:'center',justifyContent:'space-around',height:Screen.width*0.19,width:Screen.width*0.19}:{}}>
                                    <Image source={{uri:item.image && item.image.url?item.image.url:null}} style={[style.icon]}/>
                                    <Text style={{textAlign:'center',marginTop:-16}} numberOfLines={1}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                   
                    }
                    }
                    />
                {/* </ScrollView> */}
            </View>
            <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#D9078D', borderStyle: 'dashed', zIndex: 0,marginVertical:24 }}>
                <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
            </View>
            <Text style={{color:'#67308F', fontWeight:'700', fontSize:14}}>Apa yang ada dalam pikiranmu?{'\n'}</Text>
            <View style={{flexDirection:'column',justifyContent:'flex-start'}}> 
                   
            <View style={{
                borderRadius: 4,
                height: 55,
                borderWidth:1, height:Screen.height*0.15, width:'100%', marginBottom:24, borderRadius:20, textAlign:'center', backgroundColor:'white',borderColor:'#67308F',
                overflow: 'hidden'}}>
                    {
                        Platform.OS==='ios'?
                        <TextInput 
                            value={quote}
                            placeholder="Bagaimana Perasaanmu Hari ini"   
                            style={{minHeight:Screen.height*0.15,backgroundColor:'transparent'}}
                            theme={{
                                colors: {
                                    placeholder: '#662D91',
                                    text: '#662D91',
                                    primary: '#662D91',
                                }
                            }}
                            onChangeText={text => ValidateTextForEmoticon(text)}
                            multiline={true}
                        />:
                        <TextInput 
                            value={quote}
                            // onTouchStart={()=>setonKeyboardView(Screen.height*0.4)}
                            // onEndEditing={()=>setonKeyboardView(0)}
                            // onSubmitEditing={()=>setonKeyboardView(0)}
                            // onTouchEnd={()=>setonKeyboardView(0)}
                            placeholder="Bagaimana Perasaanmu Hari ini"   
                            style={{minHeight:Screen.height*0.15,backgroundColor:'transparent',alignItems:quote && quote.length>0?'flex-start':'center',justifyContent:quote && quote.length>0?'flex-start':'center'}}
                            onChangeText={text => ValidateTextForEmoticon(text)}
                            multiline={true}
                            theme={{
                                colors: {
                                    placeholder: '#662D91',
                                    text: '#662D91',
                                    primary: '#662D91',
                                },
                            }}
                        />
                    }
                    
                {/* <TextInput 
                    value={quote}
                    onTouchStart={()=>setonKeyboardView(Screen.height*0.4)}
                    onEndEditing={()=>setonKeyboardView(0)}
                    // onSubmitEditing={()=>Platform.OS==='android'&&setonKeyboardView(0)}
                    // onTouchEnd={()=>Platform.OS==='android'&&setonKeyboardView(0)}
                    placeholder="Bagaimana Perasaanmu Hari ini"   
                    style={{minHeight:Screen.height*0.15,backgroundColor:'transparent'}}
                    onChangeText={text => ValidateTextForEmoticon(text)}
                    multiline={true}
                 /> */}
                </View>
                 <TouchableOpacity onPress={()=>toggleOverlay(true)}>
                    <View style={{flexDirection:'row', justifyContent:'flex-end',alignItems:'center'}}>
                        <Text style={{color:'#67308F', fontWeight:'500', fontSize:14,marginRight:2}}>Selesai{'\t'}</Text>
                        <Image source={Images.iconNext} style={{width:20, height:20}} resizeMode='contain' />
                    </View>
                 </TouchableOpacity>
            </View>
            <View  style={{height:onKeyboardView}}/>
            </KeyboardAvoidingView>
            </ScrollView>
        </Overlay>
    )
}

export const style =StyleSheet.create({
    borderShadow:{
        shadowColor: "#000", shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.25, shadowRadius: 4,elevation: 12,
    },
    icon: {width:Screen.width*0.1, height:Screen.width*0.1, margin:Screen.width*0.04},
    iconic: {width:25, height:25, margin:Screen.width*0.0075},
    iconDashboard: {width:15, height:15, margin:Screen.width*0.05}
})