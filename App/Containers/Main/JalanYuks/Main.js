import React from 'react'
import { ActivityIndicator, FlatList, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Screen } from '../../../Transforms/Screen'
import { Image } from 'react-native-elements'
import images from '../../../Themes/Images'
export const ComponentMain = ({listHistory, listPlaces, setseeAll, toggleOverlay}) =>{
    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={{ backgroundColor: '#67308F', width: 140,height:30, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold',fontSize:14 }}>Recommended</Text>
                </View>
                <TouchableOpacity onPress={()=>setseeAll(true)}>
                    <Text style={{ color: '#67308F', marginLeft: 10, fontWeight: 'bold' }}>See All</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
                <FlatList 
                    data={listPlaces}
                    horizontal={true}
                    renderItem={({ item, index, separators }) => {
                        // console.log(item)
                        if(item.status ===1){
                            return(
                                <TouchableOpacity onPress={()=>toggleOverlay(item)}>
                                <View style={{ flexDirection: 'column', marginBottom: 20, marginRight: 20 }}>
                                    <Image source={{uri: item.photo.url}} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3,borderRadius:12 }} resizeMode='cover' PlaceholderContent={<ActivityIndicator />}/>
                                    <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }} numberOfLines={1}>{item.name}</Text>
                                        <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }} numberOfLines={1}>{item.address}</Text>
                                        <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>{item.distance.toFixed(2)} km</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                                )
                        }
                        }}
                />
            </View>

            <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#D9078D', borderStyle: 'dashed' }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.3, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>History</Text>
                </View>
            </View>
            {
                <FlatList 
                data={listHistory}
                ListEmptyComponent={ 
                    <View style={{flex:1,paddingBottom:Screen.height*0.6}}>
                        <Text style={{color:'white', textAlign:'center', fontSize:20}}>Tidak ada History</Text>
                    </View>
                }
                contentContainerStyle={{
                    paddingBottom:Screen.height*0.1
                }}
                renderItem={({ item, index, separators }) => {
                    // console.log('data', item)
                    let formatedDate  =new Date (item.updated_at)
                    let monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
                    let date =formatedDate.getDate()+' '+monthNames[formatedDate.getMonth()]+' '+formatedDate.getFullYear()+', '+formatedDate.getHours()+':'+formatedDate.getMinutes()
                    return(
                            <View style={{ flexDirection: 'row', marginBottom: 20, marginRight: 20  }}>
                            <View>
                                <Image source={{ uri: item.place.photo.url}} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, borderRadius:12 }} resizeMode='cover' PlaceholderContent={<ActivityIndicator />}/>
                                
                                {
                                    item.place.is_featured===1&&
                                    <View 
                                        style={{
                                            marginTop:-Screen.width*0.3,
                                            marginLeft:Screen.width*0.135
                                            // marginLeft:-Screen.width*0.165
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
                                    // <Text 
                                    // style={{
                                    //     backgroundColor:'#7E3DAD',
                                    //     width:60,
                                    //     padding:8,
                                    //     color:'white',
                                    //     borderRadius:24,
                                    //     textAlign:'center',
                                    //     marginTop:-Screen.width*0.28,
                                    //     fontSize:8,
                                    //     marginLeft:Screen.width*0.14
                                    //     }}>
                                    //     Featured
                                    // </Text>
                                }
                                
                            </View>
                            
                            <View style={{ marginLeft: 20, height: Screen.width * 0.3, flexDirection: 'column', justifyContent: 'flex-end',marginTop: item.place.is_featured===0?-Screen.height*0.05:0 }}>
                                {
                                    item.place.is_featured===1&&
                                    <TouchableOpacity onPress={()=>Linking.openURL(item.place.url)}>
                                        <View style={{ backgroundColor: '#67308F', width: Screen.width*0.2+item.place.wording.length*3, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                            <Image source={images.addChart} style={{ width: 15, height: 15 }} resizeMode='contain' PlaceholderContent={<ActivityIndicator />}/>
                                            <Text style={{ color: 'white', fontWeight: '500', marginLeft: 10, fontSize:12}}>{item.place.wording}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13,width:Screen.width*0.55 }}numberOfLines={2}>{item.place.name}</Text>
                                <Text style={{ color: 'white', fontWeight: '500', marginBottom: 10, fontSize: 13 }}numberOfLines={1}>{item.place.created_at?date:''}</Text>
                                <Text style={{ color: 'white', fontWeight: '500', width: Screen.width * 0.55, fontSize: 13 }}numberOfLines={1}>{item.place.address}</Text>
                            </View>
                        </View>

                
                    )}}
            /> 
            }
        </ScrollView>  
    )
}