import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity,ImageBackground } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import { connect } from 'react-redux';
//redux
import MusicRedux from '../../Redux/Berhitung/MusicRedux';
import TokenRedux from '../../Redux/Authentication/TokenRedux'

import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { OverlayBerhitung } from '../../Components/OverlayBerhitung';
import { bindActionCreators } from 'redux';

function BerhitungYuk(props) {
    const { navigation, dataMusic, MusicRequest, token } = props
    const { pop } = navigation
    const [visible, setVisible] = useState(false);
    const [Minute, setMinute] = useState(0);
    const [Second, setSecond] = useState(0);
    const [start, setstart] = useState(false);
    const [reset, setreset] = useState(false);
    const [played, setplayed] = useState(false);
    const [music, setMusic] = useState()
    const [pemandu, setPemandu] = useState('')
    const [duration, setduration] = useState(0)
    const [listMusic, setlistMusic] = useState([])
    const [play, setPlay] = useState('START')
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const timerRef = useRef(null);

    const Start =(payload) =>{
        setstart(payload)
        if(music && payload){
            if(played){
                SoundPlayer.resume()
                console.log('resume')
            }else{
                SoundPlayer.stop()
                setTimeout(() => {
                    setplayed(true)
                    playSound(music.file.url)
                    console.log('play')
                    getInfo()
                }, 500);
            }
        }else{
            console.log('pause')
            setPlay('RESUME')
            SoundPlayer.pause()
        }
    }
    const playSound =(payload,trial)=>{
        if(trial){
            SoundPlayer.stop()
            setTimeout(() => {
                SoundPlayer.playUrl(payload)
                setTimeout(() => {
                    SoundPlayer.stop()
                }, 15000);
            }, 1000);
                // or play from url
          
        }else{
            SoundPlayer.playUrl(payload,(error) => {
                console.log(error)
                if (error) {
                  console.log('failed to load the sound', error);
                  return;
                }
                this.soundPlayer.play()
              })
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
            console.log('finished playing', success)
            // playSound()
          })
          _onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
            console.log('finished loading', success)
          })
          _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
            console.log('finished loading file', success, name, type)
          })
          _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            console.log('finished loading url', success, url)
          })
          return () => {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            _onFinishedPlayingSubscription.remove()
            _onFinishedLoadingSubscription.remove()
            _onFinishedLoadingURLSubscription.remove()
            _onFinishedLoadingFileSubscription.remove()
          };
    },[])
    useEffect(()=>{
        if(start){
            // console.log(Second.charAt(0))
            setPlay('PAUSE')
            timerRef.current = setTimeout(() => {
                if(Second>59){
                    setSecond(0)
                    setMinute(parseInt(Minute)+1)
                }else{
                    if(Second.length>1){
                        setSecond((parseInt(Second)+1).toString())
                    }else{
                    let parsing =(parseInt(Second)+1)
                    setSecond(parsing)
                    }
                }
                if(duration>0){
                    setduration(duration-1)
                }
            }, 1000);
        }else{
            if(reset){
                clearTimeout(timerRef.current)
                setreset(false)
                setSecond(0)
                setMinute(0)
                SoundPlayer.stop()
            }
        }
        
    },[start,reset,Second])

    useEffect(()=>{
        MusicRequest({"token":token.data.access_token})
    },[])
    useEffect(()=>{
        // console.log('music',dataMusic.data)
        if(dataMusic) {
            setlistMusic(dataMusic.data)
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
                        <Text style={{ color: '#67308F', fontSize: 110, textAlign: 'center', marginVertical: Screen.width * 0.13 }} numberOfLines={1}>
                                <Text>{Minute>9?Minute:'0'+Minute}</Text>
                                <Text>:</Text>
                                <Text>{Second>9?Second:'0'+Second }</Text>
                        </Text>
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
                        }}>
                            <Image source={images.reset} style={{ width: Screen.width * 0.5, height: Screen.width * 0.18, alignSelf: 'center', marginVertical: Screen.width * 0.1 }} resizeMode='contain' />
                        </TouchableOpacity>
                        <OverlayBerhitung visible={visible} toggleOverlay={toggleOverlay} music={music} setMusic={setMusic} pemandu={pemandu} setPemandu={setPemandu} listMusic={listMusic} playSound={playSound}/>
                    </ScrollView>
                </View>

            </View>
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