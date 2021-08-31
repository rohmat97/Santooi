import React from 'react';
import { View, Text } from "react-native"
import { Screen } from '../Transforms/Screen';
import { Image } from 'react-native-elements';
import images from '../Themes/Images';
import { TouchableOpacity } from 'react-native';


export const CustomBottomTab2 = ({page, SetPage }) => {
    return (
        <View style={{ flex: 1, width: Screen.width, alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', bottom: 90, width: "100%", alignItems: 'center', justifyContent: 'space-around', height: Screen.height * 0.1, maxHeight: 80, flexDirection: 'row', paddingHorizontal: 12,position:'absolute',bottom:0 }}>
                <TouchableOpacity onPress={()=> SetPage('Chats')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={images.ChatMenu}
                            style={{ width: Screen.height * 0.035, height: Screen.height * 0.035,tintColor:page==='Chats'?'#DD118C':'gray' }} resizeMode='contain'
                        />
                        <Text style={{ fontSize: 12, marginTop: 5, color:'#939598' }}>Chats</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> SetPage('Calls')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={images.CallsMenu}
                            style={{ width: Screen.height * 0.035, height: Screen.height * 0.035,tintColor:page==='Calls'?'#DD118C':'gray' }} resizeMode='contain'
                        />
                        <Text style={{ fontSize: 12, marginTop: 5, color:'#939598'}}>Calls</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> SetPage('Contacts')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={images.ContactMenu}
                            style={{ width: Screen.height * 0.035, height: Screen.height * 0.035,tintColor:page==='Contacts'?'#DD118C':'gray' }} resizeMode='contain'
                        />
                        <Text style={{ fontSize: 12, marginTop: 5, color:'#939598'}}>Contacts</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> SetPage('Request')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={images.request}
                            style={{ width: Screen.height * 0.035, height: Screen.height * 0.035,tintColor:page==='Request'?'#DD118C':'gray' }} resizeMode='contain'
                        />
                        <Text style={{ fontSize: 12, marginTop: 5, color:'#939598'}}>Request</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}