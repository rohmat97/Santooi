import React from 'react';
import { View, Text } from "react-native"
import { Screen } from '../Transforms/Screen';
import { Image } from 'react-native-elements';
import images from '../Themes/Images';


export const CustomBottomTab =({})=>{
    return(
        <View style={{flex:1,width: Screen.width,alignItems:'center'}}>
            <View style={{  backgroundColor:'white', bottom:80, width:"80%",alignItems:'center',justifyContent:'space-around',height:Screen.height*0.1, maxHeight:75, borderRadius:42, flexDirection:'row',paddingHorizontal:12}}>
                <Image
                    source={images.iconHome}
                    style={{ width: Screen.height*0.035, height: Screen.height*0.055 }}
                    />
                <Image
                    source={images.iconJournal}
                    style={{ width: Screen.height*0.045, height: Screen.height*0.055 }}
                    />
                <Image
                    source={images.iconAccount}
                    style={{ width: Screen.height*0.05, height: Screen.height*0.055 }}
                    />
            </View>
        </View>
    )
}