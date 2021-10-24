import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
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
interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
}
const _engine = RtcEngine;
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
    };
  }

  // const [isMute, setIsMute] = useState(false);
  // const [isSpeakerEnable, setIsSpeakerEnable] = useState(true);
  async componentDidMount() {
    const {nama, params} = this.props.navigation.state.params;
    await this.setState({
      appId: params.friend.user.agora.app_id,
      token: params.friend.user.agora.token,
      channelName: params.friend.user.agora.channel,
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
    const _engine = await RtcEngine.create(this.state.appId);
    await _engine?.leaveChannel();
    this.setState({peerIds: [], joinSucceed: false});
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

  render() {
    return (
      <View style={styles.max}>
        <View style={styles.max}>
          {this._renderVideos()}
          <View style={styles.buttonHolder}>
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
                this.endCall();
                this.props.navigation.pop();
              }}>
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
            {/* <TouchableOpacity onPress={this.startCall} style={styles.button}>
              <Text style={styles.buttonText}> Start Call </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
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
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value) => {
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
      </ScrollView>
    );
  };
}
const dimensions = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};
const styles = StyleSheet.create({
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
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
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
});

export default Video;
