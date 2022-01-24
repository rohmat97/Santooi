import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, TextInput,Platform,FlatList,Linking } from 'react-native'
import { Image } from 'react-native-elements'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import { connect } from 'react-redux';
import { OverlayJalanYuk } from '../../Components/OverlayJalanYuk';
import Geolocation from '@react-native-community/geolocation';
import { bindActionCreators } from 'redux';
import {check, PERMISSIONS, RESULTS, request, openSettings} from 'react-native-permissions';
//redux
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import GetPlaceRedux from '../../Redux/JalanYuk/GetPlaceRedux'
import HistoryPlaceRedux from '../../Redux/JalanYuk/HistoryPlaceRedux'
import UpdateHistoryRedux from '../../Redux/JalanYuk/UpdateHistoryRedux'
import { RefreshControl } from 'react-native';
import { ComponentSearch } from './JalanYuks/Search';
import { ComponentMain } from './JalanYuks/Main';
import { ComponentSeeALl } from './JalanYuks/SeeAll';


import API from '../../Services/Api';
const api = API.create();
function JalanYuk(props) {
    const { navigation,token } = props
    const { navigate,pop } = navigation

    const [latlong, setlatlong] = useState()
    const [listPlaces, setlistPlaces] = useState([])
    const [listHistory, setlistHistory] = useState([])
    const [listSeeAll, setlistSeeAll] = useState([])
    const [dataSeeall, setdataSeeall] = useState()
    const [selected, setselected] = useState()
    const [search, setsearch] = useState(null)
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [seeAll, setseeAll] = useState(false)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    const getHistory=(payload)=>{
        api.getHistoryPlace(payload)
        .then(success =>{
            setlistHistory(success.data.data.rows)
        })
    }
    const updateHistory=(payload)=>{
        api.updateHistory(payload)
    }
    
    const onFetch =()=>{
        if(search && search.length>0){
            const payload ={
                'token':token && token.data.access_token,
                'page':parseInt(dataSeeall.current_page)+1,
                'limit':10,
                'lat':latlong &&latlong.latitude,
                'long':latlong && latlong.longitude,
                'key':search,
                'id':''
              }
              api.getPlace(payload)
              .then(success=>{
                  setlistSeeAll([...success.data.data.rows.data, ...listSeeAll])
                  setdataSeeall(success.data.data.rows)
              })
        }else{
            const payloadPlace ={
                'token':token && token.data.access_token,
                'page':parseInt(dataSeeall.current_page)+1,
                'limit':10,
                'lat':latlong&&latlong.latitude,
                'long':latlong&&latlong.longitude,
                'key':'',
                'id':''
              }
            api.getPlace(payloadPlace)
            .then(success=>{
                setlistSeeAll([...success.data.data.rows.data, ...listSeeAll])
                setdataSeeall(success.data.data.rows)
            })
        }
       
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        const payloadPlace ={
                'token':token && token.data.access_token,
                'page':1,
                'limit':5,
                'lat':latlong&&latlong.latitude,
                'long':latlong&&latlong.longitude,
                'key':'',
                'id':''
              }
        api.getPlace(payloadPlace)
        .then(success=>{
            setlistPlaces(success.data.data.rows)
        })
        // GetPlaceRequest(payloadPlace)
        const payloadHistory ={
                'token':token && token.data.access_token,
                'page':1,
              }
        getHistory(payloadHistory)
        // HistoryPlaceRequest(payloadHistory)
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const toggleOverlay = (params) => {
        setVisible(!visible);
        setselected(params)
    };
    useEffect(() => {
        if(seeAll){
        const payloadPlace ={
            'token':token && token.data.access_token,
            'page':1,
            'limit':10,
            'lat':latlong&&latlong.latitude,
            'long':latlong&&latlong.longitude,
            'key':'',
            'id':''
            }
        api.getPlace(payloadPlace)
        .then(success=>{
            setdataSeeall(success.data.data.rows)
            setlistSeeAll(success.data.data.rows.data)
        })
        }else{
            setlistSeeAll([])
            setdataSeeall([])
        }
    }, [seeAll])
    const getGeoloc= async() =>{
        await Geolocation.watchPosition((position) => {
            let region = {
                latitude:       position.coords.latitude,
                longitude:      position.coords.longitude,
                latitudeDelta:  0.00922*1.5,
                longitudeDelta: 0.00421*1.5
              }
            !latlong && setlatlong(region)   
          });
    }
    const requestLocation = async() =>{
        if(Platform.OS==='android'){
             request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
             .then(async status =>
               status === RESULTS.GRANTED
                 ? { status, precise: true }
                 : { status: await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION), precise: false },
             )
             .then(({ status, precise }) => console.log("location status: ", status)).catch(err => 
                openSettings().catch(() => console.warn('cannot open settings')))
             
   }else{
            await Geolocation.requestAuthorization()
        }
        
    }
    useEffect(() => {
        requestLocation()
    }, [])

    useEffect(() => {
        console.log(`latlong`, latlong)
        if(latlong){
            const payloadPlace ={
                'token':token && token.data.access_token,
                'page':1,
                'limit':5,
                'lat':latlong&&latlong.latitude,
                'long':latlong&&latlong.longitude,
                'key':'',
                'id':''
              }
            api.getPlace(payloadPlace)
            .then(success=>{
                setlistPlaces(success.data.data.rows)
            })
            const payloadHistory ={
                    'token':token && token.data.access_token,
                    'page':1,
                }
            api.getHistoryPlace(payloadHistory)
            .then(success =>{
                setlistHistory(success.data.data.rows)
            })
        }
    }, [latlong])

    const SearchPlace = (text) => {
        // console.log(text)
        if(seeAll){
            const payloadPlace ={
                'token':token && token.data.access_token,
                'page':1,
                'limit':10,
                'lat':latlong&&latlong.latitude,
                'long':latlong&&latlong.longitude,
                'key':text,
                'id':''
                }
            api.getPlace(payloadPlace)
            .then(success=>{
                setdataSeeall(success.data.data.rows)
                setlistSeeAll(success.data.data.rows.data)
            })
        }else if(text.length>0){
            const payload ={
                'token':token && token.data.access_token,
                'page':1,
                'limit':10,
                'lat':latlong &&latlong.latitude,
                'long':latlong && latlong.longitude,
                'key':text,
                'id':''
              }
              api.getPlace(payload)
              .then(success=>{
                  setlistPlaces(success.data.data.rows)
              })
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
              api.getPlace(payload)
              .then(success=>{
                  setlistPlaces(success.data.data.rows)
              })
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
            Linking.openURL(`google.navigation:q=${lat}+${lng}&daddr=${latlong && latlong.lat}+${latlong && latlong.long}`)
        }
       
      }
      const reset =()=>{
        setseeAll(false)
        SearchPlace('')
    }

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    }
                >   
                    <TouchableOpacity onPress={() => {
                        seeAll ?reset():pop()
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Jalan Yuk!</Text>
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
                        >
                        </TextInput>
                    </View>

                </ScrollView>
                    {   
                       seeAll?
                       <ComponentSeeALl listPlaces={listSeeAll} toggleOverlay={toggleOverlay} onFetch={onFetch}/>
                       :
                       search?
                        <ComponentSearch listPlaces={listPlaces?listPlaces?.data:[]} toggleOverlay={toggleOverlay} />
                        :
                        <ComponentMain listHistory={listHistory?listHistory.data:[]} listPlaces={listPlaces?listPlaces?.data:[]} setseeAll={setseeAll} toggleOverlay={toggleOverlay} />
                    }
                    
                    <OverlayJalanYuk visible={visible} toggleOverlay={toggleOverlay} selected={selected} openMaps={openMaps} token={token} getHistory={getHistory} updateHistory={updateHistory}/>
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
    return bindActionCreators(Object.assign(GetPlaceRedux,TokenRedux,HistoryPlaceRedux,UpdateHistoryRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JalanYuk)