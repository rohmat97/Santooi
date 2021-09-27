/* eslint-disable react-native/no-inline-styles */
import React, {createRef} from 'react';
import Pusher from 'pusher-js/react-native';

import pusherConfig from './Chat/pusher.json';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import API from '../../../Services/Api';
import FixtureAPI from '../../../Services/FixtureApi';
import DebugConfig from '../../../Config/DebugConfig';

import Metrics from '../../../Themes/Metrics';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
export default class SampleChat extends React.Component {
  flatList = createRef();
  //load constructor
  constructor(props) {
    super(props);
    //declare an array of messages
    // declare initial states
    this.state = {
      messages_array: [],
      text: '',
      credential: [],
    };
  }

  componentDidMount() {
    // console.log(
    //   'componentDidMount',
    //   this.props.navigation.state.params.token.data,
    // );
    api
      .getChat({
        page: 1,
        limit: 10,
        id: this.props.navigation.state.params.params.id,
        token: this.props.navigation.state.params.token.data.access_token,
      })
      .then((success) => {
        console.log(`success`, success.data.data.rows.data);
        this.setState({messages_array: success.data.data.rows.data});

        this.flatList.current.scrollToEnd();
      });
    //instantiate pusher
    const pusher = new Pusher(pusherConfig.key, {
      cluster: pusherConfig.cluster,
    });
    //subscribe to the public chat channel
    //user-notify di tambah id user yang saat ini login
    const my_channel = pusher.subscribe(
      'user-notify-' + this.props.navigation.state.params.token.data.user.id,
    );
    //bind and listen for chat events
    my_channel.bind('user-chat', (data) => {
      // console.log('data income ', data);
      let message = this.state.messages_array;
      message.push(data.chat);
      this.setState({
        text: '',
        messages_array: message,
      });
    });
  }

  send_message() {
    //check that the text input isnt empty
    if (this.state.text != '') {
      api
        .sendChat({
          id: this.props.navigation.state.params.params.friend.id,
          body: {
            message: this.state.text,
          },
          token: this.props.navigation.state.params.token.data.access_token,
        })
        .then((responseJson) => {
          // console.log('responseJson', responseJson.data.data);
          let message = [];
          message.push(responseJson.data.data);
          this.state.messages_array.map((data) => message.push(data));
          this.setState({text: '', messages_array: message});
          this.flatList.current.scrollToIndex({animated: true, index: 20});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  //render function that actually shows the page
  render() {
    //execute the loop function and store its response into a variable
    const {id} = this.props.navigation.state.params.token.data.user;
    return (
      <View style={{flex: 1, marginTop: 40, marginHorizontal: 12}}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              {this.props.navigation.state.params.params.friend.name}
            </Text>
            {/* {this.loop()} */}
            <FlatList
              keyExtractor={(item) => item._id}
              style={{flex: 1}}
              ref={this.flatList}
              data={this.state.messages_array}
              inverted={true}

              scrollEnabled={true}
              renderItem={({item, index}) => {
                // console.log(`item`, item)
                let picture =
                  id === item.id_sender
                    ? this.props.navigation.state.params.token.data.user.photo
                    : this.props.navigation.state.params.params.friend.photo;
                let name =
                  id === item.id_sender
                    ? this.props.navigation.state.params.token.data.user.name
                    : this.props.navigation.state.params.params.friend.name;
                return (
                  <View
                    style={{
                      alignItems:
                        id === item.id_sender ? 'flex-end' : 'flex-start',
                      marginVertical: 12,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      {id !== item.id_sender ? (
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
                      ) : null}
                      <View
                        style={{
                          flexDirection: 'column',
                          paddingHorizontal: 12,
                          alignItems:
                            id === item.id_sender ? 'flex-end' : 'flex-start',
                        }}>
                        <Text style={{fontWeight: 'bold'}}>{name}</Text>
                        <Text
                          style={{
                            maxWidth: Metrics.screenWidth * 0.5,
                            textAlign: id === item.id_sender ? 'right' : 'left',
                          }}
                          numberOfLines={5}>
                          {item.message}
                        </Text>
                      </View>
                      {id === item.id_sender ? (
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
                      ) : null}
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        <View>
          <TextInput
            value={this.state.text}
            style={{width: '80%'}}
            placeholder="Enter Your message!"
            onChangeText={(text) => this.setState({text})}
          />
          <Button onPress={() => this.send_message()} title="send text" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bubble_you: {
    color: '#fff',
    backgroundColor: '#00b0ff',
    width: '50%',
    borderRadius: 25,
    padding: 7,
    marginBottom: 2,
  },
});
