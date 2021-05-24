import React from 'react';
import { Image, TouchableOpacity, View } from "react-native";
import { Metrics } from '../Themes';
import images from '../Themes/Images';
import { Screen } from '../Transforms/Screen';

export function ContentHome({navigate}) {
    return (
        <View style={{ height: Screen.height * 0.6, margin: -Metrics.section * 0.5, paddingTop: 52 }}>
            <View style={{ width: Screen.width, flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => navigate('BerhitungYuk')}>
                    <Image source={images.berhitung} style={{ height: Screen.height * 0.18, width: Screen.width * 0.5, aspectRatio: 1.5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('JalanYuk')}>
                    <Image source={images.jalanyuk} style={{ height: Screen.height * 0.18, width: Screen.width * 0.5, aspectRatio: 1.5, marginRight: 12 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: Screen.width, flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => navigate('FotoFavorit')}>
                    <Image source={images.fotofavorit} style={{ height: Screen.height * 0.18, width: Screen.width * 0.5, aspectRatio: 1.5 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={images.kalimatbijak} style={{ height: Screen.height * 0.18, width: Screen.width * 0.5, aspectRatio: 1.5, marginRight: 12 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: Screen.width, minHeight: 10, flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
                <TouchableOpacity>
                    <Image source={images.curhat} style={{ height: Screen.width * 0.3, width: Screen.width * 0.3, aspectRatio: 1 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={images.koneseling} style={{ height: Screen.width * 0.3, width: Screen.width * 0.3, aspectRatio: 1 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={images.mediasi} style={{ height: Screen.width * 0.3, width: Screen.width * 0.3, aspectRatio: 1, marginRight: 12 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}