import React, {Component} from 'react';
import {Dimensions, Image, Pressable, StyleSheet} from 'react-native';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import images from '../../../Themes/Images';
import {Screen} from '../../../Transforms/Screen';
import {requestCameraAndAudioPermission} from './permissions';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

import { Avatar } from 'react-native-elements';

import styles from './styles';
import { TemplateBackground } from '../../../Components/TemplateBackground';

import TokenRedux from '../../../Redux/Authentication/TokenRedux';
import API from '../../../Services/Api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const api =  API.create();

interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
}
class Video extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      appId: '4ede35933b9e4e009c0522f13c42f778',
      token:
        '0064ede35933b9e4e009c0522f13c42f778IAC6fmFeo2Qa1TdGHGA5dkDbPWJVc275qJOqCRlpvgo+a1kVm9QAAAAAEAC+QOqNnQkbYQEAAQCdCRth',
      channelName: 'santooi',
      joinSucceed: false,
      peerIds: [],
      isMute: false,
      isSpeakerEnable: false,
      Video: true,
      dataFriend: {},
      EndCall: false
    };
  }

  // const [isMute, setIsMute] = useState(false);
  // const [isSpeakerEnable, setIsSpeakerEnable] = useState(true);
  componentDidMount() {
    this._Join()
  }
  _Join = async() => {
    const { params,inApp } = this.props.navigation.state.params;
    if(this.state.EndCall){
      api.checkUserCall({
        id:  inApp? params.friend.id: params?.user?.id,
        type: 'v_call',
        status: 'start',
        token: this.props.token?.data?.access_token,
      })
      .then( async(data) => {
        console.log(`data EndCall`, data.data)
        await this.setState({
          appId: params.friend.user.agora.app_id,
          token: params.friend.user.agora.token,
          channelName: params.friend.user.agora.channel,
          dataFriend: params.friend,
          joinSucceed: false,
          peerIds: [],
          isMute: false,
          isSpeakerEnable: false,
          Video: true,
          EndCall: false
        });
        await this.startCall();
      }) 
      .catch( err => console.log(`err EndCall`, err))
    } else {
      await this.setState({
        appId: params.friend.user.agora.app_id,
        token: params.friend.user.agora.token,
        channelName: params.friend.user.agora.channel,
        dataFriend: params.friend,
        joinSucceed: false,
        peerIds: [],
        isMute: false,
        isSpeakerEnable: false,
        Video: true,
        EndCall: false
      });
      if (Platform.OS === 'android') {
        // Request required permissions from Android
        await requestCameraAndAudioPermission().then(() => {
          console.log('requested!');
          this.init();
        });
      }else{
        check(PERMISSIONS.IOS.CAMERA)
        .then((result) => {
          if(!RESULTS.GRANTED){
            request(PERMISSIONS.IOS.CAMERA).then((result) => {
              console.log(`result`, result)
              // …
            });
            request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
              console.log(`result`, result)
              // …
            });
            }
          })
        }
        
      await this.startCall();
    }
  }
  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const _engine = await RtcEngine.create(this.state.appId);
    await _engine.enableVideo();
    await _engine.muteLocalAudioStream(false)
    await _engine.isSpeakerphoneEnabled(true)
    await _engine.isCameraFocusSupported(true)
    await _engine.enableAudio()
    _engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    _engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    _engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });
    _engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name

    const _engine = await RtcEngine.create(this.state.appId);
    await _engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0,
    );
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    const { params, inApp } = this.props.navigation.state.params;
    const _engine = await RtcEngine.create(this.state.appId);
    // console.log(`params`, params)
    // console.log(`object`, {
    //     id: inApp? params.friend.id: params?.user?.id,
    //     type: 'v_call',
    //     status: 'end',
    //     token: this.props.token?.data?.access_token,
    //   })
    await api.checkUserCall({
      id: inApp? params.friend.id: params?.user?.id,
      type: 'v_call',
      status: 'end',
      token: this.props.token?.data?.access_token,
    })
    .then( async(data) => {
      console.log(`data endCall`, data.data)
      await _engine?.leaveChannel();
      await this.setState({peerIds: [], joinSucceed: false, modalVisible: false, EndCall: true});
    }) 
    .catch( err => console.log(`err`, err))
    
  };

  toggleIsMute = async () => {
    const _engine = await RtcEngine.create(this.state.appId);
    await _engine.muteLocalAudioStream(!this.state.isMute);
    // setIsMute(!isMute);
    this.setState({isMute: !this.state.isMute});
  };

  toggleIsSpeakerEnable = async () => {
    const _engine = await RtcEngine.create(this.state.appId);
    await _engine.setEnableSpeakerphone(!this.state.isSpeakerEnable);
    // setIsSpeakerEnable(!isSpeakerEnable);

    this.setState({isSpeakerEnable: !this.state.isSpeakerEnable});
  };

  toggleIsCamera = async () => {
    const _engine = await RtcEngine.create(this.state.appId);
    if(this.state.Video){
      await _engine.disableVideo()
    } else {
      await _engine.enableVideo()
    }
    
    this.setState({Video: !this.state.Video})
    // setIsSpeakerEnable(!isSpeakerEnable);

    this.setState({isSpeakerEnable: !this.state.isSpeakerEnable});
  };
  render() {
    
    const { navigation } = this.props
    const {params, name, title, pict} = navigation.state.params

    if(this.state.EndCall){
      return(
        <TemplateBackground cover={true}>
        <View style={styles1.max}>
          <View style={styles1.max}>
            <View style={styles.Main}>
              <Avatar
                    rounded
                    size="xlarge"
                    title={title}
                    source={pict}
                    containerStyle={
                      {
                        // marginRight:8,
                        // borderWidth:1,
                        // borderTopColor:'#DB068D',
                        // borderLeftColor:'#DB068D',
                        // borderRightColor:'#6F2A91',
                        // borderBottomColor:'#6F2A91',
                        backgroundColor:'purple',
                      }
                    }
                  />
              <Text style={{color: 'white', fontSize: 32}}>
                {name}
              </Text>
            </View>
            <View style={styles1.buttonHolder}>
              <TouchableOpacity
                style={{alignItems:'center', justifyContent:'center'}}
                onPress={() => {
                  this._Join()
                }}>
                <Image
                  source={images.Recall}
                  style={{
                    width: Screen.width * 0.2,
                    height: Screen.width * 0.2,
                  }}
                  resizeMode="contain"
                  // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
                />
                <Text style={{color:'white'}}>Recall</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems:'center', justifyContent:'center'}}
                onPress={() => this.props.navigation.pop()}>
                <Image
                  source={images.CancelRecall}
                  style={{
                    width: Screen.width * 0.2,
                    height: Screen.width * 0.2,
                  }}
                  resizeMode="contain"
                  // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
                />
                <Text style={{color:'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TemplateBackground>
      )
    }
    if(!this.state.Video){
        return (
        <TemplateBackground cover={true}>
          <View style={styles.container}>
            <View style={styles.Main}>
              <Avatar
                    rounded
                    size="xlarge"
                    title={title}
                    source={pict}
                    containerStyle={
                      {
                        // marginRight:8,
                        // borderWidth:1,
                        // borderTopColor:'#DB068D',
                        // borderLeftColor:'#DB068D',
                        // borderRightColor:'#6F2A91',
                        // borderBottomColor:'#6F2A91',
                        backgroundColor:'purple',
                      }
                    }
                  />
              <Text style={{color: 'white', fontSize: 32}}>
                {name}
              </Text>
              {this.state.peerIds.length < 2 && (
                <Text style={{color: 'white', fontSize: 22, marginTop: 12}}>
                  Calling ...
                </Text>
              )}
            </View>
            <View style={styles.BottomFeature}>
              <TouchableOpacity
                onPress={() => {
                  this.toggleIsSpeakerEnable();
                }}>
                <Image
                  source={images.Sound}
                  style={{
                    width: Screen.width * 0.08,
                    height: Screen.width * 0.08,
                    opacity: this.state.isSpeakerEnable ? 1 : 0.5,
                  }}
                  resizeMode="contain"
                  // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => {
                    this.toggleIsCamera();
                  }}>
                  <Image
                    source={images.Cam}
                    style={{
                      width: Screen.width * 0.08,
                      height: Screen.width * 0.08,
                      opacity: this.state.Video ? 1 : 0.5,
                    }}
                    resizeMode="contain"
                    // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
                  />
                </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>  this.endCall() }>
                <Image
                  source={images.endCall}
                  style={{
                    width: Screen.width * 0.2,
                    height: Screen.width * 0.2,
                  }}
                  resizeMode="contain"
                  // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleIsMute()}>
                <Image
                  source={images.Mic}
                  style={{
                    width: Screen.width * 0.08,
                    height: Screen.width * 0.08,
                  }}
                  resizeMode="contain"
                  containerStyle={{opacity: this.state.isMute ? 1 : 0.5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TemplateBackground>
        );
      }
    return (
    <TemplateBackground cover={true}>
        <View style={styles1.max}>
          {this._renderVideos()}
          <View style={styles1.buttonHolder}>
            <TouchableOpacity
              onPress={() => {
                this.toggleIsSpeakerEnable();
              }}>
              <Image
                source={images.Sound}
                style={{
                  width: Screen.width * 0.08,
                  height: Screen.width * 0.08,
                  opacity: this.state.isSpeakerEnable ? 1 : 0.5,
                }}
                resizeMode="contain"
                // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.toggleIsCamera();
              }}>
              <Image
                source={images.Cam}
                style={{
                  width: Screen.width * 0.08,
                  height: Screen.width * 0.08,
                  opacity: this.state.Video ? 1 : 0.5,
                }}
                resizeMode="contain"
                // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.endCall()}>
              <Image
                source={images.endCall}
                style={{
                  width: Screen.width * 0.2,
                  height: Screen.width * 0.2,
                }}
                resizeMode="contain"
                // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.toggleIsMute();
              }}>
              <Image
                source={images.Mic}
                style={{
                  width: Screen.width * 0.08,
                  height: Screen.width * 0.08,
                  opacity: this.state.isMute ? 1 : 0.5,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </TemplateBackground>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      <View style={styles1.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const {peerIds} = this.state;
    return (
      <View
        style={styles.remoteContainer}
        // contentContainerStyle={{paddingHorizontal: 2.5}}
        // horizontal={true}
        >
        {peerIds.map((value) => {
          // console.log(`_renderRemoteVideos`, value)
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </View>
    );
  };
}
const dimensions = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};
const styles1 = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    position:'absolute',
    bottom:40,
    width:Screen.width,
    flexDirection:'row',
    justifyContent:'space-around',
    marginBottom:20,
    alignItems:'center',
    paddingHorizontal:Screen.width*0.1
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height,
    flex:1
  },
  remoteContainer: {
    // width: '100%',
    height: 150,
    position: 'absolute',
    top: 60,
    right: 5
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    position: 'absolute',
    justifyContent:'center'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

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
) (Video);
