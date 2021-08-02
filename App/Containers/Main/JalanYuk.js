import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput,Platform,FlatList,Linking,PermissionsAndroid } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import { OverlayJalanYuk } from '../../Components/OverlayJalanYuk';
import Geolocation from '@react-native-community/geolocation';
import { bindActionCreators } from 'redux';
//redux
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import GetPlaceRedux from '../../Redux/JalanYuk/GetPlaceRedux'
import HistoryPlaceRedux from '../../Redux/JalanYuk/HistoryPlaceRedux'
import { set } from 'seamless-immutable';



function JalanYuk(props) {
    const { navigation,token,listplace,listhistory,GetPlaceRequest,HistoryPlaceRequest } = props
    const { navigate,pop } = navigation

    const [latlong, setlatlong] = useState()
    const [listPlaces, setlistPlaces] = useState([])
    const [listHistory, setlistHistory] = useState([])
    const [selected, setselected] = useState()
    const [search, setsearch] = useState(null)
    const [visible, setVisible] = useState(false);
    const toggleOverlay = (params) => {
        setVisible(!visible);
        setselected(params)
    };
    const request = async() =>{
        if(Platform.OS==='android'){
             await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
        }else{
            await Geolocation.requestAuthorization()
        }
        
        await Geolocation.watchPosition((position) => {
            let region = {
                latitude:       position.coords.latitude,
                longitude:      position.coords.longitude,
                latitudeDelta:  0.00922*1.5,
                longitudeDelta: 0.00421*1.5
              }
            !latlong && setlatlong(region)
            // console.log('region',region)     
          }, (error)=>console.log(error));
    }
    useEffect(() => {
        request()
    }, [])

    useEffect(() => {
        if(latlong){
            const payloadPlace ={
                'token':token && token.data.access_token,
                'page':1,
                'limit':5,
                'lat':latlong.latitude,
                'long':latlong.longitude,
                'key':'',
                'id':''
              }
            const payloadHistory ={
                'token':token && token.data.access_token,
                'page':1,
              }
            GetPlaceRequest(payloadPlace)
            HistoryPlaceRequest(payloadHistory)
            // console.log('latlong',latlong)
        }
    }, [latlong])
    
    useEffect(() => {
        if(listplace){
            setlistPlaces(listplace.data)
        }
    }, [listplace])

    useEffect(() => {
       if(listhistory){
           setlistHistory(listhistory.data)
            // console.log('listhistory',listhistory.data[0])
       }
    }, [listhistory])
    const SearchPlace = (text) => {
        // console.log(text.length)
        if(text.length>0){
            const payload ={
                'token':token && token.data.access_token,
                'page':1,
                'limit':10,
                'lat':latlong &&latlong.latitude,
                'long':latlong && latlong.longitude,
                'key':text,
                'id':''
              }
            GetPlaceRequest(payload)
            setsearch(text)
        }else{
            const payload ={
                'token':token && token.data.access_token,
                'page':1,
                'limit':5,
                'lat':latlong && latlong.latitude,
                'long':latlong &&latlong.longitude,
                'key':'',
                'id':''
              }
            GetPlaceRequest(payload)
            setsearch(null)
        }
       
        
    }
    const openMaps = (lat, lng) => {
        // let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        // let url = scheme + `${lat},${lng}`;
        // Linking.openURL(url);
        if(Platform.OS==='ios'){
            Linking.openURL(`maps://app?saddr=${lat}+${lng}&daddr=${latlong && latlong.lat}+${latlong && latlong.long}`)
        }else{
            Linking.openURL(`google.navigation:q=${lat}+${lng}`)
        }
       
      }
    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => pop()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Jalan yuk!</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.containerSearch}>
                        <Image source={images.search} style={{ width: 25, height: 25 }} resizeMode='contain' />
                        <TextInput style={{ color: 'white', flex: 1, marginLeft: 10 }}
                            placeholder={'Search a place...'}
                            placeholderTextColor='rgba(255, 255, 255, 0.5)'
                            value={search}
                            onChangeText={text => SearchPlace(text)}
                            keyboardType={'default'}
                        // inputRef={(ref) => (this.number = ref)}
                        >
                        </TextInput>
                    </View>
                    {
                       search?
                        <View style={{ marginBottom: 10 }}>
                           <FlatList 
                                data={listPlaces}
                                horizontal={false}
                                renderItem={({ item, index, separators }) => (
                                    <TouchableOpacity onPress={()=>toggleOverlay(item)}>
                                         <View style={{ flexDirection: 'row', marginBottom: 20, marginRight: 20  }}>
                                            <Image source={{uri:item.photo.url}} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                                            <View style={{ marginLeft: 20, height: Screen.width * 0.3, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                                {
                                                     item.is_featured===1 &&
                                                     <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.2, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                                        <Image source={images.addChart} style={{ width: 15, height: 15 }} resizeMode='contain' />
                                                        <Text style={{ color: 'white', fontWeight: '500', marginLeft: 10, fontSize:12}}>Pesan</Text>
                                                    </View>
                                                }
                                               
                                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13, width: Screen.width * 0.5 }}numberOfLines={2}>{item.name}</Text>
                                                <Text style={{ color: 'white', fontWeight: '500', marginBottom: 10, fontSize: 13 }}numberOfLines={1}>{item.created_at?new Date(item.created_at).toLocaleString('es-AR'):''}</Text>
                                                <Text style={{ color: 'white', fontWeight: '500', width: Screen.width * 0.55, fontSize: 13 }}numberOfLines={2}>{item.address}</Text>
                                            </View>
                                        </View>
                                    {/* <View style={{ flexDirection: 'column', marginBottom: 20, marginRight: 20 }}>
                                        <Image source={{uri: item.photo.url}} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                                        <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }} numberOfLines={1}>{item.name}</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }} numberOfLines={1}>{item.created_at}</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>{item.distance} km</Text>
                                        </View>
                                    </View> */}
                                </TouchableOpacity>
                                  )}
                            />  
                        </View>:
                        <ScrollView>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.3, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Recomended</Text>
                            </View>
                            {/* <TouchableOpacity>
                                <Text style={{ color: '#67308F', marginLeft: 10, fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacity> */}
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <FlatList 
                                data={listPlaces}
                                horizontal={true}
                                renderItem={({ item, index, separators }) => (
                                    <TouchableOpacity onPress={()=>toggleOverlay(item)}>
                                    <View style={{ flexDirection: 'column', marginBottom: 20, marginRight: 20 }}>
                                        <Image source={{uri: item.photo.url}} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                                        <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }} numberOfLines={1}>{item.name}</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }} numberOfLines={1}>{item.address}</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>{item.distance.toFixed(2)} km</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                  )}
                            />
                        </View>

                        <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#D9078D', borderStyle: 'dashed' }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                            <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.3, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>History</Text>
                            </View>
                        </View>
                        {
                            listHistory.length>0?
                            <FlatList 
                            data={listHistory}
                            horizontal={false}
                            renderItem={({ item, index, separators }) => (
                                
                                     <View style={{ flexDirection: 'row', marginBottom: 20, marginRight: 20  }}>
                                        <Image source={{ uri: item.place.photo.url}} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                                        <View style={{ marginLeft: 20, height: Screen.width * 0.3, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                            <TouchableOpacity onPress={()=>Linking.openURL(item.place.url)}>
                                                <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.2, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                                    <Image source={images.addChart} style={{ width: 15, height: 15 }} resizeMode='contain' />
                                                    <Text style={{ color: 'white', fontWeight: '500', marginLeft: 10, fontSize:12}}>Pesan</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}numberOfLines={1}>{item.place.name}</Text>
                                            <Text style={{ color: 'white', fontWeight: '500', marginBottom: 10, fontSize: 13 }}numberOfLines={1}>{item.place.created_at?new Date(item.place.created_at).toLocaleString('es-AR'):''}</Text>
                                            <Text style={{ color: 'white', fontWeight: '500', width: Screen.width * 0.4, fontSize: 13 }}numberOfLines={1}>{item.place.address}</Text>
                                        </View>
                                    </View>

                            
                              )}
                        />  :
                        <Text style={{color:'white', textAlign:'center', fontSize:20}}>Tidak ada History</Text>
                        }
                    </ScrollView>
                    }
                    
                    <OverlayJalanYuk visible={visible} toggleOverlay={toggleOverlay} selected={selected} openMaps={openMaps}/>
                </View>
            </View>
        </TemplateBackground>
    )
}

const mapStateToProps = (state) => {
    const { listplace, token, listhistory } = state
    return {
        token: token.payload,
        listplace: listplace.payload,
        listhistory: listhistory.payload
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(GetPlaceRedux,TokenRedux,HistoryPlaceRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JalanYuk)