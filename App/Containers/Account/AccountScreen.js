import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { ScrollView, Text, Image, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import images from '../../Themes/Images'
import { Screen } from '../../Transforms/Screen'
//redux
import TokenRedux from '../../Redux/Authentication/TokenRedux';

// Styles
import styles from '../Styles/LaunchScreenStyles'

function AccountScreen ({props}) {
  const { TokenSuccess, navigation, token } = props
  const { navigate } = navigation

  useEffect(() => {
    if(!token){
      navigate('Auth', {
        screen: 'LoginScreen',
        initial: true,
    })
    }
  }, [token])
    return (
        <ScrollView style={styles.container}>
          <View style={[styles.section,{justifyContent:'center'}]} >
            {/* <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text> */}
            <TouchableOpacity 
              onPress={()=> {
                TokenSuccess(null)
              }}
              style={{flexDirection:'row', justifyContent:'space-around'}}>
              <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', backgroundColor:"rgba(102, 45, 145, 0.4)", padding:12, width:Screen.width*0.8, borderRadius:20}}>
                <Text style={{color:'white'}}>Logout</Text>
                <Image source={images.arrowRight} style={{height:20,width:20, marginLeft:4}} resizeMode='contain'/>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
  return {
    token: state.token.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)