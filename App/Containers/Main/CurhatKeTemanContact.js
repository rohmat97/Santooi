import React, {useState,useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import TokenRedux from '../../Redux/Authentication/TokenRedux';

import API from '../../Services/Api'
import FixtureAPI from '../../Services/FixtureApi'
import DebugConfig from '../../Config/DebugConfig'

import {TemplateBackground} from '../../Components/TemplateBackground';
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles';
import {Screen} from '../../Transforms/Screen';
import {connect} from 'react-redux';
import Images from '../../Themes/Images';
import RoundedButton from '../../Components/RoundedButton';
import {Fonts, Colors, Metrics} from '../../Themes/';
import {OverlayInvite} from '../../Components/OverlayInvite';
import {OverlayPhone} from '../../Components/OverlayPhone';
import { bindActionCreators } from 'redux';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
function CurhatKeTemanContact(props) {
  const {navigation,token} = props;
  const {pop} = navigation;
  const [search, setsearch] = useState(null)
  const [conselingCode, setConselingCode] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [visiblePhone, setVisiblePhone] = useState(false);
  const toggleOverlayPhone = () => {
    setVisiblePhone(!visiblePhone);
  };

  const [visibleInvite, setVisibleInvite] = useState(false);
  const toggleOverlayInvite = () => {
    setVisibleInvite(!visibleInvite);
  };

  let x = [
    {
      nama: 'Agus',
    },
    {
      nama: 'Amel',
    },
    {
      nama: 'Alma',
    },
    {
      nama: 'Bagus',
    },
    {
      nama: 'Brian',
    },
  ];

  let newName = '';

  useEffect(() => {
    api.searchFriend({
      
    })
  }, [])
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
              placeholder={'Search a phone name...'}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={search}
              onChangeText={text => setsearch(text)}
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
                style={{width: Screen.width * 0.5, maxHeight: 50}}
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
                marginBottom:22,
              }}>
              <Image
                source={images.invite}
                style={{width: Screen.width * 0.5, maxHeight: 50}}
                resizeMode="contain"
              />
              <Image
                source={images.next}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

            {x.map((e, index) => {
              let exist = false;

              if (index === 0) {
                newName = e.nama.substring(0, 1).toUpperCase();
                exist = true;
              } else {
                if (e.nama.substring(0, 1).toUpperCase() !== newName) {
                  newName = e.nama.substring(0, 1).toUpperCase();
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
                        {e.nama.substring(0, 1).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CurhatKeTemanContactDetail', {
                        nama : e.nama
                      })
                    }>
                    <Text style={{color: 'white'}}>{e.nama}</Text>
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
            })}
          </ScrollView>

          {/* <View
            style={{
              backgroundColor: '#67308F',
              width: Screen.width,
              paddingVertical: 5,
              paddingHorizontal: 20,
              marginVertical: 20,
              marginLeft: -15,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>A</Text>
          </View>

          <Text style={{color: 'white'}}>Amel</Text>
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
          <Text style={{color: 'white'}}>Alma</Text>
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

          <View
            style={{
              backgroundColor: '#67308F',
              width: Screen.width,
              paddingVertical: 5,
              paddingHorizontal: 20,
              marginVertical: 20,
              marginLeft: -15,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>B</Text>
          </View>

          <Text style={{color: 'white'}}>Bayu</Text>
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
          <Text style={{color: 'white'}}>Brian</Text>
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
          /> */}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CurhatKeTemanContact);
