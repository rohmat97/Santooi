import React from 'react'
import { ActivityIndicator, FlatList, Linking, Text, TouchableOpacity, View } from 'react-native'
import { Screen } from '../../../Transforms/Screen'
import { Image } from 'react-native-elements'
import images from '../../../Themes/Images'
export const ComponentSearch = ({listPlaces, toggleOverlay}) =>{
    return(
        <FlatList 
            data={listPlaces}
            contentContainerStyle={{height:Screen.height}}
            renderItem={({ item, index, separators }) => 
            {
                if(item.status ==1){
                    return(
                <TouchableOpacity onPress={()=>toggleOverlay(item)}>
                    <View style={{ flexDirection: 'row', marginBottom: 20, marginRight: 20  }}>
                        <Image source={{uri:item.photo.url}} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, borderRadius:12 }} resizeMode='cover' PlaceholderContent={<ActivityIndicator />}/>
                        
                        {
                            item.is_featured===1&&
                            <View 
                                style={{
                                    marginLeft:-Screen.width*0.165
                                }}
                            >
                                <Image 
                                    source={images.featured} 
                                    style={{
                                                width:60,
                                                height:30,
                                        }}
                                    resizeMode='contain'
                                    />
                            </View>
                        }
                        <View style={{ marginLeft: 20, height: Screen.width * 0.3, flexDirection: 'column', justifyContent: 'flex-end',marginTop: item.is_featured===0?-Screen.height*0.05:-Screen.height*0.01 }}>
                            {
                                item.is_featured===1 &&
                                <TouchableOpacity onPress={()=>Linking.openURL(item.url)}>
                                    <View style={{ backgroundColor: '#67308F', width: Screen.width*0.2+item.wording.length*3, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center', marginBottom: 10,marginTop:Screen.height*0.05 }}>
                                        <Image source={images.addChart} style={{ width: 15, height: 15 }} resizeMode='contain' PlaceholderContent={<ActivityIndicator />}/>
                                        <Text style={{ color: 'white', fontWeight: '500', marginLeft: 10, fontSize:12}}>{item.wording}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13, width: Screen.width * 0.5 }}numberOfLines={2}>{item.name}</Text>
                            {/* <Text style={{ color: 'white', fontWeight: '500', marginBottom: 10, fontSize: 13 }}numberOfLines={1}>{item.created_at?new Date(item.created_at).toLocaleString('es-AR'):''}</Text> */}
                            <Text style={{ color: 'white', fontWeight: '500', width: Screen.width * 0.55, fontSize: 13 }}numberOfLines={2}>{item.address}</Text>
                        </View>
                    </View>
            </TouchableOpacity>
            )}}
            }
        />  
    )
}