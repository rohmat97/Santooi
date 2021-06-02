import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, ImageBackground, TextInput } from 'react-native'
import { Avatar } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { CustomBottomTab } from '../../Components/CustomButtomTab'
import { TemplateBackground } from '../../Components/TemplateBackground'
import { ContentHome } from '../../Components/ContentHome'
//redux 
import EmoticonRedux from '../../Redux/Dashboard/EmoticonRedux'
import UpdateStatusRedux from '../../Redux/Dashboard/UpdateStatusRedux'
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import StatusRedux from '../../Redux/Dashboard/StatusRedux'
// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import { Colors } from '../../Themes'
import images from '../../Themes/Images';
import { OverlayHomepage, style } from '../../Components/OverlayHomepage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native';

function MainScreen (props) {
  const { EmoticonRequest, emoticon, token,navigation, status,UpdateStatusRequest,StatusRequest } = props
  const { navigate } = navigation
  const [visible, setVisible] = useState(false);
  const [quote, setquote]= useState('')
  const [listEmoticon, setlistEmoticon] = useState([])
  const [picked, setpicked] = useState([])
  const [ImageProfile, setImageProfile] = useState()
  const toggleOverlay = (payload) => {
    let pickedEmoticon =[]
    picked.map(data =>{
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
    if(payload){
      setVisible(!visible);
      UpdateStatusRequest(param)
      console.log('param',param)
    }else{
      setVisible(!visible);
    }
  };

  const RemovePickedEmotion = (payload) =>{

    console.log('will remove',payload[0].name)
    const check = picked.filter(data => data.name !== payload[0].name)
    // const indexOfTaskToDelete = picked.findIndex(
    //   task => task.name === payload.name
    // );
    setpicked(check)
    console.log('removed',check)
  }

  useEffect(()=>{
    StatusRequest({
      "id":token.data.user.id,
      "token":token.data.access_token
    })
  },[])
  useEffect(()=>{
    if(token){
      EmoticonRequest(token.data.access_token)
      // console.log('token',token.data.user.photo)
      setImageProfile(token.data.user.photo && token.data.user.photo.url)
      console.log('token',token) 
    }
  },[token])
  
  useEffect(()=>{
    if(emoticon && emoticon.data && emoticon.data.rows){
      // console.log('emoticon',emoticon.data.rows.data)
      setlistEmoticon(emoticon.data.rows.data)
    }
  },[emoticon])

  useEffect(()=>{
    // console.log('picker',picked)
  },[picked])
  
  useEffect(()=>{
    if(status){
      console.log('status',status.emoticons)
      setquote(status.status)
      setpicked(status.emoticons)
    }
    // 
  },[status])
  
  const renderItem = ({ item }) => (
    <Image source={{uri:item.image && item.image.url}} style={[style.iconic]} resizeMode='contain'/>
  );
    return (
      <TemplateBackground cover={true}>
        <View style={styles.mainContainer}>
            <ScrollView>
              <View style={[styles.section, {marginBottom:12}]} >
                <View style={{flexDirection:'row',justifyContent:'flex-end', alignItems:'center'}}>
                  <Image source={images.iconNotification} style={{width:30,height:30}} resizeMode='contain' />
                </View>
                <View style={{
                  marginBottom:16,
                  marginLeft:8,
                  flexDirection:'row',
                  alignItems:'center',
                  width:Screen.width*0.5,
                }}>
                  <LinearGradient colors={['#DB068D', '#6F2A91']} style={{borderRadius:100, padding:2, marginRight:8}}>
                  <Avatar
                    rounded
                    size='medium'
                    title={token.data.user.name.charAt(0)}
                    source={{
                      uri:ImageProfile?ImageProfile:'',
                    }}
                    containerStyle={{
                      // marginRight:8,
                      // borderWidth:1,
                      // borderTopColor:'#DB068D',
                      // borderLeftColor:'#DB068D',
                      // borderRightColor:'#6F2A91',
                      // borderBottomColor:'#6F2A91',
                    }}
                  />
                  </LinearGradient>
                  <Text>Hi,{ token.data.user.name}!</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                  <TouchableOpacity onPress={toggleOverlay}>
                    <View
                      style={{borderWidth:1, minHeight:80, width:Screen.width*0.9, marginBottom:Screen.height*0.1, borderRadius:20,paddingBottom:12, alignItems:'flex-start',justifyContent:'center', backgroundColor:'white',borderColor:Colors.transparent}}>
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
                          onPress={toggleOverlay}
                          style={{backgroundColor:'#67308F', flexDirection:'row',alignItems:'center',justifyContent:'center', height:30, borderRadius:16, marginRight:12}}>
                          <Image source={images.editQuote} style={[style.iconDashboard]} resizeMode='contain'/>
                          <Text style={{color:'#fff', marginLeft:-6, paddingRight:12}}>Edit</Text>
                        </TouchableOpacity>
                        </View>
                        :null
                      }
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#67308F',width:Screen.width*0.35, alignItems:'center', borderRadius:100, padding:8,marginTop:-32,marginBottom:-20}}>
                  <Text style={{color:'white'}}>Kendalikan Yuk!</Text>
                </View>
                <ContentHome navigate={navigate}/>
              </View>
              {
                //Space
              }
              <View style={{height:100}}/>
            </ScrollView>
                <CustomBottomTab />
        </View>
        <OverlayHomepage visible ={visible} toggleOverlay={toggleOverlay} setquote={setquote} quote={quote} listEmoticon={listEmoticon} picked={picked} RemovePickedEmotion={RemovePickedEmotion} setpicked ={setpicked}/>
      </TemplateBackground>
    )
}

const mapStateToProps = (state) => {
  return {
    emoticon: state.emoticon.payload,
    token: state.token.payload,
    status: state.status.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(EmoticonRedux,TokenRedux,UpdateStatusRedux,StatusRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
// export default connect(null,null)(MainScreen)