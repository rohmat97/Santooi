import React, { useState } from 'react'
import { View, Text, TouchableOpacity,FlatList, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Divider, Overlay, Image } from 'react-native-elements'
import images from '../../../Themes/Images'
import { Screen } from '../../../Transforms/Screen'
export const HeaderFoto =({isEmpty,pop,loading,setisGaleri,isGaleri,setvisibleBottomSheet,visibleBottomSheet,setonPicked,listFoto}) =>{
    if(isEmpty){
        return(
        <View style={{height:loading?Screen.height:Screen.height*0.3, paddingHorizontal:12, paddingTop:12}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => pop()}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                    <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Foto-foto Favorit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setvisibleBottomSheet(!visibleBottomSheet)
                        setonPicked([])
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#67308F',padding:4,width:60,borderRadius:20, marginLeft: 15,justifyContent:'center' }}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>{visibleBottomSheet?'Batal':'Pilih'}</Text>
                </TouchableOpacity>
            </View>
            {
                loading?
                <View style={{height:Screen.height*0.7, justifyContent:'center'}}>
                    <ActivityIndicator color='#67308F' size={80} />
                </View>:null
            }
            <View style={{height:Screen.height*0.7, justifyContent:'center',alignItems:'center'}}>
                <Image source={images.emptyStateFoto} style={{width:Screen.width*0.8,height:Screen.width*0.8, borderRadius:32}} resizeMode='contain' />
            </View>
           
            {/* <MenuFoto setisGaleri={setisGaleri} isGaleri={isGaleri}/> */}
        </View>
        )
    }
    return(
    <View style={{height:loading?Screen.height:Screen.height*0.3, paddingHorizontal:12, paddingTop:12}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
            <TouchableOpacity
                onPress={() => pop()}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Foto-foto Favorit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setvisibleBottomSheet(!visibleBottomSheet)
                    setonPicked([])
                }}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#67308F',padding:4,width:60,borderRadius:20, marginLeft: 15,justifyContent:'center' }}>
                <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>{visibleBottomSheet?'Batal':'Pilih'}</Text>
            </TouchableOpacity>
        </View>
        <MenuFoto setisGaleri={setisGaleri} isGaleri={isGaleri}/>
    </View>
)}


export const MenuFoto =({setisGaleri,isGaleri,isEmpty})=>{
    return(
    <View style={{ width:Screen.width*0.94,flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30,marginTop:isEmpty?4:0 }}>
        <TouchableOpacity
            onPress={() => setisGaleri(true)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{backgroundColor:isGaleri?'#67308F':'rgba(103, 48, 143, 0.6)',padding:4,borderRadius:4,width:Screen.width*0.415,alignItems:'center'}}>
                <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>Semua Galeri</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => setisGaleri(false)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{backgroundColor:!isGaleri?'#67308F':'rgba(103, 48, 143, 0.6)',padding:4,borderRadius:4,width:Screen.width*0.415,alignItems:'center'}}>
                <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>Album</Text>
            </View>
            {/* <Text style={{ color: 'white',backgroundColor:!isGaleri?'#67308F':'rgba(103, 48, 143, 0.6)',padding:4,borderRadius:4, marginLeft: 15, fontWeight: '500', fontSize: 16,width:Screen.width*0.4,textAlign:'center' }}>Album</Text> */}
        </TouchableOpacity>
    </View>
    )
}

