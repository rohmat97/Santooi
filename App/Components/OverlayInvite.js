import React, {useState} from 'react';
import {
  FlatList,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Divider, Image, Overlay, Text} from 'react-native-elements';
import {Colors, Images} from '../Themes';
import {Screen} from '../Transforms/Screen';
import images from '../Themes/Images';
import {RadioButton} from 'react-native-paper';
export const OverlayInvite = ({visible, toggleOverlay}) => {
  return (
    <Overlay
      isVisible={visible}
      // onBackdropPress={toggleOverlay}
      overlayStyle={{
        width: Screen.width * 0.9,
        borderRadius: 20,
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

      <View
        style={{
          height: 1,
          width: '100%',
          borderRadius: 1,
          borderWidth: 1,
          borderColor: '#D9078D',
          borderStyle: 'dashed',
          zIndex: 0,
          marginVertical: 30,
        }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 1,
            backgroundColor: 'white',
            zIndex: 1,
          }}
        />
      </View>

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
