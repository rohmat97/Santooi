import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, ImageBackground, TextInput } from 'react-native'
import { Avatar } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { CustomBottomTab } from '../../Components/CustomButtomTab'
import { TemplateBackground } from '../../Components/TemplateBackground'
import { ContentHome } from '../../Components/ContentHome'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import { Colors } from '../../Themes'
import images from '../../Themes/Images';
import { OverlayHomepage } from '../../Components/OverlayHomepage';
import { TouchableOpacity } from 'react-native-gesture-handler';

function MainScreen (props) {
  const [visible, setVisible] = useState(false);
  const [quote, setquote]= useState('')
  const [categoryData] = useState([{gambar:'http://1.bp.blogspot.com/-h9c_h58CPLQ/VBgtbFj9EUI/AAAAAAAAAck/uU5QRi275uI/s1600/emoticon.png', category:'Smile 1' },{gambar:'http://1.bp.blogspot.com/-h9c_h58CPLQ/VBgtbFj9EUI/AAAAAAAAAck/uU5QRi275uI/s1600/emoticon.png', category:'Smile 2' },{gambar:'http://1.bp.blogspot.com/-h9c_h58CPLQ/VBgtbFj9EUI/AAAAAAAAAck/uU5QRi275uI/s1600/emoticon.png', category:'Smile 3' },{gambar:'http://1.bp.blogspot.com/-h9c_h58CPLQ/VBgtbFj9EUI/AAAAAAAAAck/uU5QRi275uI/s1600/emoticon.png', category:'Smile 4' },{gambar:'http://1.bp.blogspot.com/-h9c_h58CPLQ/VBgtbFj9EUI/AAAAAAAAAck/uU5QRi275uI/s1600/emoticon.png', category:'Smile 5' },{gambar:'http://1.bp.blogspot.com/-h9c_h58CPLQ/VBgtbFj9EUI/AAAAAAAAAck/uU5QRi275uI/s1600/emoticon.png', category:'Smile 6' }])
  const [PickedEmoticon,setPickedEmoticon] = useState([])
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(()=>{
    console.log(PickedEmoticon)
  },[PickedEmoticon])
    return (
      <TemplateBackground cover={true}>
        <View style={styles.mainContainer}>
            <ScrollView>
              <View style={styles.section} >
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
                    title="M"
                    source={{
                      uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
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
                  <Text>Hi, Mario!</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                  <TouchableOpacity onPress={toggleOverlay}>
                    <View
                      style={{borderWidth:1, height:Screen.height*0.15, width:Screen.width*0.9, marginBottom:Screen.height*0.1, borderRadius:20, alignItems:'center',justifyContent:'center', backgroundColor:'white',borderColor:Colors.transparent}}>
                      <Text>{quote?quote:'Bagaimana Perasaanmu Hari ini'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#67308F',width:Screen.width*0.35, alignItems:'center', borderRadius:100, padding:Screen.width*0.02,marginVertical:-Screen.height*0.025}}>
                  <Text style={{color:'white'}}>Kendalikan Yuk!</Text>
                </View>
                <ContentHome />
              </View>
              {
                //Space
              }
              <View style={{height:Screen.height*0.2}}/>
            </ScrollView>
                <CustomBottomTab />
        </View>
        <OverlayHomepage visible ={visible} toggleOverlay={toggleOverlay} setquote={setquote} quote={quote} categoryData={categoryData} PickedEmoticon={PickedEmoticon} setPickedEmoticon={setPickedEmoticon} />
      </TemplateBackground>
    )
}

// const mapStateToProps = (state) => {
//   return {
//     data: state.local.payload
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Object.assign(DataLocalRedux), dispatch)
// }
// export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
export default connect(null,null)(MainScreen)