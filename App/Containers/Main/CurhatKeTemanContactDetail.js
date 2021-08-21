import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import API from '../../Services/Api';
import FixtureAPI from '../../Services/FixtureApi';
import DebugConfig from '../../Config/DebugConfig';

import TokenRedux, {success} from '../../Redux/Authentication/TokenRedux';

import {showMessage, hideMessage} from 'react-native-flash-message';

import {TemplateBackground} from '../../Components/TemplateBackground';
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles';
import {Screen} from '../../Transforms/Screen';
import {connect} from 'react-redux';
import Images from '../../Themes/Images';
import RoundedButton from '../../Components/RoundedButton';
import {Fonts, Colors, Metrics} from '../../Themes/';
import {bindActionCreators} from 'redux';
import {Image} from 'react-native-elements/dist/image/Image';
import {ActivityIndicator} from 'react-native';
import DetailAlbum from './Foto/DetailAlbum';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
function CurhatKeTemanContactDetail(props) {
  const {navigation, token} = props;
  const {nama, params} = navigation.state.params;
  const {pop} = navigation;
  const [conselingCode, setConselingCode] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [dataDetail, setDataDetail] = useState();

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    // console.log('params',params)
    if (params && params.id_user) {
      api
        .getDetailContact({
          id: 87,
          token: token.data.access_token,
        })
        .then((succ) => {
          // console.log(`succ`, succ.data.data.rows)
          setDataDetail(succ.data.data.rows);
        })
        .catch((err) => {
          // console.log(`err`, err)
        });
    }
    {
      setDataDetail(params);
    }
  }, []);

  useEffect(() => {
    if (dataDetail) {
      console.log('DetailAlbum', dataDetail);
    }
  }, [dataDetail]);

  const addToContact = () => {
    api
      .addFriend({
        body: {
          id_account: dataDetail.id,
        },
        token: token.data.access_token,
      })
      .then((success) => {
        // console.log(success.data)
        showMessage({
          message: success.data.message,
          type: 'info',
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  if(!dataDetail){
    return(
      <View style={{flex:1}}>
        <ActivityIndicator color="white" size={32}/>
      </View>
    )
  }
  return (
    <TemplateBackground cover={true}>
      <View style={styles.mainContainer}>
        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 50,
            }}>
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
            <TouchableOpacity
              onPress={() => {
                if (dataDetail && dataDetail.is_friend) {
                  alert('still on development');
                } else {
                  addToContact();
                }
              }}>
              <Text
                style={{
                  color:
                    dataDetail && dataDetail.is_friend ? '#4287f5' : '#4287f5',
                  marginLeft: 15,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {dataDetail && dataDetail.is_friend ? 'Edit' : 'Request'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <LinearGradient colors={['#DB068D', '#6F2A91']} style={{borderRadius:100, padding:2, marginRight:8}}>
                <Avatar
                        rounded
                        size='xlarge'
                        title={dataDetail && dataDetail.name.charAt(0)}
                        source={dataDetail&&dataDetail.photo? {uri: dataDetail.photo.url}:''}
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
            {/* <Image
              source={dataDetail&&dataDetail.photo? {uri: dataDetail.photo.url} : images.pp}
              style={{width: 100, height: 100, alignSelf: 'center', borderRadius:100}}
              resizeMode="contain"
              PlaceholderContent={
                <ActivityIndicator color={'white'} size={32} />
              }
            /> */}
            <Text
              style={{
                fontWeight: '500',
                color: 'white',
                fontSize: 30,
                textAlign: 'center',
                marginTop: 10,
              }}>
              {dataDetail ? dataDetail.name : nama}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: Screen.height * 0.1,
              maxHeight: 80,
              flexDirection: 'row',
              paddingHorizontal: 12,
              marginVertical: 30,
              marginTop: 225,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  nama: dataDetail ? dataDetail.name : nama,
                })
              }
              style={{alignItems: 'center'}}>
              <Image
                source={images.message}
                style={{
                  width: Screen.height * 0.07,
                  height: Screen.height * 0.07,
                }}
                resizeMode="contain"
              />
              <Text style={{fontSize: 13, marginTop: 5, color: 'white'}}>
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CallRoom', {params: dataDetail.agora})
              }>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={images.call}
                  style={{
                    width: Screen.height * 0.07,
                    height: Screen.height * 0.07,
                  }}
                  resizeMode="contain"
                />
                <Text style={{fontSize: 13, marginTop: 5, color: 'white'}}>
                  Call
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('VideoRoom')}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={images.video}
                  style={{
                    width: Screen.height * 0.07,
                    height: Screen.height * 0.07,
                  }}
                  resizeMode="contain"
                />
                <Text style={{fontSize: 13, marginTop: 5, color: 'white'}}>
                  Video
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: 20, flex: Screen.width * 0.8}}>
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
            <Text style={{fontWeight: 'bold', color: 'white'}}>Phone</Text>
            <Text style={{color: 'white'}}>
              {dataDetail && dataDetail.phone_number}
            </Text>
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
            <Text style={{fontWeight: 'bold', color: 'white'}}>Email</Text>
            <Text style={{color: 'white'}}>
              {dataDetail && dataDetail.email}
            </Text>
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
          </View>
        </View>
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
)(CurhatKeTemanContactDetail);
