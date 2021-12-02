import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {TemplateBackground} from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import styles from '../../Styles/LaunchScreenStyles';
import {Screen} from '../../../Transforms/Screen';
import {CustomBottomTab2} from '../../../Components/CustomBottomTab2';
import {Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from 'react-native-flash-message';

import API from '../../../Services/Api';
import FixtureAPI from '../../../Services/FixtureApi';
import DebugConfig from '../../../Config/DebugConfig';
import { Metrics } from '../../../Themes';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
export const RequestFriends = ({props,page,SetPage,listRequestFriends, GetRequestFriends}) => {
  const {navigation, token} = props;
  const { pop } = navigation

  let x = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      return (
        <TemplateBackground cover={true}>
          <View style={styles.mainContainer}>
            <View style={styles.section}>
              <View style={{flexDirection: 'row', paddingBottom:24}}>
              <TouchableOpacity
                onPress={() => pop()}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={images.arrowBack}
                  style={{width: 18, height: 18}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: '#67308F',
                    marginLeft: 15,
                    fontWeight: '500',
                    fontSize: 16,
                  }}>
                  Permintaan Pertemanan
                </Text>
              </TouchableOpacity>
              </View>
              <FlatList
                data={listRequestFriends}
                ListEmptyComponent={
                  <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Screen.width * 0.9,
                    height: Screen.height * 0.7,
                  }}>
                  <Image
                    source={images.EmptyStateChat}
                    style={{
                      height: Screen.width * 0.7,
                      width: Screen.width * 0.6,
                    }}
                    resizeMode="cover"
                  />
                  <Text style={{
                    color:"white",
                    padding:12,
                    fontSize:20,
                    textAlign:'center'
                  }}> Belum Ada Permintaan Pertemanan</Text>
                </View>
                }
                style={{paddingBottom: Screen.height * 0.1}}
                renderItem={({item, index}) => {
                  // console.log(item)
                  return(
                  <View style={{flexDirection:'row', paddingVertical:12}}>
                    <LinearGradient
                      colors={['#DB068D', '#6F2A91']}
                      style={{borderRadius: 100, width: 60, height: 60}}>
                      <Avatar
                        rounded
                        size="medium"
                        // title={'Nissa'}
                        // source={{
                        //   uri:ImageProfile?ImageProfile:'',
                        // }}
                        containerStyle={
                          {
                            // marginRight:8,
                            // borderWidth:1,
                            // borderTopColor:'#DB068D',
                            // borderLeftColor:'#DB068D',
                            // borderRightColor:'#6F2A91',
                            // borderBottomColor:'#6F2A91',
                          }
                        }
                      />
                    </LinearGradient>
    
                    <View style={{marginLeft: 20, flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems:'center'
                        }}>
                        <View>
                          <Text style={{fontWeight: 'bold', color: 'white',width:Metrics.screenWidth*0.3}}>
                            {item.friend.name}
                          </Text>
                          {/* <Text style={{color: 'white'}}>Ok</Text> */}
                        </View>
                        <View style={{marginEnd: 10,flexDirection:'row'}}>
                          {/* <Text style={{color: 'white', fontSize: 13}}>07.00</Text> */}
                          <TouchableOpacity
                            onPress={()=>{
                              api.acceptFriend({
                                body:{
                                  id_account:item.friend.id,
                                  status:2
                                },
                                token:token.data.access_token
                              }).then(
                                sucess =>{
                                  // console.log(`sucess`, sucess.data)
                                  showMessage({
                                    message: "Permintaan Ditolak",
                                    type: "info",
                                  });
                                  GetRequestFriends()
                                }
                              ).catch(err => console.log(`err`, err))
                            }}
                            >
                              <View  style={{borderColor:'white', borderWidth:1,borderRadius: 12, width: 72, height: 48,alignItems:'center', justifyContent:'center',marginRight:4}}>
                                <Text style={{color:'white'}}>
                                    Tolak
                                </Text>
                              </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={()=>{
                              api.acceptFriend({
                                body:{
                                  id_account:item.friend.id,
                                  status:1
                                },
                                token:token.data.access_token
                              }).then(
                                sucess =>{
                                  // console.log(`sucess`, sucess.data)
                                  showMessage({
                                    message: "Permintaan Diterima",
                                    type: "info",
                                  });
                                  GetRequestFriends()
                                }
                              ).catch(err => console.log(`err`, err))
                            }}
                            >
                            <LinearGradient
                            colors={['#00BEE8', '#30DD80','#00FF85']}
                            style={{borderRadius: 12, width: 72, height: 48, alignItems:'center',justifyContent:'center'}}>
                              <Text style={{color:'white'}}>Terima</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          height: 1,
                          width: '100%',
                          borderRadius: 1,
                          borderWidth: 0.5,
                          borderColor: 'white',
                          zIndex: 0,
                          marginVertical: 12,
                        }}
                      />
                    </View>
                  </View>
                )}}
              />
            </View>
          </View>
          <CustomBottomTab2 page={page} SetPage={SetPage} listRequestFriends={listRequestFriends}/>
        </TemplateBackground>
      );
}
