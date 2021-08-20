import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
  ScrollView,
} from 'react-native';
import {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import {useInitializeAgora, useRequestAudioHook} from './Agora';
import styles from './styles';

const CallRoom = () => {
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
  } = useInitializeAgora();

  const renderVideos = () => {
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {renderRemoteVideos()}
      </View>
    ) : null;
  };

  const renderRemoteVideos = () => {
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.channelInputContainer}>
          <Text>Enter Channel Name:</Text>

          <TextInput
            style={styles.input}
            onChangeText={(text) => setChannelName(text)}
            placeholder={'Channel Name'}
            value={channelName}
          />
        </View>

        <View style={styles.max}>
          <View style={styles.max}>
            {/* <View style={styles.buttonHolder}>
            <TouchableOpacity
              onPress={joinSucceed ? leaveChannel : joinChannel}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {' '}
                {`${joinSucceed ? 'End' : 'Start'} Call`}{' '}
              </Text>
            </TouchableOpacity>
          </View> */}
            <View style={styles.joinLeaveButtonContainer}>
              <Button
                onPress={joinSucceed ? leaveChannel : joinChannel}
                title={`${joinSucceed ? 'End' : 'Start'} Call`}
              />
            </View>

            {renderVideos()}

            <View style={styles.floatRight}>
              <Button
                onPress={toggleIsMute}
                title={isMute ? 'UnMute' : 'Mute'}
              />
            </View>

            <View style={styles.floatLeft}>
              <Button
                onPress={toggleIsSpeakerEnable}
                title={isSpeakerEnable ? 'Disable Speaker' : 'Enable Speaker'}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CallRoom;