export const ListFoto =({listFoto,album,isGaleri,listGaleri,gallery,GalleryRequest,token,onPicked,setonPicked,setvisibleBottomSheet,setvisibleDetailFoto,visibleBottomSheet,setselectedDetailFoto,AlbumRequest,navigate})=>{
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
                        // console.log(gallery)
                        if (isCloseToBottom(event.nativeEvent)) {
                            if(gallery.current_page < gallery.last_page){
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
                                let data = []
                                // console.log(item)
                                return(
                                <View style={{ width: Screen.width * 0.5, height: Screen.width * 0.5,padding:Screen.width*0.02}}>
                                    <View style={{backgroundColor:'transparent',width: Screen.width * 0.45, height: Screen.width * 0.45}}>
                                        <Image
                                            onLongPress={()=>{
                                                if(!check && onPicked.length<1) {
                                                    setonPicked([...onPicked,item])
                                                    setvisibleBottomSheet(true)
                                                }else{
                                                    onPicked.map(dat =>{
                                                        if(dat !== item){
                                                            data.push(dat)
                                                        }
                                                    })
                                                    setonPicked(data)
                                                }
                                                
                                            }}
                                            onPress={()=>{
                                                if(visibleBottomSheet){
                                                    // if(onPicked.length>0){
                                                        // console.log('work')
                                                        if(check){
                                                            onPicked.map(dat =>{
                                                                if(dat !== item){
                                                                    data.push(dat)
                                                                }
                                                            })
                                                            setonPicked(data)
                                                        }else{
                                                            onPicked.map(dat =>{
                                                                    data.push(dat)
                                                            })
                                                            data.push(item)
                                                            setonPicked(data)
                                                        }
                                                    
                                                    // }
                                                }else{
                                                    setvisibleDetailFoto(true)
                                                    setselectedDetailFoto(item)
                                                }
                                                
                                            }}
                                            source={{uri:item.photo.url}} style={{ width: Screen.width * 0.45, height: Screen.width * 0.45}} 
                                            resizeMode={'cover'} 
                                            PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
                                        />
                                    </View>
                                   
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
    return <ThumbnailAlbum  listGaleri={listGaleri} album={album} AlbumRequest={AlbumRequest} visibleBottomSheet={visibleBottomSheet} setvisibleBottomSheet={setvisibleBottomSheet} setonPicked={setonPicked} onPicked={onPicked} navigate={navigate}/>

}

export const ThumbnailAlbum =({ listGaleri, visibleBottomSheet, album, AlbumRequest, setvisibleBottomSheet, setonPicked, onPicked, navigate }) =>{
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      }
    return(
        <FlatList
            data={listGaleri}
            numColumns={2}
            onMomentumScrollEnd={(event)=>{
                // console.log(gallery)
                if (isCloseToBottom(event.nativeEvent)) {
                    if(album.current_page < album.last_page){
                        console.log(`page`,album.current_page + ' === '+album.last_page)
                        const payload ={
                            'token':token && token.data.access_token,
                            'page':album.current_page+1
                          }
                          AlbumRequest(payload)
                    }else{
                        console.log(`page`,album.current_page + ' === '+album.last_page)
                    }
                    // }
                    
                }
            }}
            renderItem={({ item })=>{
            let data = []
            const check  = onPicked.includes(item)
            // console.log('item', item.col_highlight)
            return(
            <TouchableOpacity  
                onLongPress={()=>{
                    if(!check && onPicked.length<1) {
                        setonPicked([...onPicked,item])
                        setvisibleBottomSheet(true)
                    }else{
                        onPicked.map(dat =>{
                            if(dat !== item){
                                data.push(dat)
                            }
                        })
                        setonPicked(data)
                    }
                    
                }}
            onPress={()=>{
                if(visibleBottomSheet){
                    // if(onPicked.length>0){
                        // console.log('work')
                        if(check){
                            onPicked.map(dat =>{
                                if(dat !== item){
                                    data.push(dat)
                                }
                            })
                            setonPicked(data)
                        }else{
                            onPicked.map(dat =>{
                                    data.push(dat)
                            })
                            data.push(item)
                            setonPicked(data)
                        }
                    
                    // }
                }else{
                    navigate('DetailAlbum',{params:item})
                }
                
            }}>
            <View style={{ width: Screen.width * 0.4, height: Screen.width * 0.45,marginVertical:16,marginHorizontal:Screen.width*0.05,marginBottom:24}}>
                    {
                    item&&item.col_highlight&&item.col_highlight.length>0?
                    <View style={{backgroundColor:'#FFF6FA',width: Screen.width * 0.4, height: Screen.width * 0.4, borderRadius:20}}>
                        <Image
                        source={{uri:item.col_highlight[0].photo.url}} style={{ width: Screen.width * 0.4, height: Screen.width * 0.4, borderRadius:20}} 
                        resizeMode={'cover'} 
                        PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
                        />
                        <View style={{marginTop:8,marginBottom:24}}>
                            <Text style={{color:'white',fontWeight:'700'}}>{item.name}</Text>
                            <Text style={{color:'white', fontWeight:'normal',opacity:0.8}}>{item.col_total} item</Text>
                        </View>
                    </View>
                    :
                    <View style={{backgroundColor:'#FFF6FA',width: Screen.width * 0.4, height: Screen.width * 0.4, borderRadius:20}}>
                        <View style={{ width: Screen.width * 0.4, height: Screen.width * 0.4}} />
                        <View style={{marginTop:8,marginBottom:20}}>
                            <Text style={{color:'white',fontWeight:'700'}}>{item.name}</Text>
                            <Text style={{color:'white', fontWeight:'normal',opacity:0.8}}>{item.col_total} item</Text>
                        </View>
                    </View>
                    }
               
                    {
                        check?
                        <View style={{right: 20, bottom: 30,position:'absolute'}}>
                            <Image source={images.checkedFoto} style={{width:20,height:20}} resizeMode='contain'/>
                        </View>:null
                    }
                
            </View>
            </TouchableOpacity>
) 
            }}
        />
        
    )
}

export const DetailFoto = ({visibleDetailFoto, setvisibleDetailFoto, selectedDetailFoto,deleteDetailFoto ,setaddToAlbum, addToAlbum, createNewAlbum, setcreateNewAlbum, nameNewAlbum, setnameNewAlbum, AddNewAlbum, listGaleri,uploadFotoToAlbum}) =>{
    let listAlbum = [{}].concat(listGaleri).filter(function(el) { return el.name !== "All Photos"; })
    
    if(addToAlbum){
        return(
            <Overlay visible={visibleDetailFoto} overlayStyle={{height:Screen.height*0.75, width: Screen.width,position:'absolute',bottom:-10,borderRadius:20}} onBackdropPress={()=> setvisibleDetailFoto(false)}>  
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between',marginHorizontal:8,marginTop:12}}>
                    <Text style={{color:'rgba(103, 48, 143, 1)',textAlign:'center',fontWeight:'bold'}}>Simpan Dalam Album</Text>
                    <TouchableOpacity onPress={()=> {
                        setvisibleDetailFoto(false)
                        setaddToAlbum(false)
                        }}>
                        <Text style={{textAlign:'right', color:'rgba(103, 48, 143, 1)'}}>X</Text>
                    </TouchableOpacity>
                </View>
                    <FlatList
                        data={listAlbum}
                        numColumns={2}
                        contentContainerStyle={{width:Screen.width,marginLeft:-8,height:Screen.height}}
                        renderItem={({ item, index })=>{
                            // console.log(item)
                            if(item && item.col_highlight && item.col_highlight.length>0){
                                return(
                                    <TouchableOpacity onPress={()=> uploadFotoToAlbum(item)}>
                                        <View style={{backgroundColor:'#FFF6FA',width: Screen.width * 0.45, height:200, borderRadius:20,marginTop:20,marginLeft:12}}>
                                            <Image source={{uri:item.col_highlight[0].photo.url}} resizeMode='cover' style={{width:Screen.width*0.45, height:150}}/>
                                            <View style={{marginTop:8,marginBottom:20,marginLeft:12}}>
                                                <Text style={{color:'black',fontWeight:'700'}}>{item.name}</Text>
                                                <Text style={{color:'black', fontWeight:'normal',opacity:0.8}}>{item.col_total} {item.col_total>1?'Items':'Item'}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }else{
                                if(index<1){
                                    return(
                                        <TouchableOpacity onPress={()=> setcreateNewAlbum(true)}>
                                            <Image source={images.newAlbum} resizeMode='contain' style={{width:Screen.width*0.45, height:200,marginLeft:12}}/>
                                        </TouchableOpacity>
                                    )
                                }else{
                                    return (
                                        <TouchableOpacity onPress={()=> uploadFotoToAlbum(item)}>
                                        <View style={{backgroundColor:'#FFF6FA',width: Screen.width * 0.45, height:200, borderRadius:20,marginTop:20,marginLeft:12}}>
                                            <Image source={''} resizeMode='contain' style={{width:Screen.width*0.45, height:150}}/>
                                            <View style={{marginTop:8,marginBottom:20,marginLeft:12}}>
                                                <Text style={{color:'black',fontWeight:'700'}}>{item.name}</Text>
                                                <Text style={{color:'black', fontWeight:'normal',opacity:0.8}}>{item.col_total} {item.col_total>1?'Items':'Item'}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )
                                }
                            }
                            
                        }}
                    />
                   
                
                <Overlay visible={createNewAlbum} onBackdropPress={()=> setcreateNewAlbum(false)}
                    overlayStyle={{height:undefined, width: Screen.width*0.8,borderRadius:20}}
                    >
                    <Text style={{fontWeight:'bold', fontSize:16,textAlign:'center'}}>Album Baru {'\n'}
                        <Text style={{fontWeight:'normal', fontSize:12}}>Masukan nama album</Text>
                    </Text>
                    <TextInput
                        label="Nama album"
                        mode='outlined'
                        value={nameNewAlbum}
                        maxLength={20}
                        onChangeText={text => {
                            if(text.length<20){
                                setnameNewAlbum(text)
                            }
                        }}
                    />
                    <View style={{ width: Screen.width*0.8, height:50,marginBottom:-10, flexDirection:'row',alignItems:'center',borderTopWidth:0.5, borderColor:'rgba(171, 169, 172, 1)', marginTop:24,marginLeft:-10}}>
                        <TouchableOpacity onPress={()=>{
                            setcreateNewAlbum(false)
                            setnameNewAlbum()
                        }}>
                            <Text style={{color:'blue', width:Screen.width*0.4,textAlign:'center', textAlignVertical:'center'}}>Batal</Text>
                        </TouchableOpacity>
                        <Divider orientation="vertical" width={1} />
                        <TouchableOpacity onPress={()=> nameNewAlbum&&nameNewAlbum.length>0 &&AddNewAlbum()}>
                            <Text style={{ width:Screen.width*0.4,textAlign:'center', opacity:nameNewAlbum&&nameNewAlbum.length>0?1:0.5}}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </Overlay>
        )
    }
    return(
        <Overlay visible={visibleDetailFoto} overlayStyle={{height:Screen.height*0.75, width: Screen.width,position:'absolute',bottom:-10,borderRadius:20}} onBackdropPress={()=> setvisibleDetailFoto(false)}>  
            <TouchableOpacity onPress={()=>{
                 setvisibleDetailFoto(false)
                 setaddToAlbum(false)
            }}>
                <Text style={{textAlign:'right', color:'rgba(103, 48, 143, 1)',marginHorizontal:12, fontSize:16}}>X</Text>
            </TouchableOpacity>
            <View style={{justifyContent:'center',alignItems:'center',width:Screen.width*0.95,flexDirection:'row'}}>
                <Image 
                    source={{uri:selectedDetailFoto && selectedDetailFoto.photo.url}} resizeMode='contain' resizeMethod='scale' style={{width:Screen.width*0.9, height:Screen.height*0.4,margin:4}}
                    PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
                    />
            </View>
            <TouchableOpacity 
                onPress={()=> setaddToAlbum(true)}
                style={{backgroundColor:'rgba(102, 45, 145, 1)',marginHorizontal:20,borderRadius:20,height:40,justifyContent:'center'}}>
                <Text style={{color:'#fff',textAlign:'center'}}>Simpan Dalam Album</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>{
                    setvisibleDetailFoto(false)
                    deleteDetailFoto(selectedDetailFoto)
                }}
                style={{borderColor:'rgba(102, 45, 145, 1)',borderWidth:1,marginHorizontal:20,marginTop:20,borderRadius:20,height:40,justifyContent:'center'}}>
                <Text style={{color:'rgba(102, 45, 145, 1)',textAlign:'center'}}>Hapus</Text>
            </TouchableOpacity>
        </Overlay>
    )
}