import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
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

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
function CurhatKeTemanContact(props) {
  const {navigation, token, page, SetPage} = props;
  const {pop} = navigation;
  const [search, setsearch] = useState('');
  const [conselingCode, setConselingCode] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
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
      })
      .then((success) => {
        // console.log(`success`, success.data.data)
        setlistContact(success.data.data.rows);
        setListFriend(success.data.data.rows);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    if (search && search.length > 0) {
      let filter = listContact.filter((data) => {
        return (
          data.friend.name &&
          data.friend.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
        );
      });
      // console.log(filter)
      setListFriend(filter);
    } else if (search.length < 1) {
      setListFriend(listContact);
    }
  }, [search]);

  return (
    <TemplateBackground cover={true}>
      <View style={styles.mainContainer}>
        <View style={styles.section}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            {listFriend.length > 0 ? (
              <FlatList
                data={listFriend}
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
                        onPress={
                          () => {
                            api
                              .findFriend({
                                no:
                                  item.friend && item.friend.user.phone_number,
                                token: token.data.access_token,
                              })
                              .then((res) => {
                                if (res.data.data.rows.length > 0) {
                                  // alert('user found')
                                  // toggleOverlayPhone()
                                  navigation.navigate(
                                    'CurhatKeTemanContactDetail',
                                    {
                                      params: res.data.data.rows[0],
                                    },
                                  );
                                } else {
                                  Alert.alert('user not found');
                                }
                                // console.log(res.data.data.rows)
                              })
                              .catch((err) => console.log('error', err.data));
                          }
                          // navigation.navigate('CurhatKeTemanContactDetail', {
                          //   nama: item.friend.name,
                          // })
                        }>
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
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
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
                <Text style={{color: 'white', fontSize: 32}}>
                  Belum Ada Teman
                </Text>
              </View>
            )}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurhatKeTemanContact);
