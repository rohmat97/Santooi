import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';
import TokenRedux from '../../../Redux/Authentication/TokenRedux';

import API from '../../../Services/Api';
import FixtureAPI from '../../../Services/FixtureApi';
import DebugConfig from '../../../Config/DebugConfig';

import {TemplateBackground} from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import styles from '../../Styles/LaunchScreenStyles';
import {Screen} from '../../../Transforms/Screen';
import {connect} from 'react-redux';
import Images from '../../../Themes/Images';
import RoundedButton from '../../../Components/RoundedButton';
import {Fonts, Colors, Metrics} from '../../../Themes';
import {OverlayInvite} from '../../../Components/OverlayInvite';
import {OverlayPhone} from '../../../Components/OverlayPhone';
import {bindActionCreators} from 'redux';
import {FlatList} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Alert} from 'react-native';
import {CustomBottomTab2} from '../../../Components/CustomBottomTab2';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
function ListContact({props, page, SetPage}) {
  const {navigation, token} = props;
  const [search, setsearch] = useState('');
  const [listFriend, setListFriend] = useState([]);
  const [listContact, setlistContact] = useState([]);
  const [visiblePhone, setVisiblePhone] = useState(false);
  const toggleOverlayPhone = () => {
    // setVisiblePhone(!visiblePhone);
    navigation.navigate('FindUserByContact');
  };

  const [visibleInvite, setVisibleInvite] = useState(false);
  const toggleOverlayInvite = () => {
    setVisibleInvite(!visibleInvite);
  };

  let newName = '';

  useEffect(() => {
    api
      .listContact({
        token: token.data.access_token,
        request: '',
      })
      .then((success) => {
        // Platform.OS==='ios'&& console.log(`success ios`, success.data)
        // Platform.OS==='android'&& console.log(`success android`, success.data.data)
        const data = success.data.data.rows.sort((a, b) => {
          if (
            a.friend.name &&
            b.friend.name &&
            a.friend.name.toLowerCase() > b.friend.name.toLowerCase()
          ) {
            return 1;
          }
          if (
            a.friend.name &&
            b.friend.name &&
            a.friend.name.toLowerCase() < b.friend.name.toLowerCase()
          ) {
            return -1;
          }
          return 0;
        });
        setlistContact(data);
        setListFriend(data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    if(search && search.length>0){
      let filter = listContact.filter(data => {return data.friend && data.friend.name.toLowerCase().indexOf(search.toLowerCase()) >= 0})
        // console.log(filter)
      setListFriend(filter)
    }else if(search.length<1){
      setListFriend(listContact)
    }
  }, [search]);

  return (
    <TemplateBackground cover={true}>
      <View style={styles.mainContainer}>
        <View style={styles.section}>
          <View style={styles.containerSearch}>
            <Image
              source={images.search}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
            <TextInput
              style={{color: 'white', flex: 1, marginLeft: 10}}
              placeholder={'Search Friend...'}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={search}
              onChangeText={(text) => setsearch(text)}
              keyboardType={'default'}
              // inputRef={(ref) => (this.number = ref)}
            />
          </View>

          <ScrollView>
            <TouchableOpacity onPress={toggleOverlayPhone}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <Image
                  source={images.findByPhone}
                  style={{width: 150, maxHeight: 50}}
                  resizeMode="contain"
                />
                <Image
                  source={images.next}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleOverlayInvite}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}>
                <Image
                  source={images.invite}
                  style={{width: 200, maxHeight: 50}}
                  resizeMode="contain"
                />
                <Image
                  source={images.next}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
              <FlatList
                data={listFriend}
                ListEmptyComponent={
                  <View
                  style={{
                    flex: 1,
                    // justifyContent: 'center',
                    alignItems: 'center',
                    width: Screen.width * 0.9,
                    height: Screen.height * 0.7,
                  }}>

                <View
                  style={{
                    backgroundColor: '#67308F',
                    width: Screen.width,
                    paddingVertical: 1,
                    paddingHorizontal: 20,
                    marginBottom: 20,
                    marginLeft: -15,
                  }}
                />
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
                    fontSize:20
                  }}>Belum Ada List Teman</Text>
                </View>
                }
                renderItem={({item, index}) => {
                  let exist = false;

                  if (index === 0) {
                    newName =
                      item &&
                      item.friend.name &&
                      item.friend.name.substring(0, 1).toUpperCase();
                    exist = true;
                  } else {
                    if (
                      item &&
                      item.friend.name &&
                      item.friend.name.substring(0, 1).toUpperCase() !== newName
                    ) {
                      newName =
                        item &&
                        item.friend.name &&
                        item.friend.name.substring(0, 1).toUpperCase();
                      exist = true;
                    }
                  }
                  return (
                    <View key={index}>
                      {exist && (
                        <View
                          style={{
                            backgroundColor: '#67308F',
                            width: Screen.width,
                            paddingVertical: 5,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                            marginLeft: -15,
                          }}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            {item.friend.name.substring(0, 1).toUpperCase()}
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          // console.log(item.friend)
                          //   api
                          //     .findFriend({
                          //       no:
                          //         item.friend && item.friend.user.phone_number,
                          //       token: token.data.access_token,
                          //     })
                          //     .then((res) => {
                          //       if (res.data.data.rows.length > 0) {
                          //         // alert('user found')
                          //         // toggleOverlayPhone()
                          //         // console.log(item)
                          //         navigation.navigate(
                          //           'CurhatKeTemanContactDetail',
                          //           {
                          //             params: res.data.data.rows[0],
                          //           },
                          //         );
                          //       } else {
                          //         Alert.alert('user not found');
                          //       }
                          //       // console.log(res.data.data.rows)
                          //     })
                          //     .catch((err) => console.log('error', err.data));
                          // }
                          navigation.navigate('CurhatKeTemanContactDetail', {
                            params: item,
                          });
                        }}>
                        <Text style={{color: 'white'}}>{item.friend.name}</Text>
                        <View
                          style={{
                            height: 1,
                            width: Screen.width,
                            borderRadius: 1,
                            borderWidth: 0.5,
                            borderColor: 'white',
                            zIndex: 0,
                            marginVertical: 15,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
          </ScrollView>
        </View>
        <OverlayPhone
          api={api.findFriend}
          token={token.data.access_token}
          visible={visiblePhone}
          toggleOverlay={toggleOverlayPhone}
          navigation={navigation}
        />
        <OverlayInvite
          visible={visibleInvite}
          token={token}
          toggleOverlay={toggleOverlayInvite}
        />
      </View>
      <CustomBottomTab2 page={page} SetPage={SetPage} />
    </TemplateBackground>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ListContact);
