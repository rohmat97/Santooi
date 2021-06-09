import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, FlatList,Share } from 'react-native'
import { OverlayHomepage, style } from '../../Components/OverlayHomepage';
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import { CheckBox, Overlay } from 'react-native-elements';
import { bindActionCreators } from 'redux';
//redux
import KalimatBijakRedux from '../../Redux/KalimatBijak/KalimatBijakRedux';
import AddFavoriteRedux from '../../Redux/KalimatBijak/AddFavoriteRedux';
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import StatusRedux from '../../Redux/Dashboard/StatusRedux'
import UpdateStatusRedux from '../../Redux/Dashboard/UpdateStatusRedux'
import EmoticonRedux from '../../Redux/Dashboard/EmoticonRedux'
import { ActivityIndicator } from 'react-native';

function KalimatBijak(props) {
    const { navigation, token, listKalimatBijak, KalimatBijakRequest,addFavorite, addFavoriteRequest,status,UpdateStatusRequest,emoticon,StatusRequest,kalimatfetching } = props
    const { pop } = navigation
    const [visible, setvisible] = useState(false)
    const [filter, setfilter] = useState()
    const [filterByLatest, setfilterByLatest] = useState(false)
    const [filterByFavorite, setfilterByFavorite] = useState(false)
    const [listKalimat, setlistKalimat] =useState([])
    const [picked, setpicked] = useState([])
    const [quote, setquote]= useState('')
    const [visibleStatus, setVisibleStatus] = useState(false);
    const [onfetch, setonfetch] = useState(false);
    const [listEmoticon, setlistEmoticon] = useState([])
    const [manualPicked, setmanualPicked] = useState([])

    let page =1
    useEffect(()=>{
        StatusRequest({
            "id":token.data.user.id,
            "token":token.data.access_token
          })
        const payload= {
            "fav":filterByFavorite,
            "filter":filterByLatest?'DESC':'ASC',
            "token":token.data.access_token,
            "page":1
        }
        KalimatBijakRequest(payload)
        if(emoticon && emoticon.data && emoticon.data.rows){
            // console.log('emoticon',emoticon.data.rows)
            setlistEmoticon(emoticon.data.rows)
        }
        return () => {
            // console.log('awadaw')
            StatusRequest({
                "id":token.data.user.id,
                "token":token.data.access_token
              })
        }
    },[])

    useEffect(()=>{
        if(status){
          // console.log('status',status.emoticons)
          setquote(status.status)
          setpicked(status.emoticons)
        }
        // 
      },[status])
    useEffect(()=>{
        if(listKalimatBijak){
            // console.log(`page`,listKalimatBijak.current_page + ' === '+listKalimatBijak.last_page)
            if(listKalimat && listKalimat.length>0){
                if(listKalimat !== listKalimatBijak.data){
                    let newlist = listKalimat.concat(listKalimatBijak.data)
                    // console.log('new data', newlist)
                    setlistKalimat(newlist)
                }
            }else{
                setlistKalimat(listKalimatBijak.data)
            }
            
        }
    },[listKalimatBijak])

    useEffect(() => {
        if(addFavorite){
            console.log(`addFavorite`, addFavorite)
            // const payload= {
            //     "fav":null,
            //     "filter":'ASC',
            //     "token":token.data.access_token
            // }
            // setTimeout(() => {
            //     KalimatBijakRequest(payload)
            // }, 1000);
        }
        // return () => {
        //     cleanup
        // }
    }, [addFavorite])

    useEffect(() => {
            setlistKalimat([])
            const payload= {
                "fav":filterByFavorite?1:0,
                "filter":filterByLatest?'DESC':'ASC',
                "token":token.data.access_token,
                "page":1
            }
            console.log(payload)
            KalimatBijakRequest(payload)
    }, [filterByFavorite])

    useEffect(() => {
        setlistKalimat([])
        const payload= {
            "fav":filterByFavorite?1:0,
            "filter":filterByLatest?'DESC':'ASC',
            "token":token.data.access_token,
            "page":1
        }
        console.log(payload)
        KalimatBijakRequest(payload)
}, [filterByLatest])
    useEffect(() => {
        setonfetch(kalimatfetching)
    }, [kalimatfetching])
    const UpdateFavorite = (payload, param,index) =>{
        if(param ==='add'){
            const data ={
                "body":{
                    id_wise_sentence:payload
                },
                "token":token.data.access_token,
                "param":param
            }
            addFavoriteRequest(data)
        }else{
            const data ={
                "body":payload,
                "token":token.data.access_token,
                "param":param
            }
            addFavoriteRequest(data)
        }
        if(filterByFavorite){
            const payload1= {
                "fav":filterByFavorite?1:0,
                "filter":filterByLatest?'DESC':'ASC',
                "token":token.data.access_token,
                "page":1
            }
            console.log(payload1)
                KalimatBijakRequest(payload1)
                setlistKalimat([])
        }else{
            let updateData = [...listKalimat]
            updateData[index] = {
                "created_at": updateData[index].created_at, 
                "id": updateData[index].id, 
                "is_favorite": !updateData[index].is_favorite, 
                "name": updateData[index].name
            };
            setlistKalimat(updateData)
        }
        

    }

    const onShare = async (payload) => {
        try {
          const result = await Share.share({
            message:payload,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
      const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      }

  const toggleOverlay = (payload) => {
    if(payload){
      let pickedEmoticon =[]
      picked && picked.map(data =>{
        pickedEmoticon.push({"id":data.id})
      })
      manualPicked && manualPicked.map(data=>{
        pickedEmoticon.push({"id":data.id})
      })
      const param = {
        "id":token.data.user.id,
        "body":{
          "emoticons":pickedEmoticon,
          "status":quote
        },
        "token":token.data.access_token
      }
      setVisibleStatus(!visibleStatus);
      UpdateStatusRequest(param)
      console.log('show dpwn')
      // console.log('param',param)
    }else{
      setVisibleStatus(!visibleStatus);
      ValidateTextForEmoticon(quote)
      console.log('show up')
    }
  };

  const RemovePickedEmotion = (payload) =>{

    // console.log('will remove',payload[0].name)
    const check = picked.filter(data => data.name !== payload[0].name)
    // const indexOfTaskToDelete = picked.findIndex(
    //   task => task.name === payload.name
    // );
    setpicked(check)
    // console.log('removed',check)
  }

  const ValidateTextForEmoticon =(text) =>{
    if(text){
        setquote(text)
        const filtertext = text.split(' ')
        const filter =listEmoticon.filter(dat => filtertext.find(text =>{
            // console.log(dat.name.toLowerCase() + ' = ' + text.toLowerCase())
            return dat.name.toLowerCase() === text.toLowerCase()
        }))
        if(filter.length>0){
            // console.log(filter)
            // MapingValidationEmoticonByText(filter)
            setpicked(filter)
            // setpicked(result)
        }else{
            if(picked){
                setpicked([])
            }else{
                setpicked([])
            }
        }
    } 
}
    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={{flex:1}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30,margin:24 }}>
                        <TouchableOpacity
                            onPress={() => pop()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Kalimat Bijak</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            {/* <View style={{minHeight:155, backgroundColor:'#67308F', width:Screen.width*0.9,justifyContent:'center',alignItems:'center'}}>
                                <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12}}>
                                    <View style={{flexDirection:'row',width:80, justifyContent:'space-between', marginBottom:12}}>
                                        <Image source={images.sample1} style={{width:35,height:35}}/>
                                        <Image source={images.sample2} style={{width:35,height:35}}/>
                                    </View>
                                    <Text style={{color:'#662D91',padding:2}}>I hate them!!!</Text>
                                    <TouchableOpacity onPress={()=> Alert.alert('Still on development')}>
                                        <View style={{flexDirection:'row',width:'100%', justifyContent:'flex-end', marginBottom:12}}>
                                            <Image source={images.editButton} style={{width:65,height:25}} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        <TouchableOpacity onPress={()=>toggleOverlay(null)}>
                          <View
                            style={{borderWidth:1, minHeight:80, width:Screen.width*0.9, borderRadius:20,paddingBottom:12, alignItems:'flex-start',justifyContent:'center', backgroundColor:'white',borderColor:Colors.transparent}}>
                            {
                            picked && picked.length>0?
                            <FlatList
                                data={picked}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                contentContainerStyle={{maxWidth:Screen.width*0.875, margin:12}}
                                numColumns={10}
                                
                            />:null
                            }
                            {/* <View style={{flexDirection:'row',maxWidth:Screen.width*0.1,backgroundColor:'red'}}>
                            {
                                picked && picked.length>0?
                                picked && picked.map((data)=>(
                                    <Image source={{uri:data.image && data.image.url}} style={[quote?style.iconDashboard:style.icon]} resizeMode='contain'/>
                                ))
                                :null
                            }
                            </View> */}
                            
                                <Text style={{color:'#662D91', fontStyle:'italic',marginHorizontal:12,marginTop:picked && picked.length>0?12:quote?14:0}}>{quote?quote:'Bagaimana Perasaanmu Hari ini?'}</Text>
                            {
                                picked && picked.length>0 || quote?
                                <View style={{width:'100%', justifyContent:'flex-end', flexDirection:'row', marginTop:24}}>
                                    <TouchableOpacity 
                                    onPress={()=>toggleOverlay(null)}
                                    style={{backgroundColor:'#67308F', flexDirection:'row',alignItems:'center',justifyContent:'center', height:30, borderRadius:16, marginRight:12}}>
                                        <Image source={images.editQuote} style={[style.iconDashboard]} resizeMode='contain'/>
                                        <Text style={{color:'#fff', marginLeft:-6, paddingRight:12}}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                :null
                            }
                            </View>
                            </TouchableOpacity>
                            <View style={{width:'90%', borderTopLeftRadius:12, borderTopRightRadius:12, padding:12,paddingBottom:20, paddingRight:12,marginBottom:-16,marginTop:12, flexDirection:'row', justifyContent:'space-between',alignItems:'center',backgroundColor:'#67308F'}}>
                                <Text style={{color:'white'}}>Kata-kata untuk diingat..</Text>
                                <TouchableOpacity onPress={()=> setvisible(true)}>
                                    <Image source={images.burgerIcon} style={{width:15,height:25}} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                            <ScrollView 
                                onMomentumScrollEnd={(event)=>{
                                if (isCloseToBottom(event.nativeEvent)) {
                                    // LoadMoreRandomData()
                                    if(listKalimatBijak.current_page !== listKalimatBijak.last_page){
                                        // console.log(`page`,listKalimatBijak.current_page + ' === '+listKalimatBijak.last_page)
                                        page +=1
                                        const payload= {
                                            "fav":filterByFavorite,
                                            "filter":filterByLatest?'DESC':'ASC',
                                            "token":token.data.access_token,
                                            "page":page
                                        }
                                        KalimatBijakRequest(payload)
                                    }else{
                                        // console.log(`page`,listKalimatBijak.current_page + ' === '+listKalimatBijak.last_page)
                                    }
                                    
                                  }
                                
                               
                            }}>
                                <View style={{minHeight:155, height:undefined, backgroundColor:'#67308F', width:Screen.width*0.9,justifyContent:'center',alignItems:'center',marginTop:16,paddingBottom:12,paddingTop:16}}>
                                    {
                                    onfetch?
                                        <ActivityIndicator size={32} color='white'/>:
                                        listKalimat &&listKalimat.length>0 ? listKalimat.map((data,index) =>{
                                            // console.log('data kalimat',data) 
                                            if(data){
                                                return(
                                                    <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12,flexDirection:'column',justifyContent:'space-between'}}>
                                                        <Text style={{color:'#662D91',padding:2}} numberOfLines={5}>{data.name}</Text>
                                                        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'flex-end'}}>
                                                            <Text style={{color:'#8B8F93',padding:2, fontSize:12}}>{new Date(data.created_at).getDate() + "/"+ parseInt(new Date(data.created_at).getMonth()+1) +"/"+new Date(data.created_at).getFullYear()}</Text>
                                                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',maxWidth:100,marginBottom:-20}}>
                                                                <CheckBox
                                                                    checkedIcon={ <Image source={images.StarChecked} style={{width:40,height:40}} resizeMode={'contain'}/>}
                                                                    uncheckedIcon={<Image source={images.StarUncheck} style={{width:40,height:40}} resizeMode={'contain'}/>}
                                                                    checked={data.is_favorite}
                                                                    onPress={() => UpdateFavorite(data.id,data.is_favorite?'remove':'add',index)}
                                                                    style={{alignItems:'center',justifyContent:'center'}}
                                                                    />
                                                                <TouchableOpacity 
                                                                onPress={()=> onShare(data.name)}
                                                                >
                                                                    <Image source={images.share} style={{width:35,height:35}} resizeMode={'contain'}/>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    )
                                            }else{
                                                return null
                                            }
                                            
                                        }):
                                        !onfetch &&<Text style={{color:'white',padding:2, fontSize:24}} numberOfLines={5}>Belum ada Favorit</Text>
                                        } 
                                </View>
                            </ScrollView>
                        </View>  
                </View>
            </View>
            <Overlay visible={visible} onBackdropPress={()=> setvisible(false)} overlayStyle={{width:Screen.width, minHeight:100, position:'absolute',bottom:0, borderTopLeftRadius:16, borderTopRightRadius:16}}>
                <View style={{padding:12}}>
                    <Text style={{paddingVertical:16}}>Pilih Berdasarkan</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{setfilterByFavorite(!filterByFavorite)}}>
                        <Text style={{fontWeight:'bold',paddingVertical:12}}>Favorit</Text>
                        </TouchableOpacity>
                        <CheckBox
                            checkedIcon={<Image source={images.checklist} style={{width:20,height:20}} resizeMode='contain'/>}
                            uncheckedIcon={null}
                            checked={filterByFavorite}
                            onPress={() => setfilterByFavorite(!filterByFavorite)}
                        />  
                    </View>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',paddingVertical:12}}>Tanggal Terbaru</Text>
                            <CheckBox
                                checkedIcon={<Image source={images.Checked} style={{width:20,height:20}} resizeMode='contain'/>}
                                uncheckedIcon={<Image source={images.unChecked} style={{width:20,height:20}} resizeMode='contain'/>}
                                checked={filterByLatest?false:true}
                                onPress={() => setfilterByLatest(false)}
                            />  
                        </View>
                    </View>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',paddingVertical:12}}>Tanggal Terlama</Text>
                            <CheckBox
                                checkedIcon={<Image source={images.Checked} style={{width:20,height:20}} resizeMode='contain'/>}
                                uncheckedIcon={<Image source={images.unChecked} style={{width:20,height:20}} resizeMode='contain'/>}
                                checked={filterByLatest?true:false}
                                onPress={() => setfilterByLatest(true)}
                            />  
                        </View>
                    </View>
                </View>
            </Overlay>
            <OverlayHomepage visible={visibleStatus} toggleOverlay={toggleOverlay} setquote={setquote} quote={quote} listEmoticon={listEmoticon} picked={picked} RemovePickedEmotion={RemovePickedEmotion} setpicked ={setpicked}  manualPicked={manualPicked} setmanualPicked={setmanualPicked} ValidateTextForEmoticon={ValidateTextForEmoticon}/>
        </TemplateBackground>
    )
}


const mapStateToProps = (state) => {
    return {
      token: state.token.payload,
      listKalimatBijak: state.kalimatbijak.payload,
      addFavorite: state.addFavorite.payload,
      status: state.status.payload,
      emoticon: state.emoticon.payload,
      kalimatfetching: state.kalimatbijak.fetching
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(KalimatBijakRedux,TokenRedux,AddFavoriteRedux,StatusRedux, UpdateStatusRedux,EmoticonRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(KalimatBijak)


const renderItem = ({ item }) => (
    <Image source={{uri:item.image && item.image.url}} style={[style.iconic]} resizeMode='contain'/>
)