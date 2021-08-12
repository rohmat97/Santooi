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
import {CustomBottomTab2} from '../../Components/CustomBottomTab2';

function CurhatKeTeman(props) {
  const {navigation} = props;
  const {pop} = navigation;
  const [conselingCode, setConselingCode] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  let x = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
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
                Curhat ke Teman
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CurhatKeTemanContact')}>
            <Image
              source={images.newMessage}
              style={{
                width: Screen.width * 0.3,
                height: 40,
                alignSelf: 'flex-end',
                marginBottom: 20,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ScrollView style={{marginBottom: Screen.height * 0.1}}>
            {x.map((e, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat', {nama: 'Nissa'})}
                key={index}
                style={{
                  flexDirection: 'row',
                  height: 80,
                  justifyContent: 'center',
                }}>
                <Image
                  source={images.pp}
                  style={{width: 50, height: 50}}
                  resizeMode="contain"
                />

                <View style={{marginLeft: 20, flex: Screen.width * 0.8}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>
                        Nissa
                      </Text>
                      <Text style={{color: 'white'}}>Ok</Text>
                    </View>
                    <View style={{marginEnd: 10}}>
                      <Text style={{color: 'white', fontSize: 13}}>07.00</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      borderRadius: 1,
                      borderWidth: 0.5,
                      borderColor: 'white',
                      zIndex: 0,
                      marginVertical: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <CustomBottomTab2 />
    </TemplateBackground>
  );
}

export default connect(null, null)(CurhatKeTeman);
