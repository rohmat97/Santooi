import React from 'react';
import { Image, View } from "react-native";
import { Metrics } from '../Themes';
import images from '../Themes/Images';
import { Screen } from '../Transforms/Screen';

export const ContentHome = ({}) => (
    <View style={{height:Screen.height*0.6, margin:-Metrics.section*0.5, paddingTop:52}}>
        <View style={{width:Screen.width, flexDirection:'row', justifyContent:'space-around'}}>
            <Image source={images.berhitung} style={{minHeight:100, width:Screen.width*0.5, aspectRatio:1.5}}/>
            <Image source={images.jalanyuk} style={{minHeight:100, width:Screen.width*0.5, aspectRatio:1.5, marginRight:6}}/>
        </View>
        <View style={{width:Screen.width, flexDirection:'row', justifyContent:'space-around'}}>
            <Image source={images.fotofavorit} style={{minHeight:100, width:Screen.width*0.5, aspectRatio:1.5}}/>
            <Image source={images.kalimatbijak} style={{minHeight:100, width:Screen.width*0.5, aspectRatio:1.5, marginRight:6}}/>
        </View>
        <View style={{width:Screen.width, minHeight:10, flexDirection:'row', justifyContent:'space-around', marginTop:12}}>
            <Image source={images.curhat} style={{height:Screen.width*0.3, width:Screen.width*0.3, aspectRatio:1}}/>
            <Image source={images.koneseling} style={{height:Screen.width*0.3, width:Screen.width*0.3, aspectRatio:1}}/>
            <Image source={images.mediasi} style={{height:Screen.width*0.3, width:Screen.width*0.3, aspectRatio:1}}/>
        </View>
    </View>
)