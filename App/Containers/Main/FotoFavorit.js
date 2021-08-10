import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, ActivityIndicator, LogBox, Platform } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux';
import Share from 'react-native-share';
import BottomSheet from 'reanimated-bottom-sheet';
import { FAB, Overlay } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";
//redux
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import GalleryRedux from '../../Redux/FotoFav/GalleryRedux'
import AddFotoRedux from '../../Redux/FotoFav/AddFotoRedux'
import DeleteFotoRedux from '../../Redux/FotoFav/DeleteFotoRedux'
import AlbumRedux from '../../Redux/FotoFav/AlbumRedux'
import AddAlbumRedux from '../../Redux/FotoFav/AddAlbumRedux'
import UpdateAlbumRedux from '../../Redux/FotoFav/UpdateAlbumRedux'
import UploadPhotoAlbumRedux from '../../Redux/FotoFav/UploadPhotoAlbumRedux'
import DeleteAlbumRedux from '../../Redux/FotoFav/DeleteAlbumRedux'

import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { Alert } from 'react-native';
import { HeaderFoto, MenuFoto, ListFoto, DetailFoto} from './Foto/Component';
import { bindActionCreators } from 'redux';
import { Snackbar } from 'react-native-paper';

function FotoFavorit(props) {
    const sheetRef = React.useRef(null);
    const { 
      navigation,token,gallery,GalleryRequest,GallerySuccess,uploadfoto,AddfotoRequest,galleryfetching,AddfotoSuccess,
      DeletefotoRequest,DeletefotoSuccess,deletedFoto,album ,AlbumRequest, AddAlbumRequest, AddAlbumSuccess,addalbum,
      UploadAlbumRequest, updateAlbum,DeleteAlbumRequest,deletealbum,DeleteAlbumSuccess } = props
    const { pop, navigate } = navigation
    const [listFoto, setlistFoto] = useState([])
    const [responseFoto, setresponseFoto] = useState([])
    const [listGaleri, setlisrGaleri] = useState([])
    const [response, setResponse] = useState(null);
    const [visible, setVisible] = useState(false)
    const [visibleBottomSheet, setvisibleBottomSheet] = useState(false)
    const [isGaleri, setisGaleri] = useState(true)
    const [onPicked, setonPicked]=useState([])
    const [willDelete, setwillDelete] =useState(false)
    const [loading, setloading]= useState(false)
    const [visibleDetailFoto, setvisibleDetailFoto]=useState(false)
    const [selectedDetailFoto,setselectedDetailFoto]=useState(null)
    const [addToAlbum, setaddToAlbum] = useState(false)
    const [createNewAlbum, setcreateNewAlbum] = useState(false)
    const [nameNewAlbum, setnameNewAlbum] = useState()

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
        AlbumRequest(payload)
      }, 1000);
     
      // return () => {
      //   cleanup
      // }
    }, [])

    useEffect(() => {
      if(gallery && gallery.data){
        console.log('galeri', gallery)
        const merger =listFoto.concat(gallery.data.rows.data)
        setlistFoto(merger)
        setloading(false)
        setresponseFoto(gallery)
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
        AlbumRequest(payload)
        AddfotoSuccess(null)
        setcreateNewAlbum(false)
        setaddToAlbum(false)
        setvisibleDetailFoto(false)
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
        const payload ={
          'token':token && token.data.access_token,
          'page':1
        }
        AlbumRequest(payload)
      }
    }, [deletedFoto])

    useEffect(() => {
      if(album && album.data && album.data.rows){
        // console.log('album',album.data.rows[21].col_highlight)
        setlisrGaleri(album.data.rows)
      }
      
    }, [album])

    useEffect(()=>{
      if(addalbum){
        // const foto = new FormData()
          
        // foto.append('photo',{
        //   name: selectedDetailFoto.photo.name,
        //   uri: selectedDetailFoto.photo.uri,
        //   type:"image/jpg"
        // })
        // foto.append('id_user_gallery_album',addalbum.data.id)
        // console.log(foto)
        // // console.log(params)
        setcreateNewAlbum(false)
        setaddToAlbum(false)
        setvisibleDetailFoto(false)
        showMessage({
          message: "Add album Success",
          type: "info",
        });
        const payload ={
          'token':token && token.data.access_token,
          'body':{
            'id_user_gallery_album':addalbum.data.id,
            'photos':[{"id":selectedDetailFoto.id}]
          },
        }
        // AddfotoRequest(payload)
        UploadAlbumRequest(payload)
        AddAlbumSuccess(null)
        const payloadRequest ={
          'token':token && token.data.access_token,
          'page':1
        }
        AlbumRequest(payloadRequest)
      }
    },[addalbum])

    useEffect(() => {
     if(updateAlbum){
       console.log('updateAlbum',updateAlbum)
        
     }
    }, [updateAlbum])

    useEffect(() => {
      if(deletealbum && deletealbum.status) {
        DeleteAlbumSuccess(null)
        const payloadRequest ={
          'token':token && token.data.access_token,
          'page':1
        }
        AlbumRequest(payloadRequest)
        
      }
    }, [deletealbum])

    const uploadFoto=(params)=>{
      // console.log(params)
      if(params && !params.errorCode){
        params.assets.map(data =>{
          const foto = new FormData()
          
          foto.append('photo',{
            name: data.fileName,
            uri: data.uri,
            type: data.type
          })
          // console.log(foto._parts[0])
          // console.log(params)
          const payload ={
            'token':token && token.data.access_token,
            'body':foto
          }
          AddfotoRequest(payload)
        })
      }
 
    }

    const uploadFotoToAlbum=(params)=>{
      // console.log(selectedDetailFoto)
          const foto = new FormData()
          
          foto.append('photo',{
            name:selectedDetailFoto.photo.name,
            uri: selectedDetailFoto.photo.url,
            // type: data.type
          })
          foto.append('id_user_gallery_album',params.id)
          // console.log(foto._parts[0])
          console.log(params)
          const payload ={
            'token':token && token.data.access_token,
            'body':foto
          }
          AddfotoRequest(payload)
    }

    const deleteFoto=()=>{
      let foto =[]
      let filter = []
      onPicked.map(data=>{
        foto.push({'id':data.id})
      })
      const payload = {
        'token':token && token.data.access_token,
        'body': {
          'photos':foto
        }}
      listFoto.map(data =>{
        if(!onPicked.includes(data)){
            filter.push(data)
        }
      })
      setlistFoto(filter)
      DeletefotoRequest(payload)
    }
    const deleteDetailFoto=(params)=>{
      let foto =[]
      let filter = []
      foto.push({'id':params.id})
      const payload = {
        'token':token && token.data.access_token,
        'body': {
          'photos':foto
        }}
      listFoto.map(data =>{
        if(data.id !== params.id){
            filter.push(data)
        }
      })
      setlistFoto(filter)
      DeletefotoRequest(payload)
    }
    const AddNewAlbum =()=>{
      const payload = {
        'token':token && token.data.access_token,
        'body': {
          'name':nameNewAlbum
        }}
        if(createNewAlbum){
          setcreateNewAlbum(false)
          AddAlbumRequest(payload)
        }
      
    }
    const deleteAlbum=()=>{
      let filter = []
      const payload = {
        'token':token && token.data.access_token,
        'idAlbum': onPicked[0].id
      }
      console.log('payload',payload)
      DeleteAlbumRequest(payload)
      
      // listGaleri.map(data =>{
      //   if(!onPicked.includes(data)){
      //       filter.push(data)
      //   }
      // })
      // setlisrGaleri(filter)
    }
    const renderContent = () => {
      if(willDelete){
        return(
          <View
            style={{
              backgroundColor: 'white',
              padding: 16,
              height: 300,
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'flex-start'
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
                if(isGaleri){
                  deleteFoto()
                }else{
                  deleteAlbum()
                }
                
              }} style={{width:'100%',alignItems:'center'}}>
                <Text 
                  style={{color:'red',borderWidth:1, borderColor:'red',borderRadius:20,padding:12,width:'90%',textAlign:'center',marginBottom:12}}>Hapus Item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setwillDelete(false)} style={{width:'100%',alignItems:'center'}}>
              <Text 
                style={{color:'rgba(103, 48, 143, 1)',borderWidth:1, borderColor:'rgba(103, 48, 143, 1)',borderRadius:20,padding:12,width:'90%',textAlign:'center',marginBottom:12}}>Batal</Text>
            </TouchableOpacity>
          </View>
        )
      }
      if(!willDelete){
        return(
          <View
            style={{
              backgroundColor: 'white',
              padding: 16,
              paddingTop:24,
              height: Screen.height*0.1,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'flex-start'
            }}
          >
            {
              isGaleri?
              <TouchableOpacity onPress={()=>
                {
                  let dataforshare= []
                  onPicked.map(img=>{
                    dataforshare.push(img.photo.url)
                  })
                  const shareOptions = {
                    title: 'Share file',
                        urls:dataforshare,
                      };
    
                    Share.open(shareOptions)
                }}>
                <Image
                  source={images.share} 
                  style={{ width: Screen.width * 0.08, height: Screen.width * 0.08}} 
                  resizeMode={'stretch'} 
                  PlaceholderContent={<ActivityIndicator color={'#67308F'} size='large' />}
                />
                </TouchableOpacity>:null
            }
           
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
            <HeaderFoto isEmpty={true} loading={true} pop={pop} setvisibleBottomSheet={setvisibleBottomSheet} visibleBottomSheet={visibleBottomSheet} setonPicked={setonPicked}/>
          </View>
      </TemplateBackground>
      )
    }
    return (
        <TemplateBackground cover={true}>
            <View style={[styles.mainContainer]}>
                <View style={{height:'20%'}}>
                    {/* <MenuFoto setisGaleri={setisGaleri} isGaleri={isGaleri}/> */}
                    {
                      (!galleryfetching || !loading) &&
                      <HeaderFoto 
                      isEmpty={isGaleri?listFoto.length>0?false:true:listGaleri.length>0?false:true}  
                      pop={pop} 
                      setisGaleri={setisGaleri} 
                      isGaleri={isGaleri} 
                      setvisibleBottomSheet={setvisibleBottomSheet} 
                      visibleBottomSheet={visibleBottomSheet} 
                      setonPicked={setonPicked}
                      listFoto={listFoto}
                      />
                    }
                    
                </View>
                <ListFoto 
                  listFoto={listFoto} 
                  isGaleri={isGaleri} 
                  listGaleri={listGaleri} 
                  album={album}
                  gallery={responseFoto && responseFoto.data && responseFoto.data.rows} 
                  GalleryRequest={GalleryRequest} 
                  AlbumRequest={AlbumRequest}
                  token={token}
                  onPicked={onPicked}
                  setonPicked={setonPicked}
                  setvisibleBottomSheet={setvisibleBottomSheet}
                  setvisibleDetailFoto={setvisibleDetailFoto}
                  visibleBottomSheet={visibleBottomSheet}
                  setselectedDetailFoto={setselectedDetailFoto}
                  navigate={navigate}
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
              visibleBottomSheet && onPicked.length>0 &&<BottomSheet
              ref={sheetRef}
              snapPoints={[willDelete?Platform.OS==='ios'?375:400:Platform.OS==='ios'?275:300,0,0]}
              borderRadius={10}
              renderContent={renderContent}
              enabledContentGestureInteraction={true}
              enabledContentTapInteraction={true}
              onCloseEnd={()=> {
                setonPicked([])
                setvisibleBottomSheet(false)
              }}
            />
            }
            <Overlay visible={visible} onBackdropPress={()=> setVisible(false)} overlayStyle={{width:Screen.width*0.8, borderRadius:12,paddingBottom:-12,backgroundColor:'rgba(255, 255, 255, 0)'}} transparent={true}>
                {actions.map(({title, type, options}) => {
                  console.log(title)
                  // if(color){
                  //   return
                  // }
                    return (
                    <View style={{ borderBottomColor:'rgba(212, 212, 212, 1)', borderBottomWidth:1,width:Screen.width*0.8,marginLeft:-10,backgroundColor:'white',borderTopRightRadius:type=='library'?0:8,borderTopLeftRadius:type=='library'?0:8, borderBottomLeftRadius:type=='library'?8:0, borderBottomRightRadius:type=='library'?8:0}}>
                        <TouchableOpacity onPress={() => onButtonPress(type, options)}>
                            <Text style={{color:"rgba(0, 83, 220, 1)", fontSize:14, textAlign:'center',padding:12,paddingBottom:12,width:Screen.width*0.8}}>{title}</Text>
                        </TouchableOpacity> 
                    </View>
                    );
                })}
                <View style={{ width:Screen.width*0.8,marginLeft:-10,backgroundColor:'rgba(102, 45, 145, 0.85)',marginTop:24,borderRadius:24}}>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                      <Text style={{color:'white', fontSize:14, textAlign:'center',padding:12,paddingBottom:12,width:Screen.width*0.8}}>{'Batal'}</Text>
                  </TouchableOpacity> 
                </View>
            </Overlay>
            <DetailFoto 
              visibleDetailFoto={visibleDetailFoto} 
              setvisibleDetailFoto={setvisibleDetailFoto} 
              selectedDetailFoto={selectedDetailFoto} 
              deleteDetailFoto={deleteDetailFoto}
              addToAlbum={addToAlbum}
              listGaleri={listGaleri}
              setaddToAlbum={setaddToAlbum}
              createNewAlbum={createNewAlbum}
              setcreateNewAlbum={setcreateNewAlbum}
              nameNewAlbum={nameNewAlbum}
              setnameNewAlbum={setnameNewAlbum}
              AddNewAlbum={AddNewAlbum}
              uploadFotoToAlbum={uploadFotoToAlbum}
              />
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
    deletedFoto:state.deleteFoto.payload,
    album:state.album.payload,
    addalbum:state.addalbum.payload,
    updateAlbum:state.updateAlbum.payload,
    deletealbum: state.deletealbum.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux,GalleryRedux,AddFotoRedux,DeleteFotoRedux,AlbumRedux,AddAlbumRedux,UpdateAlbumRedux,UploadPhotoAlbumRedux,DeleteAlbumRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FotoFavorit)

export interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
  }
  
export const actions: Action[] = [
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
    // {
    //   title: 'Batal',
    //   type: 'Close',
    //   color:'white'
    // },
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