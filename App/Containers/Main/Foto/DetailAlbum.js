import React, { useState, useEffect } from 'react'
import { View, FlatList,TouchableOpacity, Text, ActivityIndicator, TextInput } from 'react-native'
import { Image, Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import images from '../../../Themes/Images'
import { TemplateBackground } from '../../../Components/TemplateBackground'
import styles from '../../Styles/LaunchScreenStyles'
import BottomSheet from 'reanimated-bottom-sheet';
import Share from 'react-native-share';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//redux
import TokenRedux from '../../../Redux/Authentication/TokenRedux'
import DetailAlbumRedux from '../../../Redux/FotoFav/DetailAlbumRedux'
import UpdateAlbumRedux from '../../../Redux/FotoFav/UpdateAlbumRedux'
import AlbumRedux from '../../../Redux/FotoFav/AlbumRedux'
import DeleteFotoRedux from '../../../Redux/FotoFav/DeleteFotoRedux'
import AddFotoRedux from '../../../Redux/FotoFav/AddFotoRedux'

import { Screen } from '../../../Transforms/Screen'
import { actions } from '../FotoFavorit'
function DetailAlbum(props) {
    const sheetRef = React.useRef(null);
    const {
         navigation,detailAlbum,token,DetailAlbumRequest,DetailAlbumSuccess,updateAlbum, UpdateAlbumRequest,UpdateAlbumSuccess,AlbumRequest,
         DeletefotoRequest, DeletefotoSuccess,deletedFoto,AddfotoRequest,uploadfoto,AddfotoSuccess
     } = props
    const { pop, getParam } = navigation
    const [onPicked, setonPicked]=useState([])
    const [listGaleri, setlisrGaleri] = useState([])
    const [isEdit, setisEdit] = useState(false)
    const [title ,settitle] = useState('')
    const [visibleBottomSheet, setvisibleBottomSheet] = useState(false)
    const [visibleDetailFoto, setvisibleDetailFoto]=useState(false)
    const [selectedDetailFoto,setselectedDetailFoto]=useState(null)
    const [willDelete, setwillDelete] =useState(false)
    const [visible, setVisible] = useState(false)
    const [response, setResponse] = useState(null);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      }
    
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
        listGaleri.map(data =>{
        if(!onPicked.includes(data)){
            filter.push(data)
        }
      })
      setlisrGaleri(filter)
      DeletefotoRequest(payload)
    }
    useEffect(() => {
        setlisrGaleri([])
        // console.log(getParam('params').col_highlight)
        const payload ={
            'token':token && token.data.access_token,
            'page':1,
            'id':getParam('params').id
          }
        DetailAlbumRequest(payload)
        settitle(getParam('params').name)
        // setlisrGaleri(getParam('params').col_highlight)
    }, [])

    useEffect(() => {
        if(detailAlbum){
            // console.log('detailAlbum',detailAlbum.data)
            let merger = listGaleri.concat(detailAlbum.data)
            setlisrGaleri(merger)
            DetailAlbumSuccess(null)
            
        }
    }, [detailAlbum])

    useEffect(() => {
        if(deletedFoto && deletedFoto.status){
          let filter =[]
          listGaleri.map(data=>{
            if(!onPicked.includes(data)){
              filter.push(data)
            }
          })
          setlisrGaleri(filter)
          DeletefotoSuccess(null)
          const payload ={
            'token':token && token.data.access_token,
            'page':1
          } 
          AlbumRequest(payload)
        }
      }, [deletedFoto])

    useEffect(() => {
        if(updateAlbum){
            const payload ={
                'token':token && token.data.access_token,
                'page':1
              } 
            AlbumRequest(payload)
            setisEdit(false)
            UpdateAlbumSuccess(null)
        }
    }, [updateAlbum])

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
          setlisrGaleri([])
          console.log('uploadfoto',uploadfoto)
          // const payload ={
          //   'token':token && token.data.access_token,
          //   'page':1
          // }
          // GalleryRequest(payload)
          const payloadFotoGallery ={
            'token':token && token.data.access_token,
            'page':1,
            'id':getParam('params').id
          }
          DetailAlbumRequest(payloadFotoGallery)
          AddfotoSuccess(null)
        }
      }, [uploadfoto])

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
          foto.append('id_user_gallery_album',getParam('params').id)
          // console.log(foto._parts[0])
          console.log(params)
          const payload ={
            'token':token && token.data.access_token,
            'body':foto
          }
          AddfotoRequest(payload)
        })
      }
 
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
                  deleteFoto()
                  
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
                height: 200,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'flex-start'
              }}
            >
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
                  </TouchableOpacity>
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
    return(
        <TemplateBackground cover={true}>
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30,height:'5%',marginTop:'5%', paddingHorizontal:12}}>
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
                    style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#67308F',padding:4,width:80,borderRadius:12, marginLeft: 15,justifyContent:'center' }}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>{visibleBottomSheet?'Batal':'Pilih'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 30, paddingHorizontal:12}}>
                {
                    isEdit?
                    <TextInput 
                        value={title}
                        onChangeText={settitle}
                        style={{flexDirection: 'row',backgroundColor:'#67308F',minWidth:80,borderRadius:8, marginLeft: 15,textAlign:'center', color:'white', fontWeight: '500', fontSize: 16}}
                        />
                    :
                    <TouchableOpacity
                        onPress={() => {
                            setisEdit(true)
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#67308F',padding:8,minWidth:80,borderRadius:8, marginLeft: 15,justifyContent:'center' }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>{title}</Text>
                    </TouchableOpacity>
                }
                {
                    isEdit && <TouchableOpacity
                    onPress={() => {
                        const payload ={
                            'token':token && token.data.access_token,
                            'idPhoto':getParam('params').id,
                            'body':{
                                'name':title
                            }
                          }
                        UpdateAlbumRequest(payload)
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#67308F',padding:8,borderRadius:8, marginLeft: 15,justifyContent:'center' }}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>OK</Text>
                    </TouchableOpacity>
                }
               
            </View>
            
            <FlatList
                    data={ listGaleri }
                    numColumns={2}
                    // onMomentumScrollEnd={(event)=>{
                    //     // console.log(gallery)
                    //     if (isCloseToBottom(event.nativeEvent)) {
                    //         if(gallery.current_page < gallery.last_page){
                    //             console.log(`page`,gallery.current_page + ' === '+gallery.last_page)
                    //             const payload ={
                    //                 'token':token && token.data.access_token,
                    //                 'page':gallery.current_page+1
                    //               }
                    //               GalleryRequest(payload)
                    //         }else{
                    //             console.log(`page`,gallery.current_page + ' === '+gallery.last_page)
                    //         }
                    //         // }
                            
                    //     }
                    // }}
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
                                            resizeMode={'contain'} 
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
                {
                !visibleBottomSheet && <View style={{bottom:0,left:Screen.width*0.45,width:Screen.width, paddingVertical:20}}>
                    <TouchableOpacity onPress={()=> setVisible(true)}>
                        <Image source={images.addFill} style={{width:52,height:52}} resizeMode='contain' />
                    </TouchableOpacity>
                  </View>
                }
                <Overlay visible={visible} onBackdropPress={()=> setVisible(false)} overlayStyle={{width:Screen.width*0.8, borderRadius:12,paddingBottom:-12}}>
                    {actions.map(({title, type, options,color}) => {
                        return (
                        <View style={{ borderBottomColor:'rgba(212, 212, 212, 1)', borderBottomWidth:color?0:1,width:Screen.width*0.8,marginLeft:-10,backgroundColor:color?'rgba(102, 45, 145, 0.85)':''}}>
                            <TouchableOpacity onPress={() => onButtonPress(type, options)}>
                                <Text style={{color:color?color:"rgba(0, 83, 220, 1)", fontSize:14, textAlign:'center',padding:12,paddingBottom:12,width:Screen.width*0.8}}>{title}</Text>
                            </TouchableOpacity> 
                        </View>
                        );
                    })}
                </Overlay>
    </View>
    {
              visibleBottomSheet &&<BottomSheet
              ref={sheetRef}
              snapPoints={[willDelete?Platform.OS==='ios'?375:400:Platform.OS==='ios'?275:325,0,0]}
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
    </TemplateBackground>
)}


const mapStateToProps = (state) => {
    return {
      token: state.token.payload,
      detailAlbum: state.detailAlbum.payload,
      updateAlbum: state.updateAlbum.payload,
      album: state.album.payload,
      uploadfoto:state.addFoto.payload,
      deletedFoto:state.deleteFoto.payload
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(TokenRedux,DetailAlbumRedux,UpdateAlbumRedux,AlbumRedux,DeleteFotoRedux,AddFotoRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(DetailAlbum)