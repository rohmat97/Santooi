import React, { useState, useEffect } from 'react'
import {Image, View} from 'react-native'
import { connect } from 'react-redux'
import { CustomBottomTab } from '../../Components/CustomButtomTab'
import { TemplateBackground } from '../../Components/TemplateBackground'
//redux 
import EmoticonRedux from '../../Redux/Dashboard/EmoticonRedux'
import UpdateStatusRedux from '../../Redux/Dashboard/UpdateStatusRedux'
import TokenRedux from '../../Redux/Authentication/TokenRedux'
import StatusRedux from '../../Redux/Dashboard/StatusRedux'
// Styles
import styles from '../Styles/LaunchScreenStyles'
import { OverlayHomepage } from '../../Components/OverlayHomepage';
import { bindActionCreators } from 'redux';
import { Dashboard } from './Dashboard'
import AccountScreen from '../Account/AccountScreen'

function MainScreen (props) {
  const { EmoticonRequest, emoticon, token,navigation, status,UpdateStatusRequest,StatusRequest } = props
  const { navigate } = navigation
  const [visible, setVisible] = useState(false);
  const [quote, setquote]= useState('')
  const [listEmoticon, setlistEmoticon] = useState([])
  const [picked, setpicked] = useState([])
  const [ImageProfile, setImageProfile] = useState()
  const [tab,settab] = useState(0)
  const toggleOverlay = (payload) => {
    if(payload){
      let pickedEmoticon =[]
      picked && picked.map(data =>{
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
      setVisible(!visible);
      UpdateStatusRequest(param)
      // console.log('param',param)
    }else{
      setVisible(!visible);
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

  useEffect(()=>{
    StatusRequest({
      "id":token.data.user.id,
      "token":token.data.access_token
    })
    EmoticonRequest(token.data.access_token)
    setImageProfile(token.data.user.photo && token.data.user.photo.url)
  },[])
  // useEffect(()=>{
  //   if(token){
  //     // console.log('token',token.data.user.photo)
  //     console.log('token',token) 
  //   }
  // },[token])
  
  useEffect(()=>{
    if(emoticon && emoticon.data && emoticon.data.rows){
      // console.log('emoticon',emoticon.data.rows)
      setlistEmoticon(emoticon.data.rows)
    }
  },[emoticon])

  
  useEffect(()=>{
    if(status){
      // console.log('status',status.emoticons)
      setquote(status.status)
      setpicked(status.emoticons)
    }
    // 
  },[status])
  
    return (
      <TemplateBackground cover={true}>
        <View style={styles.mainContainer}>
            {
              tab === 0?
                <Dashboard ImageProfile={ImageProfile} token={token} styles={styles} picked={picked} toggleOverlay={toggleOverlay} navigate={navigate} quote={quote}/> :
                tab === 1 ?
                <Dashboard ImageProfile={ImageProfile} token={token} styles={styles} picked={picked} toggleOverlay={toggleOverlay} navigate={navigate} quote={quote}/>  :
                  tab === 2? 
                  <AccountScreen props={props} /> :
                  null
            }
            
            <CustomBottomTab tab={tab} settab={settab}/>
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