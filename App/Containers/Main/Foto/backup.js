import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, ActivityIndicator, LogBox } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FAB, Overlay } from 'react-native-elements';
//redux
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import GalleryRedux from '../../Redux/FotoFav/GalleryRedux'
import AddFotoRedux from '../../Redux/FotoFav/AddFotoRedux'
import DeleteFotoRedux from '../../Redux/FotoFav/DeleteFotoRedux'

import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { Alert } from 'react-native';
import { HeaderFoto, MenuFoto, ListFoto } from './Foto/Component';
import { bindActionCreators } from 'redux';

function FotoFavorit(props) {
    const sheetRef = React.useRef(null);
    const { navigation,token,gallery,GalleryRequest,GallerySuccess,uploadfoto,AddfotoRequest,galleryfetching,AddfotoSuccess,DeletefotoRequest,DeletefotoSuccess,deletedFoto } = props
    const { pop } = navigation
    const [listFoto, setlistFoto] = useState([])
    const [listGaleri, setlisrGaleri] = useState([{},{},{},{},{}])
    const [response, setResponse] = useState(null);
    const [visible, setVisible] = useState(false)
    const [visibleBottomSheet, setvisibleBottomSheet] = useState(false)
    const [isGaleri, setisGaleri] = useState(true)
    const [onPicked, setonPicked]=useState([])
    const [willDelete, setwillDelete] =useState(false)
    const [loading, setloading]= useState(false)

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
      setloading(true)
      LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
      LogBox.ignoreAllLogs();//Ignore all log notifications
      GallerySuccess(null)
      const payload ={
        'token':token && token.data.access_token,
        'page':1
      }
      setlistFoto([])
      setTimeout(() => {
        GalleryRequest(payload)
      }, 1000);
     
      // return () => {
      //   cleanup
      // }
    }, [])

    useEffect(() => {
      if(gallery && gallery.data){
        const merger =listFoto.concat(gallery.data.rows.data)
        setlistFoto(merger)
        setloading(false)
        GallerySuccess(null)
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
    useEffect(() => {
      if(deletedFoto && deletedFoto.status){
        let filter =[]
        listFoto.map(data=>{
          if(!onPicked.includes(data)){
            filter.push(data)
          }
        })
        setlistFoto(filter)
        DeletefotoSuccess(null)
      }
    }, [deletedFoto])
    const uploadFoto=(params)=>{
      // console.log(params)
      if(params && !params.errorCode){
        const foto = new FormData()
        foto.append('photo',{
          name: params.assets[0].fileName,
          uri:params.assets[0].uri,
          type: params.assets[0].type
        })
        console.log(foto)
        const payload ={
          'token':token && token.data.access_token,
          'body':foto
        }
        AddfotoRequest(payload)
      }
 
    }

    const deleteFoto=()=>{
      let foto =[]
      onPicked.map(data=>{
        foto.push({'id':data.id})
      })
      const payload = {
        'token':token && token.data.access_token,
        'body': {
          'photos':foto
        }}
      DeletefotoRequest(payload)
    }

    const renderContent = () => {
      if(willDelete){
        return(
          <View
            style={{
              backgroundColor: 'white',
              padding: 16,
              height: 250,
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <View style={{flexDirection:'row',alignItems:'center',width:'95%',marginTop:-50,marginBottom:30}}>
              <Image
                source={images.delete_outline} 
                style={{ width: Screen.width * 0.08, height: Screen.width * 0.08}} 
                resizeMode={'stretch'} 
                PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
              />
              <Text>Hapus</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                setwillDelete(false)
                setonPicked([])
                setvisibleBottomSheet(false)
                deleteFoto()
              }} style={{width:'100%',alignItems:'center'}}>
                <Text 
                  style={{color:'red',borderWidth:1, borderColor:'red',borderRadius:20,padding:12,width:'90%',textAlign:'center',marginBottom:12}}>Hapus Item</Text>
            </TouchableOpacity>
            
            <Text 
              onPress={()=>setwillDelete(false)}
              style={{color:'rgba(103, 48, 143, 1)',borderWidth:1, borderColor:'rgba(103, 48, 143, 1)',borderRadius:20,padding:12,width:'90%',textAlign:'center',marginBottom:12}}>Batal</Text>
          </View>
        )
      }
      if(!willDelete){
        return(
          <View
            style={{
              backgroundColor: 'white',
              padding: 16,
              height: 125,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <Image
              source={images.share} 
              style={{ width: Screen.width * 0.08, height: Screen.width * 0.08}} 
              resizeMode={'stretch'} 
              PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
            />
            <Text style={{fontSize:16, marginHorizontal:Screen.width*0.25}}>Pilih Item</Text>
            <TouchableOpacity onPress={()=>setwillDelete(true)}>
              <Image
                source={images.delete_outline} 
                style={{ width: Screen.width * 0.08, height: Screen.width * 0.08}} 
                resizeMode={'stretch'} 
                PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
              />
            </TouchableOpacity>
          </View>
        )
      }
      };

    if(galleryfetching && isGaleri && listFoto.length<1 || loading){
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
                  setvisibleBottomSheet={setvisibleBottomSheet}
                  />
                {
                  !visibleBottomSheet && <View style={{bottom:0,left:Screen.width*0.45,width:Screen.width, paddingVertical:20}}>
                    <TouchableOpacity onPress={()=> setVisible(true)}>
                        <Image source={images.addFill} style={{width:52,height:52}} resizeMode='contain' />
                    </TouchableOpacity>
                  </View>
                }
                
            </View>
            {
              visibleBottomSheet &&<BottomSheet
              ref={sheetRef}
              snapPoints={[willDelete?340:290, 290,0]}
              borderRadius={10}
              renderContent={renderContent}
              onCloseEnd={()=> {
                setonPicked([])
                setvisibleBottomSheet(false)
              }}
            />
            }
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
    uploadfoto:state.addFoto.payload,
    deletedFoto:state.deleteFoto.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux,GalleryRedux,AddFotoRedux,DeleteFotoRedux), dispatch)
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