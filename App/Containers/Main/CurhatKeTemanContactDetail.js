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

function CurhatKeTemanContactDetail(props) {
  const {navigation} = props;
  const {nama} = navigation.state.params;
  const {pop} = navigation;
  const [conselingCode, setConselingCode] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
            // onPress={() => pop()}
            >
              <Text
                style={{
                  color: '#67308F',
                  marginLeft: 15,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={images.pp}
            style={{width: 100, height: 100, alignSelf: 'center'}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontWeight: '500',
              color: 'white',
              fontSize: 30,
              textAlign: 'center',
              marginTop: 10,
            }}>
            {nama}
          </Text>
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
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat', {nama: nama})}
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
            <Text style={{color: 'white'}}>+62 89709657689</Text>
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
            <Text style={{color: 'white'}}>nissa@gmail.com</Text>
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

export default connect(null, null)(CurhatKeTemanContactDetail);
