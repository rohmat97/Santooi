import React from 'react';
import { View, Text } from "react-native"
import { Screen } from '../Transforms/Screen';
import { Image } from 'react-native-elements';
import images from '../Themes/Images';


export const CustomBottomTab2 = ({ }) => {
    return (
        <View style={{ flex: 1, width: Screen.width, alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', bottom: 90, width: "100%", alignItems: 'center', justifyContent: 'space-around', height: Screen.height * 0.1, maxHeight: 80, flexDirection: 'row', paddingHorizontal: 12,position:'absolute',bottom:0 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={images.ChatMenu}
                        style={{ width: Screen.height * 0.035, height: Screen.height * 0.035 }} resizeMode='contain'
                    />
                    <Text style={{ fontSize: 12, marginTop: 5, color:'#939598' }}>Chats</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={images.CallsMenu}
                        style={{ width: Screen.height * 0.035, height: Screen.height * 0.035 }} resizeMode='contain'
                    />
                    <Text style={{ fontSize: 12, marginTop: 5, color:'#939598'}}>Calls</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={images.ContactMenu}
                        style={{ width: Screen.height * 0.035, height: Screen.height * 0.035 }} resizeMode='contain'
                    />
                    <Text style={{ fontSize: 12, marginTop: 5, color:'#939598'}}>Contacts</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={images.request}
                        style={{ width: Screen.height * 0.035, height: Screen.height * 0.035 }} resizeMode='contain'
                    />
                    <Text style={{ fontSize: 12, marginTop: 5, color:'#939598'}}>Request</Text>
                </View>

            </View>
        </View>
    )
}