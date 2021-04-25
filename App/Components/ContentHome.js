import React from 'react';
import { Image, View } from "react-native";
import { Metrics } from '../Themes';
import images from '../Themes/Images';
import { Screen } from '../Transforms/Screen';

export const ContentHome = ({}) => (
    <View style={{height:Screen.height, margin:-Metrics.section*0.5}}>
        <View style={{width:Screen.width, height:Screen.height*0.2, flexDirection:'row', justifyContent:'space-around'}}>
            <Image source={images.berhitung} style={{height:Screen.height*0.3, width:Screen.width*0.5}} resizeMode='contain'/>
            <Image source={images.jalanyuk} style={{height:Screen.height*0.3, width:Screen.width*0.5}} resizeMode='contain'/>
        </View>
        <View style={{width:Screen.width, height:Screen.height*0.2, flexDirection:'row', justifyContent:'space-around', marginVertical:-Screen.height*0.03}}>
            <Image source={images.fotofavorit} style={{height:Screen.height*0.3, width:Screen.width*0.5}} resizeMode='contain'/>
            <Image source={images.kalimatbijak} style={{height:Screen.height*0.3, width:Screen.width*0.5}} resizeMode='contain'/>
        </View>
        <View style={{width:Screen.width, height:Screen.height*0.2, flexDirection:'row', justifyContent:'space-around', marginTop:Screen.height*0.05}}>
            <Image source={images.curhat} style={{height:Screen.height*0.3, width:Screen.width*0.325}} resizeMode='contain'/>
            <Image source={images.koneseling} style={{height:Screen.height*0.3, width:Screen.width*0.325}} resizeMode='contain'/>
            <Image source={images.mediasi} style={{height:Screen.height*0.3, width:Screen.width*0.325}} resizeMode='contain'/>
        </View>
    </View>
)