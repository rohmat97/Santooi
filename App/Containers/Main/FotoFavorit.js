import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux';
import { FAB, Overlay } from 'react-native-elements';
//redux
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import GalleryRedux from '../../Redux/FotoFav/GalleryRedux'
import AddFotoRedux from '../../Redux/FotoFav/AddFotoRedux'

import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { Alert } from 'react-native';
import { HeaderFoto, MenuFoto, ListFoto } from './Foto/Component';
import { bindActionCreators } from 'redux';

function FotoFavorit(props) {
    const { navigation,token,gallery,GalleryRequest,uploadfoto,AddfotoRequest,galleryfetching,AddfotoSuccess } = props
    const { pop } = navigation
    const [listFoto, setlistFoto] = useState([])
    const [listGaleri, setlisrGaleri] = useState([{},{},{},{},{}])
    const [response, setResponse] = useState(null);
    const [visible, setVisible] = useState(false)
    const [isGaleri, setisGaleri] = useState(true)
    const [onPicked, setonPicked]=useState([])
    const onButtonPress = React.useCallback((type, options) => {
      // console.log(options,type)
        if (type === 'capture') {
          launchCamera(options, setResponse);
          // setVisible(false)
        }  else if(type ==='library'){
          launchImageLibrary(options, setResponse);
          // setVisible(false)
        }else{
          setVisible(false)
        }
      }, []);

    useEffect(() => {
      const payload ={
        'token':token && token.data.access_token,
        'page':1
      }
      setlistFoto([])
      GalleryRequest(payload)
      // return () => {
      //   cleanup
      // }
    }, [])

    useEffect(() => {
      if(gallery && gallery.data){
        // console.log(gallery.data.rows.data)
        const merger =[...listFoto, ...gallery.data.rows.data]
        setlistFoto(merger)
      }
     
    }, [gallery])

    useEffect(() => {
      // console.log('response',response)
      if(response){
        // console.log(response.assets[0].uri)
        if(response.didCancel){

        }else{
          uploadFoto(response)
          setResponse(null)
          setVisible(false)
        }
      }
    }, [response])

    useEffect(() => {
      if(uploadfoto){
        setlistFoto([])
        console.log('uploadfoto',uploadfoto)
        const payload ={
          'token':token && token.data.access_token,
          'page':1
        }
        GalleryRequest(payload)
        AddfotoSuccess(null)
      }
    }, [uploadfoto])

    useEffect(() => {
      console.log('onPicked',onPicked)
    }, [onPicked])

    const uploadFoto=(params)=>{
      console.log(params)
      if(params && !params.errorCode){
        const foto = new FormData()
        foto.append('photo',{
          name: params.assets[0].fileName,
          uri:params.assets[0].uri,
          type: params.assets[0].type
        })
        // console.log(params)
        const payload ={
          'token':token && token.data.access_token,
          'body':foto
        }
        AddfotoRequest(payload)
      }
 
    }
    if(galleryfetching && isGaleri && listFoto.length<1){
      return(
        <TemplateBackground cover={true}>
          <View style={styles.mainContainer}>
            <HeaderFoto isEmpty={true} loading={true} pop={pop}/>
          </View>
      </TemplateBackground>
      )
    }
    if(!galleryfetching&&listFoto.length<1){
        return(
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <HeaderFoto isEmpty={true} pop={pop}/>
            </View>
            <Overlay visible={visible} onBackdropPress={()=> setVisible(false)} overlayStyle={{width:Screen.width*0.8, borderRadius:12}}>
                {actions.map(({title, type, options,color}) => {
                    return (
                    <View style={{ borderBottomColor:'rgba(212, 212, 212, 1)', borderBottomWidth:color?0:1,width:Screen.width*0.8,marginLeft:-10}}>
                        <TouchableOpacity onPress={() => onButtonPress(type, options)}>
                            <Text style={{color:color?color:"rgba(0, 83, 220, 1)", fontSize:14, textAlign:'center',padding:12,width:Screen.width*0.8}}>{title}</Text>
                        </TouchableOpacity> 
                    </View>
                    );
                })}
            </Overlay>
            
            <FAB onPress={()=> setVisible(true)} icon={<Image source={images.addFill} style={{width:52,height:52}} resizeMode='contain' />} iconPosition='bottom' style={{paddingBottom:12}}/>
        </TemplateBackground>
        )
        
    }
    return (
        <TemplateBackground cover={true}>
            <View style={[styles.mainContainer]}>
                <View style={{height:undefined, paddingHorizontal:12, paddingTop:12}}>
                    <HeaderFoto isEmpty={false}  pop={pop}/>
                    <MenuFoto setisGaleri={setisGaleri} isGaleri={isGaleri}/>
                </View>
                <ListFoto 
                  listFoto={listFoto} 
                  isGaleri={isGaleri} 
                  listGaleri={listGaleri} 
                  gallery={gallery&& gallery.data&& gallery.data.rows} 
                  GalleryRequest={GalleryRequest} 
                  token={token}
                  onPicked={onPicked}
                  setonPicked={setonPicked}
                  />
                <View style={{bottom:0,left:Screen.width*0.45,width:Screen.width, paddingVertical:20}}>
                  <TouchableOpacity onPress={()=> setVisible(true)}>
                      <Image source={images.addFill} style={{width:52,height:52}} resizeMode='contain' />
                  </TouchableOpacity>
                </View>
            </View>
            <Overlay visible={visible} onBackdropPress={()=> setVisible(false)} overlayStyle={{width:Screen.width*0.8, borderRadius:12}}>
                {actions.map(({title, type, options,color}) => {
                    return (
                    <View style={{ borderBottomColor:'rgba(212, 212, 212, 1)', borderBottomWidth:color?0:1,width:Screen.width*0.8,marginLeft:-10}}>
                        <TouchableOpacity onPress={() => onButtonPress(type, options)}>
                            <Text style={{color:color?color:"rgba(0, 83, 220, 1)", fontSize:14, textAlign:'center',padding:12,width:Screen.width*0.8}}>{title}</Text>
                        </TouchableOpacity> 
                    </View>
                    );
                })}
            </Overlay>
        </TemplateBackground>
    )
}
const mapStateToProps = (state) => {
  // console.log('state',state.addFoto)
  return {
    token: state.token.payload,
    gallery: state.gallery.payload,
    galleryfetching: state.gallery.fetching,
    uploadfoto:state.addFoto.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux,GalleryRedux,AddFotoRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FotoFavorit)

interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
  }
  
  const actions: Action[] = [
    {
      title: 'Ambil Foto',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
    },
    {
      title: 'Pilih Foto',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
      },
    },
    {
      title: 'Hapus Foto',
      type: 'Close',
      color:'red'
    },
    // {
    //   title: 'Take Video',
    //   type: 'capture',
    //   options: {
    //     saveToPhotos: true,
    //     mediaType: 'video',
    //   },
    // },
    // {
    //   title: 'Select Video',
    //   type: 'library',
    //   options: {
    //     selectionLimit: 0,
    //     mediaType: 'video',
    //   },
    // },
    // {
    //   title: `Select Image or Video\n(mixed)`,
    //   type: 'library',
    //   options: {
    //     selectionLimit: 0,
    //     mediaType: 'mixed',
    //   },
    // },
  ];