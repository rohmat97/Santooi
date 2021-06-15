import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, FlatList } from 'react-native'
import { Avatar } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import { ContentHome } from '../../Components/ContentHome'
import { Screen } from '../../Transforms/Screen'
import { Colors } from '../../Themes'
import images from '../../Themes/Images';
import { style } from '../../Components/OverlayHomepage';

export const Dashboard =({ImageProfile,token,styles,picked,toggleOverlay,navigate,quote,manualPicked,getUnique}) =>{
    let emoticon =picked ? picked.concat(manualPicked):manualPicked?manualPicked:[]
    let uniqEmot =[...new Set(emoticon)]
    // console.log('uniqEmot',uniqEmot)
    return(
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
                <TouchableOpacity onPress={()=>toggleOverlay(null)}>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View
                      style={{borderWidth:1, minHeight:80, width:Screen.width*0.9, marginBottom:Screen.height*0.1, borderRadius:20,paddingBottom:12, alignItems:'flex-start',justifyContent:'center', backgroundColor:'white',borderColor:Colors.transparent}}>
                      {
                       uniqEmot && uniqEmot.length>0?
                      <FlatList
                        data={uniqEmot}
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
                      <Text style={{color:'#662D91', fontStyle:'italic',marginHorizontal:12,marginTop:uniqEmot && uniqEmot.length>0?12:quote?14:0}} numberOfLines={4}>{quote?quote:'Bagaimana Perasaanmu Hari ini?'}</Text>
                      {
                        uniqEmot && uniqEmot.length>0 || quote?
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
                </View>
                </TouchableOpacity>
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
    )
}

const renderItem = ({ item }) => (
    <Image source={{uri:item.image && item.image.url}} style={[style.iconic]} resizeMode='contain'/>
)