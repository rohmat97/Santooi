import React, { useState } from 'react'
import { Alert } from 'react-native'
import { FlatList } from 'react-native'
import { View, Text, TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements/dist/image/Image'
import images from '../../../Themes/Images'
import { Screen } from '../../../Transforms/Screen'
export const HeaderFoto =({isEmpty,pop,loading}) =>{
    if(isEmpty){
        return(
        <View style={{height:Screen.height, paddingHorizontal:12, paddingTop:12}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => pop()}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                    <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Foto-foto Favorit</Text>
                </TouchableOpacity>
            </View>
            {
                !loading?
                <View style={{ justifyContent:'center',alignItems:'center' }}>
                    <Image source={images.emptyStateFoto} style={{ width: Screen.width*0.8, height: Screen.height*0.6 }} resizeMode='contain' />
                </View>:
                <View style={{ justifyContent:'center',alignItems:'center',flex:0.75 }}>
                    <ActivityIndicator color={'white'} size='large' />
                </View>
                
            }
            
        </View>
        )
    }
    return(
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        <TouchableOpacity
            onPress={() => pop()}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Foto-foto Favorit</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => Alert.alert('','on dev')}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white',backgroundColor:'#67308F',padding:4,paddingHorizontal:12,borderRadius:20, marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Pilih</Text>
        </TouchableOpacity>
    </View>
)}


export const MenuFoto =({setisGaleri,isGaleri})=>{
    return(
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        <TouchableOpacity
            onPress={() => setisGaleri(true)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white',backgroundColor:isGaleri?'#67308F':'rgba(103, 48, 143, 0.6)',padding:4,paddingHorizontal:24,borderRadius:4, marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Semua Galeri</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => setisGaleri(false)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white',backgroundColor:!isGaleri?'#67308F':'rgba(103, 48, 143, 0.6)',padding:4,paddingHorizontal:24,borderRadius:4, marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Semua Album</Text>
        </TouchableOpacity>
    </View>
    )
}

export const ListFoto =({listFoto,isGaleri,listGaleri,gallery,GalleryRequest,token,onPicked,setonPicked})=>{
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      }
    if(isGaleri){
            return(
                // <ScrollView style={{height:Screen.height}}> 
                <FlatList
                    data={ listFoto }
                    numColumns={2}
                    onMomentumScrollEnd={(event)=>{
                        if (isCloseToBottom(event.nativeEvent)) {
                            if(gallery.current_page !== gallery.last_page){
                                console.log(`page`,gallery.current_page + ' === '+gallery.last_page)
                                const payload ={
                                    'token':token && token.data.access_token,
                                    'page':gallery.current_page+1
                                  }
                                  GalleryRequest(payload)
                            }else{
                                console.log(`page`,gallery.current_page + ' === '+gallery.last_page)
                            }
                            // }
                            
                        }
                    }}
                    renderItem={({ item })=>{
                                const check  = onPicked.includes(item)
                                console.log(check)
                                return(
                                <View style={{ width: Screen.width * 0.5, height: Screen.width * 0.5,padding:Screen.width*0.02}}>
                                    <Image
                                        onLongPress={()=>setonPicked([...onPicked,item])}
                                        source={{uri:item.photo.url}} style={{ width: Screen.width * 0.45, height: Screen.width * 0.45}} 
                                        resizeMode={'stretch'} 
                                        PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
                                        />
                                        {
                                            check?
                                            <View style={{right: 20, bottom: 30,position:'absolute'}}>
                                                <Image source={images.checkedFoto} style={{width:20,height:20}} resizeMode='contain'/>
                                            </View>:null
                                        }
                                    
                                </View>
                                    )
                    }}
                />

                        // listFoto.map(data =>{
                        //     if(data.isLarge){
                        //         return<Image source={images.kopiKenangan} style={{ width: Screen.width * 0.95, height: Screen.height * 0.2,margin:Screen.width*0.025 }} resizeMode={'stretch'} />
                        //     }else{
                        //         return(
                        //         <FlatList
                        //             data={data.list}
                        //             numColumns={2}
                        //             renderItem={({ item })=>(
                        //                 <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.45, height: Screen.width * 0.45,margin:Screen.width*0.025 }} resizeMode={'stretch'} />
                        //             )}
                        //         />
                                
                        //         )
                        //     }
                        // })

                // </ScrollView>
            )

       
    }
    return <ThumbnailAlbum  listGaleri={listGaleri}/>

}

export const ThumbnailAlbum =({listGaleri}) =>{
    return(
        <FlatList
            data={listGaleri}
            numColumns={2}
            renderItem={({ item })=>(
                <TouchableOpacity>
                    <View style={{flexDirection:'row',height:Screen.width*0.5,width:Screen.width*0.5,paddingHorizontal:8,marginBottom:-48}}>
                        <Image source={images.kopiKenangan} style={{ width: '70%', height: '70%', borderTopLeftRadius:12,borderBottomLeftRadius:12 }} resizeMode={'stretch'} />
                        <View style={{width:'30%',height:'35%'}}>
                            <Image source={images.kopiKenangan} style={{ width: '100%', height: '100%',borderTopRightRadius:20 }} resizeMode={'stretch'} />
                            <Image source={images.kopiKenangan} style={{ width: '100%', height: '100%' ,borderBottomRightRadius:20}} resizeMode={'stretch'} />
                        </View>
                    </View>
                    <View style={{paddingHorizontal:8,marginBottom:20}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Nameless</Text>
                        <Text style={{color:'white', fontWeight:'normal',opacity:0.8}}>xxx times</Text>
                    </View>
                </TouchableOpacity>
                
            )}
        />
    )
}