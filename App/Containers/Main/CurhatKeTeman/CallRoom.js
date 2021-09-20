import React, { useEffect, useState } from 'react';
import {SafeAreaView, View, Text, TextInput, Button} from 'react-native';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TemplateBackground } from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import { Screen } from '../../../Transforms/Screen';
import {useInitializeAgora, useRequestAudioHook} from './Agora';
import styles from './styles';

function CallRoom (props){
  const {navigation, token} = props;
  const {nama, params} = navigation.state.params;

  const [DataProfile, setDataProfile] = useState()
  useRequestAudioHook();
  const {
    channelName,
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    setChannelName,
    joinChannel,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
  } = useInitializeAgora(params.agora.app_id,params.agora.token);

  useEffect(() => {
    console.log('params call', params)
    setDataProfile(params)
    setChannelName(params.agora.channel)
    joinChannel()
  }, [])
  return (
    <TemplateBackground cover={true}>
      <View style={styles.container}>
        <View style={styles.Main}>
            <Image
                source={{uri: DataProfile&& DataProfile.photo?DataProfile.photo:''}}
                style={{
                  width: Screen.width * 0.4,
                  height: Screen.width * 0.4,
                  backgroundColor:DataProfile&&DataProfile.photo?null:'purple',
                  borderRadius:100
                }}
                resizeMode="cover"
                // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
            /> 
            <Text style={{color:'white', fontSize:32}}>Teddy bear</Text> 
            {peerIds.length<2 && <Text style={{color:'white', fontSize:22, marginTop:50}}> Calling ...</Text>}
        </View>
        <View style={styles.BottomFeature}>
          <TouchableOpacity 
            onPress={()=>{
              toggleIsSpeakerEnable()
            }}
          > 
            <Image
                source={images.Sound}
                style={{
                  width: Screen.width * 0.08,
                  height: Screen.width * 0.08,
                  opacity: isSpeakerEnable?1:0.5
                }}
                resizeMode='contain'
                // containerStyle={{opacity:dataDetail.is_friend?1:0.5}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> {
              leaveChannel()
              navigation.pop()
            }}
            > 
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
            onPress={()=> toggleIsMute()}
          > 
            <Image
              source={images.Mic}
              style={{
                width: Screen.width * 0.08,
                height: Screen.width * 0.08,
              }}
              resizeMode="contain"
              containerStyle={{opacity:isMute?1:0.5}}
            />
          </TouchableOpacity> 
        </View>
       
        {/* <View style={styles.channelInputContainer}>
          <Text>Enter Channel Name:</Text>

          <TextInput
            style={styles.input}
            // onChangeText={(text) => setChannelName(params.agora.channel)}
            placeholder={'Channel Name'}
            value={channelName}
          />
        </View>

        <View style={styles.joinLeaveButtonContainer}>
          <Button
            onPress={()=>joinSucceed ? leaveChannel() : joinChannel()}
            title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
          />
        </View>

        <View style={styles.floatRight}>
          <Button onPress={toggleIsMute} title={isMute ? 'UnMute' : 'Mute'} />
        </View>

        <View style={styles.floatLeft}>
          <Button
            onPress={toggleIsSpeakerEnable}
            title={isSpeakerEnable ? 'Disable Speaker' : 'Enable Speaker'}
          />
        </View>

        <View style={styles.usersListContainer}>
          {peerIds.map((peerId) => {
            return (
              <View key={peerId}>
                <Text>{`Joined User ${peerId}`}</Text>
              </View>
            );
          })}
        </View> */}
      </View>
    </TemplateBackground>
  );
};

export default CallRoom;
