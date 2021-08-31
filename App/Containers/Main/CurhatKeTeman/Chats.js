import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TemplateBackground} from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import styles from '../../Styles/LaunchScreenStyles';
import {Screen} from '../../../Transforms/Screen';
import {CustomBottomTab2} from '../../../Components/CustomBottomTab2';
import {Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export const  Chats = ({props,page,SetPage}) => {
  const {navigation} = props;
  const {pop} = navigation;
  let x = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      return (
        <TemplateBackground cover={true}>
          <View style={styles.mainContainer}>
            <View style={styles.section}>
              <View style={{flexDirection: 'row'}}>
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
                onPress={() => navigation.navigate('CurhatKeTemanContact')}
                style={{
                  alignSelf: 'flex-end',
                  marginBottom: 20,
                }}>
                <Image
                  source={images.newMessage}
                  style={{height: 40, width: Screen.width * 0.3}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <FlatList
                data={x}
                style={{marginBottom: Screen.height * 0.2}}
                renderItem={(e, index) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Chat', {nama: 'Nissa'})}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <LinearGradient
                      colors={['#DB068D', '#6F2A91']}
                      style={{borderRadius: 100, width: 40, height: 40}}>
                      <Avatar
                        rounded
                        size="medium"
                        // title={'Nissa'}
                        // source={{
                        //   uri:ImageProfile?ImageProfile:'',
                        // }}
                        containerStyle={
                          {
                            // marginRight:8,
                            // borderWidth:1,
                            // borderTopColor:'#DB068D',
                            // borderLeftColor:'#DB068D',
                            // borderRightColor:'#6F2A91',
                            // borderBottomColor:'#6F2A91',
                          }
                        }
                      />
                    </LinearGradient>
    
                    <View style={{marginLeft: 20, flex: 1}}>
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
                          marginVertical: 12,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <CustomBottomTab2 page={page} SetPage={SetPage}/>
        </TemplateBackground>
      );
}
