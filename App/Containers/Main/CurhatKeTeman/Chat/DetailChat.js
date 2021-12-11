import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Pressable,
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Pusher from 'pusher-js/react-native';

import API from '../../../../Services/Api';
import FixtureAPI from '../../../../Services/FixtureApi';
import DebugConfig from '../../../../Config/DebugConfig';

import TokenRedux from '../../../../Redux/Authentication/TokenRedux';

import pusherConfig from './pusher.json';
import metrics from '../../../../Themes/Metrics';
import { TemplateBackground } from '../../../../Components/TemplateBackground';
import images from '../../../../Themes/Images';
import { Screen } from '../../../../Transforms/Screen';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

function DetailChat(props) {
  const flatlistRef = useRef();
  const { navigation, token } = props
  const { pop } = navigation
  const {params} = props.navigation.state.params;
  const {id} = token.data.user;
  const [messages_array, setmessages_array] = useState([]);
  const [text, settext] = useState('');
  const [loading, setloading] = useState(true);
  const [isFetching, setisFetching] = useState(false);
  const [data, setdata] = useState([]);

  const onPressFunction = (index) => {
    flatlistRef.current.scrollToEnd({animating: true});
    // if (index === 'add') {
    //   flatlistRef.current.scrollToEnd({animating: true});
    // } else {
    //   flatlistRef.current.scrollToIndex({animating: true, index: index});
    // }
  };

  const send_message = () => {
    //check that the text input isnt empty
    if (text != '') {
      api
        .sendChat({
          id: params.friend.id,
          body: {
            message: text,
          },
          token: token.data.access_token,
        })
        .then((responseJson) => {
          // console.log('responseJson', responseJson.data.data);
          let message = [];
          messages_array.map((data) => message.push(data));
          message.push(responseJson.data.data);
          settext('');
          setmessages_array(message);
          onPressFunction('add');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    console.log(`params`, params)
    api
      .getChat({
        page: 1,
        limit: 50,
        id: params.id,
        token: token.data.access_token,
      })
      .then((success) => {
        // console.log(`success`, success.data.data);
        // this.setState({messages_array: success.data.data.rows.data});
        setdata(success.data.data);
        setmessages_array(success.data.data.rows.data.reverse());
        setloading(false);
        setTimeout(() => {
          onPressFunction();
        }, 1000);
      });
    //instantiate pusher
    const pusher = new Pusher(pusherConfig.key, {
      cluster: pusherConfig.cluster,
    });
    //subscribe to the public chat channel
    //user-notify di tambah id user yang saat ini login
    const my_channel = pusher.subscribe('user-notify-' + token.data.user.id);
    //bind and listen for chat events
    my_channel.bind('user-chat', (data) => {
      // console.log('data income ', data);
      let message = messages_array;
      message.push(data.chat);
      settext('');
      setmessages_array(message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps\
    return () => {
      console.log(`backto chat list`)
    }
  }, []);
  const onRefresh = () => {
    console.log(
      'data.current_page <= data.last_page',
      data.rows.current_page,
      data.rows.last_page,
    );
    if (data.rows.current_page <= data.rows.last_page) {
      setisFetching(true);
      api
        .getChat({
          page: data.rows.current_page + 1,
          limit: 50,
          id: params.id,
          token: token.data.access_token,
        })
        .then((success) => {
          // console.log(`success`, success.data.data.rows.data);
          // this.setState({messages_array: success.data.data.rows.data});
          setdata(success.data.data);
          let merge = success.data.data.rows.data.concat(messages_array);
          // console.log(`merge.length`, merge.length);
          setmessages_array(merge);
          setisFetching(false);
        })
        .catch((err) => setisFetching(false));
    }
  };
  // useEffect(() => {
  //   if (messages_array.length > 0) {
  //     setTimeout(() => {
  //       onPressFunction();
  //       setTimeout(() => {
  //         onPressFunction();
  //         setTimeout(() => {
  //           onPressFunction();
  //         }, 1000);
  //       }, 1000);
  //     }, 1000);
  //   }
  // }, [messages_array]);
  return (
    
  <TemplateBackground cover={true}>
    <Image source={images.bgChat} resizeMode="cover" style={styles.bgChat} />
    <View style={styles.container}>
      <View
        style={{
          // flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 12,
          paddingHorizontal:12,
          flexDirection:'row',
          height:Screen.height*0.05,
          // backgroundColor:'red'
        }}>
          <View style={{flexDirection:'row',width:'70%'}}>
            <TouchableOpacity onPress={()=> pop()}>
              <Image source={images.arrowBack} style={{width:20,height:20, tintColor:'white',marginRight:12}} resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={{color:'white',fontSize:16, fontWeight:'bold'}}>{params.friend.name}</Text>
          </View>
          { params?.friend?.photo ? (
              <Image
                source={{uri: params?.friend?.photo}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#662D91',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 14}}>
                  {params?.friend?.name.charAt(0)}
                </Text>
              </View>
            )}
      </View>
      <FlatList
        ref={flatlistRef}
        data={loading ? [] : messages_array}
        onRefresh={onRefresh}
        refreshing={isFetching}
        contentContainerStyle={{marginHorizontal:12}}
        ListEmptyComponent={
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={'red'} size={48} />
          </View>
        }
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          // console.log(`item`, item)
          // let picture =
          //   id === item.id_sender ? token.data.user.photo : params.friend.photo;
          // let name =
          //   id === item.id_sender ? token.data.user.name : params.friend.name;
          return (
            <View
              style={{
                alignItems: id === item.id_sender ? 'flex-end' : 'flex-start',
                marginVertical: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                {/* {id !== item.id_sender ? (
                  picture ? (
                    <Image
                      source={{uri: picture}}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#662D91',
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: 'white', fontSize: 14}}>
                        {name.charAt(0)}
                      </Text>
                    </View>
                  )
                ) : null} */}
                <View
                  style={{
                    flexDirection: 'column',
                    paddingHorizontal: 12,
                    alignItems:
                      id === item.id_sender ? 'flex-end' : 'flex-start',
                    backgroundColor:id !== item.id_sender ?'white':'#662D91',
                    padding:12,
                    borderRadius: 16
                  }}>
                  {/* <Text style={{fontWeight: 'bold'}}>{name}</Text> */}
                  <Text
                    style={{
                      maxWidth: metrics.screenWidth * 0.5,
                      textAlign: id === item.id_sender ? 'right' : 'left',
                      color:id !== item.id_sender ?'black':'white'
                    }}
                    numberOfLines={5}>
                    {item.message}
                  </Text>
                </View>
                {/* {id === item.id_sender ? (
                  picture ? (
                    <Image
                      source={{uri: picture}}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#662D91',
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: 'white', fontSize: 14}}>
                        {name.charAt(0)}
                      </Text>
                    </View>
                  )
                ) : null} */}
              </View>
            </View>
          );
        }}
      />
      {/* <Pressable android_ripple style={styles.button} onPress={onPressFunction}>
        <Text style={styles.arrow}>v</Text>
      </Pressable> */}
      <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
        <TextInput
          value={text}
          style={{width: '80%',backgroundColor:'#9A5EBA',alignSelf:'center',margin:8, borderRadius:16,color:'white',paddingHorizontal:8}}
          placeholderTextColor={'white'}
          placeholder="Enter Your message!"
          onChangeText={(text) => settext(text)}
        />
        <TouchableOpacity onPress={() => send_message()}>
          <Image source={images.sendChat} style={{width:40,height:40}}/>
        </TouchableOpacity>
      </View>
    </View>
</TemplateBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 72,
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  arrow: {
    fontSize: 36,
  },
  bgChat:{
    flex: 1,
    justifyContent: "center",
    opacity:0.5,
    position:'absolute'
  }
});

const mapStateToProps = (state) => {
  // console.log(`state.nav`, state.nav)
    return {
      token: state.token.payload
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(TokenRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(DetailChat)
