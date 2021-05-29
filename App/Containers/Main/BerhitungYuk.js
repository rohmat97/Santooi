import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import { OverlayBerhitung } from '../../Components/OverlayBerhitung';
import { ImageBackground } from 'react-native';

function BerhitungYuk(props) {
    const { navigation } = props
    const { pop } = navigation
    const [visible, setVisible] = useState(false);
    const [Minute, setMinute] = useState(0);
    const [Second, setSecond] = useState(0);
    const [start, setstart] = useState(false);
    const [reset, setreset] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const timerRef = useRef(null);

    useEffect(()=>{
        // console.log(currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds())
      
          return () => {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
          };
    },[])
    useEffect(()=>{
        if(start){
            // console.log(Second.charAt(0))
            timerRef.current = setTimeout(() => {
                if(Second>59){
                    setSecond('00')
                    setMinute(parseInt(Minute)+1)
                }else{
                    if(Second.length>1){
                        setSecond((parseInt(Second)+1).toString())
                    }else{
                    let parsing =(parseInt(Second)+1)
                    setSecond(parsing)
                    }
                }
            }, 1000);
        }else{
            if(reset){
                clearTimeout(timerRef.current)
                setreset(false)
                setSecond(0)
                setMinute(0)
            }
        }
        
    },[start,reset,Second])

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
                        <Text style={{ color: '#67308F', fontSize: 130, textAlign: 'center', marginVertical: Screen.width * 0.13 }} numberOfLines={1}>
                                <Text>{Minute>9?Minute:'0'+Minute}</Text>
                                <Text>:</Text>
                                <Text>{Second>9?Second:'0'+Second }</Text>
                        </Text>
                        <TouchableOpacity onPress={()=> setstart(!start)}>
                        <View style={{width:Screen.width, alignSelf: 'center',justifyContent:'center'}}>
                            <ImageBackground source={images.start} style={{maxWidth:205, maxHeight:205, width:Screen.width*0.45,height:Screen.height*0.3, alignSelf: 'center',justifyContent:'center' }}>
                            
                                    <Text style={{color:'#67308F', fontSize:39, fontWeight:'100',textAlign:'center'}}>START</Text>
                            </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            setstart(false)
                            setreset(true)
                        }}>
                            <Image source={images.reset} style={{ width: Screen.width * 0.5, height: Screen.width * 0.18, alignSelf: 'center', marginVertical: Screen.width * 0.1 }} resizeMode='contain' />
                        </TouchableOpacity>
                        <OverlayBerhitung visible={visible} toggleOverlay={toggleOverlay} />
                    </ScrollView>
                </View>

            </View>
        </TemplateBackground>
    )
}

export default connect(null, null)(BerhitungYuk)