import React, {Component} from 'react';
import {Alert, BackHandler, Button, Dimensions, Image, StyleSheet} from 'react-native';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import { Avatar } from 'react-native-elements';
import { TemplateBackground } from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import {Screen} from '../../../Transforms/Screen';
import {requestAudioPermission} from './permissions';
import styles from './styles';
const _engine = RtcEngine;
interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
}
class CallRoom extends Component<{}, State>  {
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
      openMicrophone: true,
      enableSpeakerphone: true,
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
      await requestAudioPermission().then(() => {
        console.log('requested!');
        this.init();
      });
    }
    
    await this.startCall();
    this.backHandler()
   
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }
   backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => this.props.navigation.pop() }
    ]);
    return true;
  };
  backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    this.backAction
  );

  
  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const _engine = await RtcEngine.create(this.state.appId);
    await _engine.enableVideo();
    await _engine.muteLocalAudioStream(false);
    await _engine.isSpeakerphoneEnabled(true);

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
    // const _engine = await RtcEngine.create(this.state.appId);
    // await _engine.setEnableSpeakerphone(!this.state.isSpeakerEnable);
    // setIsSpeakerEnable(!isSpeakerEnable);
    if(this.state.isSpeakerEnable){
      this._switchMicrophone()
    }else{
      this._switchSpeakerphone()
    }
    this.setState({isSpeakerEnable: !this.state.isSpeakerEnable});
  };

  _switchMicrophone = () => {
    const { openMicrophone } = this.state
    this._engine?.enableLocalAudio(!openMicrophone).then(() => {
        this.setState({ openMicrophone: !openMicrophone })
      }).catch((err) => {
        console.warn('enableLocalAudio', err)
      })
  }

// Switch the audio playback device.
  _switchSpeakerphone = () => {
      const { enableSpeakerphone } = this.state
      this._engine?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
          this.setState({ enableSpeakerphone: !enableSpeakerphone })
        }).catch((err) => {
          console.warn('setEnableSpeakerphone', err)
        })
    }
  render() {
    const { navigation } = this.props
    const {params, name, title, pict} = navigation.state.params

    return (
      <TemplateBackground cover={true}>
      <View style={styles.container}>
        <View style={styles.Main}>
          {/* <Image
            source={{
              uri: DataProfile && DataProfile.photo ? DataProfile.photo : '',
            }}
            style={{
              width: Screen.width * 0.4,
              height: Screen.width * 0.4,
              backgroundColor:
                DataProfile && DataProfile.photo ? null : 'purple',
              borderRadius: 100,
            }}
            resizeMode="cover"
            // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
          /> */}
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
              this.endCall();
              navigation.pop();
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
}

export default CallRoom;

const dimensions = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};