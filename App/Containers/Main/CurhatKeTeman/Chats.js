/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
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

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
export const Chats = ({props, page, SetPage}) => {
  const {navigation, token} = props;
  const {pop} = navigation;
  const [listChat, setlistChat] = useState([]);

  useEffect(() => {
    api
      .getChat({
        // page: 1,
        // limit: 100,
        // id: params.id,
        token: token.data.access_token,
      })
      .then((success) => {
        // console.log(`success`, success.data.data.rows);
        setlistChat(success.data.data.rows);
      });
  }, []);
  return (
    <TemplateBackground cover={true}>
      <View style={styles.mainContainer}>
        <View style={styles.section}>
          <View style={{flexDirection: 'row', marginBottom: 24}}>
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
          {/* <TouchableOpacity
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
              </TouchableOpacity> */}
          <FlatList
            data={listChat}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('CurhatKeTemanContact')}>
                  <Image
                    source={images.MulaiCurhat}
                    style={{
                      height: Screen.height * 0.075,
                      width: Screen.width * 0.8,
                      marginTop: 40,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            }
            style={{paddingBottom: Screen.height * 0.1}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  // console.log(`item`, item.last_message.message)
                  navigation.navigate('DetailChat', {
                    params: item,
                    token: token,
                  })
                }
                key={index}
                style={{
                  flexDirection: 'row',
                  height: 60,
                  justifyContent: 'center',
                }}>
                <LinearGradient
                  colors={['#DB068D', '#6F2A91']}
                  style={{borderRadius: 100, width: 40, height: 40}}>
                  <Avatar
                    rounded
                    size="medium"
                    // title={'Nissa'}
                    source={{
                      uri:item.friend.photo?item.friend.photo:'',
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
                     {item.last_message && <Text style={{color: 'white'}}>{item.last_message.message}</Text>}
                    </View>
                    <View style={{marginEnd: 10}}>
                      <Text style={{color: 'white', fontSize: 13}}>{item.total_unread_message}</Text>
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
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <CustomBottomTab2 page={page} SetPage={SetPage} />
    </TemplateBackground>
  );
};
