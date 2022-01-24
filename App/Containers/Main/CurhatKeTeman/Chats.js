/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {TemplateBackground} from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import styles from '../../Styles/LaunchScreenStyles';
import {Screen} from '../../../Transforms/Screen';
import {CustomBottomTab2} from '../../../Components/CustomBottomTab2';
import {Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import API from '../../../Services/Api';
import FixtureAPI from '../../../Services/FixtureApi';
import DebugConfig from '../../../Config/DebugConfig';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Images, Metrics } from '../../../Themes';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { render } from 'enzyme';
import moment from 'moment';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
export const Chats = ({props, page, SetPage, listRequestFriends}) => {
  const {navigation, token} = props;
  const {pop} = navigation;
  const [listChat, setlistChat] = useState([]);
  const [fetching, setfetching] = useState(true)
  const LoadChat =() =>{
     setfetching(true)
     api
      .getChat({
        // page: 1,
        // limit: 100,
        // id: params.id,
        token: token.data.access_token,
      })
      .then((success) => {
        console.log(`success`, success.data.data.rows);
        setlistChat(success.data.data.rows);
        setfetching(false)
      })
      .catch( ()=> setfetching(false))
  }
  useEffect(() => {
    LoadChat()
  }, []);

  const renderRightActions = (progress, item) => {
    return (
      <RectButton style={{alignItems:'center',justifyContent:'center'}}>
        <Animated.View
          style={ { translateX: 0}}>
           <LinearGradient
            colors={['#E7515B', '#EB0D8C']}
            style={{alignItems:'center',justifyContent:"center", height:100,width: 100}}
            >
            <Avatar
                onPress={()=> api.deleteChat({
                  token: token.data.access_token,
                  id: item?.last_message?.id_user_friend
                }).then(success => LoadChat()).catch(err => console.log(`err`, err.data))}
                source={Images.DeleteChat}
                avatarStyle={{width:32,height:32}}
                containerStyle={{alignItems:'center',justifyContent:"center", marginVertical:'20%'}}
              />
          </LinearGradient>
        </Animated.View>
      </RectButton>
    );
  }
  return (
    <TemplateBackground cover={true}>
      <View style={styles.mainContainer}>
        <View style={styles.section}>
          <View style={{flexDirection: 'row'}}>
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
                Curhat ke Teman
              </Text>
            </TouchableOpacity>
          </View>
          {listChat.length>0 &&<TouchableOpacity
            onPress={() => navigation.navigate('CurhatKeTemanContact')}
            style={{
              alignSelf: 'flex-end',
              marginBottom: 20,
            }}>
            <Image
              source={images.newMessage}
              style={{height: 40, width: Screen.width * 0.3}}
              resizeMode="contain"
            />
          </TouchableOpacity>}
          {
            fetching ?
            <ActivityIndicator animating={true} color={Colors.purple900} size={40} style={{marginTop: Metrics.screenHeight*0.2}} />
            :
            <FlatList
              data={listChat.length>0?[...listChat,{}]:listChat}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Screen.width * 0.9,
                    height: Screen.height * 0.7,
                    marginTop:-20
                  }}>
                  <Image
                    source={images.EmptyStateChat}
                    style={{
                      height: Screen.width * 0.7,
                      width: Screen.width * 0.6,
                    }}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CurhatKeTemanContact')}>
                    <Image
                      source={images.MulaiCurhat}
                      style={{
                        height: Screen.height * 0.075,
                        width: Screen.width * 0.8,
                        marginTop: 12,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              }
              style={{paddingBottom: Screen.height * 0.2}}
              renderItem={({item, index}) =>{ 
                if(item && item.friend){
                  // console.log(`item`, item)
                  return(
                    <Swipeable
                      childrenContainerStyle={{justifyContent:"center",alignContent:'space-between'}}
                      onSwipeableRightOpen={()=>console.log(`open`)}
                      renderRightActions={(progress) => renderRightActions(progress, item)}>
                    <TouchableOpacity
                      onPress={() =>{
                        console.log(`item`, item)
                        navigation.navigate('DetailChat', {
                          params: item,
                          LoadChat: LoadChat
                        })}
                      }
                      style={{
                        flexDirection: 'row',
                        height: 100,
                        justifyContent: 'center',
                        // paddingVertical: 12,
                        alignItems:'center'
                      }}>
                        
                      <LinearGradient
                        colors={['#DB068D', '#6F2A91']}
                        style={{borderRadius: 100, width: 52, height:51,alignItems:'center'}}>
                        <Avatar
                          rounded
                          size="medium"
                          // title={'Nissa'}
                          source={{
                            uri:item.friend.photo?item.friend.photo.url:'',
                          }}
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
                          }}>
                          <View>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>
                              {item.friend.name}
                            </Text>
                          {item.last_message ? <Text style={{color: 'white'}} numberOfLines={1}>{item.last_message.message}</Text>:<Text></Text>}
                          </View>
                          {
                            item.total_unread_message.length>0 &&
                            <View style={{marginEnd: 10, backgroundColor:'white',alignItems:'center', justifyContent:'center', width:20, height:20, borderRadius: 100}}>
                              <Text style={{ fontSize: 13 }}>{item.total_unread_message}</Text>
                              <Text>1</Text>
                            </View>
                          }
                        </View>
                        <Text style={{color:'white', textAlign:'right', marginRight:10, fontSize:10}}>{moment(new Date(item.last_message.created_at), 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                  )
                }else{
                  return null
                }
            }}
              ItemSeparatorComponent={
                (({ highlighted }) => (
                <View
                style={{
                  height: 1,
                  width: '100%',
                  borderRadius: 1,
                  borderWidth: 0.5,
                  borderColor: 'white',
                  // marginVertical: 4,
                }}
              />
                ))}
            />
          }
          
        </View>
      </View>
      <CustomBottomTab2 page={page} SetPage={SetPage}  listRequestFriends={listRequestFriends}/>
    </TemplateBackground>
  );
};
