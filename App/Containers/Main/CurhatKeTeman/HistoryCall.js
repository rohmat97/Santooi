import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import API from '../../../Services/Api';
import FixtureAPI from '../../../Services/FixtureApi';
import DebugConfig from '../../../Config/DebugConfig';

import {TemplateBackground} from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import styles from '../../Styles/LaunchScreenStyles';
import {Screen} from '../../../Transforms/Screen';
import {CustomBottomTab2} from '../../../Components/CustomBottomTab2';
import {Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
export const HistoryCall = ({props,page,SetPage}) => {
  const {navigation, token} = props;
  const {pop} = navigation;
  const [listRequestFriends, setlistRequestFriends] = useState([])

  useEffect(()=>{
    api.listContact({
      token: token.data.access_token,
    }).then((success) => {
      console.log(`success`, success.data.data.rows)
      setlistRequestFriends(success.data.data.rows)
    })
    .catch((err) => {
      console.log('err', err);
    });
    // 
  },[])
  let x = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      return (
        <TemplateBackground cover={true}>
          <View style={styles.mainContainer}>
            <View style={styles.section}>
              <View style={{flexDirection: 'row', paddingBottom:24}}>
                  <Text
                    style={{
                      color: '#67308F',
                      marginLeft: 15,
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    Riwayat Panggilan
                  </Text>
              </View>
              <FlatList
                data={listRequestFriends}
                ListEmptyComponent={
                  <View style={{flex:1, justifyContent:"center",alignItems:"center", height:Screen.height*0.6}}>
                    <Text style={{color:'white', fontSize:20}}> Belum Ada Permintaan Pertemanan</Text>
                  </View>
                }
                style={{paddingBottom: Screen.height * 0.1}}
                renderItem={({item, index}) => {
                  // console.log(item)
                  return(
                  <View style={{flexDirection:'row', paddingVertical:12}}>
                    <LinearGradient
                      colors={['#DB068D', '#6F2A91']}
                      style={{borderRadius: 100, width: 40, height: 40}}>
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
                        }}>
                        <View>
                          <Text style={{fontWeight: 'bold', color: 'white'}}>
                            {item.friend.name}
                          </Text>
                          <Text style={{color: 'white'}}>Ok</Text>
                        </View>
                        <View style={{marginEnd: 10}}>
                          {/* <Text style={{color: 'white', fontSize: 13}}>07.00</Text> */}
                          <Image
                            source={images.InCall}
                            style={{width: 32, height: 32}}
                            resizeMode="contain"
                          />
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
          <CustomBottomTab2 page={page} SetPage={SetPage}/>
        </TemplateBackground>
      );
}