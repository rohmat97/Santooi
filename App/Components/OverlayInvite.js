import React, {useState} from 'react';
import {
  FlatList,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {Divider, Image, Overlay, Text} from 'react-native-elements';
import {Colors, Images} from '../Themes';
import {Screen} from '../Transforms/Screen';
import images from '../Themes/Images';
import {RadioButton} from 'react-native-paper';
export const OverlayInvite = ({visible, toggleOverlay, token}) => {
  // console.log('token',token.data.user.id)
  return (
    <Overlay
      isVisible={visible}
      // onBackdropPress={toggleOverlay}
      overlayStyle={{
        width: Screen.width * 0.9,
        borderRadius: 20,
        minHeight: Screen.height * 0.22,
        padding: Screen.width * 0.05,
      }}>
      <TouchableOpacity
        onPress={toggleOverlay}
        style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
        <Image
          source={images.close}
          style={{width: 15, height: 15}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `sms:?body=I'm on Santooi as ${token.data.user.name}. Install the app to follow my account,  https://happiness-api.demoapp.xyz/invite/${token.data.user.id}`,
          )
        }>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={images.messageOverlay}
            style={{width: 25, height: 25}}
            resizeMode="contain"
          />
          <Text
            style={{
              color: '#67308F',
              fontWeight: '500',
              marginLeft: 10,
              fontSize: 15,
            }}>
            Message
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <Image
          source={images.messageOverlay}
          style={{width: 25, height: 25}}
          resizeMode="contain"
        />
        <Text
          style={{
            color: '#67308F',
            fontWeight: '500',
            marginLeft: 10,
            fontSize: 15,
            alignSelf: 'center',
          }}>
          Message
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `mailto:example@gmail.com?subject=example&body=I'm on Santooi as ${token.data.user.name}. Install the app to follow my account,  https://happiness-api.demoapp.xyz/invite/${token.data.user.id}`,
          )
        }>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={images.mail}
            style={{width: 25, height: 25}}
            resizeMode="contain"
          />
          <Text
            style={{
              color: '#67308F',
              fontWeight: '500',
              marginLeft: 10,
              fontSize: 15,
            }}>
            Mail
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Image
          source={images.mail}
          style={{width: 25, height: 25}}
          resizeMode="contain"
        />
        <Text
          style={{
            color: '#67308F',
            fontWeight: '500',
            marginLeft: 10,
            fontSize: 15,
            alignSelf: 'center',
          }}>
          Mail
        </Text>
      </View>
    </Overlay>
  );
};

const style = StyleSheet.create({
  borderShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 4,
  },
  icon: {width: 35, height: 40, margin: Screen.width * 0.05},
});
