import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity,ImageBackground } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import { connect } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
import { bindActionCreators } from 'redux';
//redux
import MusicRedux from '../../Redux/Berhitung/MusicRedux';
import TokenRedux from '../../Redux/Authentication/TokenRedux'

import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { OverlayBerhitung } from '../../Components/OverlayBerhitung';
import StopWatch from '../../Components/StopWatch';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

function BerhitungYuk(props) {
    const { navigation, dataMusic, MusicRequest, token } = props
    const { pop } = navigation
    const [visible, setVisible] = useState(false);
    const [Minute, setMinute] = useState(0);
    const [Second, setSecond] = useState(0);
    const [miliSecond, setmiliSecond] = useState(0);
    const [start, setstart] = useState(false);
    const [reset, setreset] = useState(false);
    const [played, setplayed] = useState(false);
    const [music, setMusic] = useState()
    const [pemandu, setPemandu] = useState('')
    const [duration, setduration] = useState(0)
    const [listMusic, setlistMusic] = useState([])
    const [playlistMusic, setplaylistMusic] = useState([])
    const [play, setPlay] = useState('START')
    const [statusPLay, setstatusPLay] = useState(false);
    const [statusLoad, setstatusLoad] = useState(false);
    const [isTrial, setisTrial] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
        SoundPlayer.stop()
    };
    const timerRef = useRef(null);

    const Start =(payload) =>{
        setstart(payload)
        if(music && payload){
            if(played){
                KeepAwake.activate()
                SoundPlayer.resume()
                console.log('resume')
            }else{
                KeepAwake.deactivate()
                SoundPlayer.stop()
                console.log('play',music.file.url)
                setTimeout(async() => {
                    await playSound(music.file.url)
                    getInfo()
                }, 500);
            }
        }else{
            console.log('pause')
            setPlay('RESUME')
            SoundPlayer.pause()
            KeepAwake.deactivate()
        }
    }
    const playSound =(payload,trial)=>{
        if(trial && payload){
            setisTrial(true)
            KeepAwake.activate()
            clearTimeout(timerRef.current)
            console.log('data music trial', payload)
            SoundPlayer.loadUrl(payload)
            setstatusLoad(true)
        }else if(payload){
            clearTimeout(timerRef.current)
            SoundPlayer.loadUrl(payload)
            setstatusLoad(true)
            console.log('data music', payload)
            KeepAwake.activate()
        }
       
    }
    const getInfo = async()=> { // You need the keyword `async`
        try {
          const info = await SoundPlayer.getInfo() 
          setduration(info.duration)
        } catch (e) {
        //   console.log('There is no song playing', e)
        }
      }
    let _onFinishedPlayingSubscription = null
    let _onFinishedLoadingSubscription = null
    let _onFinishedLoadingFileSubscription = null
    let _onFinishedLoadingURLSubscription = null
    useEffect(()=>{
        // console.log(currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds())
        _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            console.log('finished-playing', success)
            if(start){
                setstatusPLay(true)
            }
            SoundPlayer.unmount()
            // playSound()
          })
          _onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
            console.log('finished-loading', success)
          })
          _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
            console.log('finished-file', success, name, type)
          })
          _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            console.log('finished-url', success, url)
            setstatusPLay(true)
            // SoundPlayer.play()
          })
          return () => {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            _onFinishedPlayingSubscription.remove()
            _onFinishedLoadingSubscription.remove()
            _onFinishedLoadingURLSubscription.remove()
            _onFinishedLoadingFileSubscription.remove()
            SoundPlayer.stop()
          };
    },[])
    useEffect(()=>{
        if(start){
            // console.log(Second.charAt(0))
            setPlay('PAUSE')
            KeepAwake.activate()
        }else{
            if(reset){
                KeepAwake.deactivate()
                clearTimeout(timerRef.current)
                setreset(false)
                SoundPlayer.stop()
            }
        }
        
    },[start,reset,Second,miliSecond])

    useEffect(()=>{
        MusicRequest({"token":token.data.access_token,'page':1})
        KeepAwake.deactivate()
    },[])

    useEffect(()=>{
        if(statusLoad && statusPLay){
            setstatusLoad(false)
            SoundPlayer.play()
            if(isTrial){
                console.log('ujicoba')
                setisTrial(false)
                setTimeout(() => {
                    SoundPlayer.stop()
                }, 15000);
            }else{
                console.log('for real')
                setplayed(true)
            }
        }
    },[statusLoad, statusPLay])


    useEffect(()=>{
        // console.log('music',dataMusic.data)
        if(dataMusic) {
            setlistMusic(dataMusic)
            if(playlistMusic){
                // let combine =[playlistMusic,dataMusic.data]
                let newlist = playlistMusic.concat(dataMusic.data)
                setplaylistMusic(newlist)
                // console.log('playlistMusic',newlist)
            }else{
                setplaylistMusic(dataMusic.data)
            }
            
        }
    },[dataMusic])

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => pop()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Berhitung yuk!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleOverlay}>
                            <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.25, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                                <Image source={images.speaker} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>Suara</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {/* <Text style={{ color: '#67308F', fontSize: 110, textAlign: 'center', marginVertical: Screen.width * 0.13 }} numberOfLines={1}>
                                <Text>{Minute>9?Minute:'0'+Minute}</Text>
                                <Text>:</Text>
                                <Text>{Second>9?Second:'0'+Second }</Text>
                        </Text> */}
                        <StopWatch start={start}
                            reset={reset}
                            options={options}
                            getTime={new Date()} />
                        <TouchableOpacity onPress={()=> Start(!start)}>
                            <View style={{width:Screen.width, alignSelf: 'center',justifyContent:'center'}}>
                                <ImageBackground source={images.start} style={{maxWidth:225, maxHeight:205, width:Screen.width*0.5,height:Screen.height*0.25, alignSelf: 'center',justifyContent:'center' }}>
                                    <Text style={{color:'#67308F', fontSize:36, fontWeight:'100',textAlign:'center'}}>{play}</Text>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setstart(false)
                            setreset(true)
                            setplayed(false)
                            setPlay('START')
                            KeepAwake.deactivate()
                        }}>
                            <Image source={images.reset} style={{ width: Screen.width * 0.5, height: Screen.width * 0.18, alignSelf: 'center', marginVertical: Screen.width * 0.1 }} resizeMode='contain' />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            <OverlayBerhitung visible={visible} toggleOverlay={toggleOverlay} music={music} setMusic={setMusic} pemandu={pemandu} setPemandu={setPemandu} listMusic={listMusic} playSound={playSound} MusicRequest={MusicRequest} token={token.data.access_token} playlistMusic={playlistMusic}/>
            <KeepAwake />
            <Overlay visible={statusLoad}>
                <ActivityIndicator size='large' color='#67308F' />
            </Overlay>
        </TemplateBackground>
    )
}


const mapStateToProps = (state) => {
    return {
      dataMusic: state.music.payload,
      token: state.token.payload,
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(MusicRedux,TokenRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(BerhitungYuk)

const options = {
    container: {
    //   backgroundColor: '#000',
      padding: 5,
      borderRadius: 5,
      marginVertical: Screen.height * 0.05 
    //   width: 220,
    },
    text: {
      fontSize: 100,
      color: '#67308F',
      marginLeft: 7,
      textAlign: 'center'
    }
  };