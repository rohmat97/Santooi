import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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

function Chat(props) {
  const {navigation} = props;
  const {pop} = navigation;
  const [textChat, setTextChat] = useState(null);

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
                {navigation.state.params.nama}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 30,
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <View style={styles.containerSearch}>
              <TextInput
                style={{color: 'white',width: '90%'}}
                placeholder={'Text Message'}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={textChat}
                onChangeText={(text) => setTextChat(text)}
                keyboardType={'default'}
                // inputRef={(ref) => (this.number = ref)}
              />
            </View>
            <View style={{justifyContent: 'center', width: '10%', marginLeft: 10}}>
              <Image
                source={images.iconNext}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </TemplateBackground>
  );
}

export default connect(null, null)(Chat);
