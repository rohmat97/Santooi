import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Contacts from 'react-native-contacts';
import TokenRedux from '../../../Redux/Authentication/TokenRedux';

import API from '../../../Services/Api';
import FixtureAPI from '../../../Services/FixtureApi';
import DebugConfig from '../../../Config/DebugConfig';

import {TemplateBackground} from '../../../Components/TemplateBackground';
import images from '../../../Themes/Images';
import styles from '../../Styles/LaunchScreenStyles';
import {Screen} from '../../../Transforms/Screen';
import {connect} from 'react-redux';
import Images from '../../../Themes/Images';
import RoundedButton from '../../../Components/RoundedButton';
import {Fonts, Colors, Metrics} from '../../../Themes';
import {OverlayInvite} from '../../../Components/OverlayInvite';
import {OverlayPhone} from '../../../Components/OverlayPhone';
import {bindActionCreators} from 'redux';
import {FlatList} from 'react-native';
import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
import { Alert } from 'react-native';
import { filter } from 'lodash';

const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
function FindUserByContact(props) {
  const {navigation, token} = props;
  const {pop} = navigation;
  const [search, setsearch] = useState('');
  const [listFriend, setListFriend] = useState([]);
  const [listContact, setlistContact] = useState([]);
  const [visiblePhone, setVisiblePhone] = useState(false);
  const toggleOverlayPhone = () => {
    setVisiblePhone(!visiblePhone);
  };

  const [visibleInvite, setVisibleInvite] = useState(false);
  const toggleOverlayInvite = () => {
    setVisibleInvite(!visibleInvite);
  };

  let newName = '';

  const RequestContact = ()=>{
    if(Platform.OS==='android'){
      request(PERMISSIONS.ANDROID.READ_CONTACTS).then(async(result) => {
        Contacts.getAll().then(async contacts => {
          // update the first record
          let localcontact =[]
          await contacts.map(dat=>{
            if(dat.displayName&&dat.displayName.length>0&&dat.phoneNumbers){
              localcontact.push({
                // "company": dat.company, 
                // "department": dat.department, 
                "displayName": dat.displayName&&dat.displayName, 
                // "emailAddresses": dat.emailAddresses, 
                // "familyName": dat.familyName, 
                // "givenName": dat.givenName, 
                // "hasThumbnail": dat.hasThumbnail, 
                // "imAddresses": dat.imAddresses, 
                // "jobTitle": dat.jobTitle, 
                // "middleName": dat.middleName, 
                // "note": dat.note, 
                "phoneNumbers": dat.phoneNumbers, 
                // "postalAddresses": dat.postalAddresses, 
                // "prefix": dat.prefix, 
                // "rawContactId": dat.rawContactId, 
                // "recordID": dat.recordID, 
                // "suffix": dat.suffix, 
                // "thumbnailPath": dat.thumbnailPath, 
                // "urlAddresses": dat.urlAddresses
              })
            }
          })
          const data = localcontact.sort((a,b)=>{
            if(a.displayName && b.displayName && a.displayName.toLowerCase() > b.displayName.toLowerCase()){
                return 1;
            }
            if(a.displayName && b.displayName && a.displayName.toLowerCase() < b.displayName.toLowerCase()){
                return -1;
            }
            return 0;
       });
          // console.log(`contacts`, contacts[0])
          setListFriend(data)
          setlistContact(data)
        })
      });
    }else{
      request(PERMISSIONS.IOS.CONTACTS).then((result) => {
        // console.log('sucess', result)
        Contacts.getAll().then(async contacts => {
            // update the first record
            // console.log(`contacts`, contacts)
            let localcontact =[]
            await contacts.map(dat=>{
              console.log(dat)
              if((dat.familyName||dat.givenName)&&dat.phoneNumbers){
                if(dat.familyName&&dat.familyName.length>1){
                  localcontact.push({
                    "displayName":dat.familyName+' '+dat.givenName,
                    "phoneNumbers": dat.phoneNumbers,
                  })
                }else{
                  localcontact.push({
                    "displayName":dat.givenName,
                    "phoneNumbers": dat.phoneNumbers,
                  })
                }
                  
              }
            })
            const data = localcontact.sort((a,b)=>{
              if(a.displayName && b.displayName && a.displayName.substring(0, 1).toLowerCase() > b.displayName.substring(0, 1).toLowerCase()){
                  return 1;
              }
              if(a.displayName && b.displayName && a.displayName.substring(0, 1).toLowerCase() < b.displayName.substring(0, 1).toLowerCase()){
                  return -1;
              }
              return 0;
         });
            setListFriend(data)
            setlistContact(data)
        })
      });
    }
  }
  useEffect(() => {
    RequestContact()
  }, []);

  useEffect(() => {
    if(search && search.length>0){
      let filter = listContact.filter(data => {return data.displayName&& data.displayName.toLowerCase().indexOf(search.toLowerCase()) >= 0})
        // console.log(filter)
      setListFriend(filter)
    }else if(search.length<1){
      setListFriend(listContact)
    }
  }, [search])
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

          <View style={styles.containerSearch}>
            <Image
              source={images.search}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
            <TextInput
              style={{color: 'white', flex: 1, marginLeft: 10}}
              placeholder={'Search Contact'}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={search}
              onChangeText={(text) => setsearch(text)}
              keyboardType={'default'}
            />
          </View>

          <ScrollView>
            {listFriend.length > 0 ? (
              <FlatList
                data={listFriend}
                contentContainerStyle={{height:'100%',paddingBottom:100}}
                renderItem={({item, index}) => {
                  let exist = false;

                  if (index === 0) {
                    newName = item && item.displayName &&item.displayName.substring(0, 1).toUpperCase();
                    exist = true;
                  } else {
                    if (item && item.displayName &&item.displayName.substring(0, 1).toLowerCase() !== newName.toLowerCase()) {
                      newName = item && item.displayName &&item.displayName.substring(0, 1).toUpperCase();
                      exist = true;
                    }
                  }
                  return (
                    <View key={index}>
                      {exist && (
                        <View
                          style={{
                            backgroundColor: '#67308F',
                            width: Screen.width,
                            paddingVertical: 5,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                            marginLeft: -15,
                          }}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            {item.displayName.substring(0, 1).toUpperCase()}
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity
                        onPress={() =>{
                          // console.log(item.phoneNumbers[0].number)
                          api.findFriend({
                            no: item.phoneNumbers.length>0&&item.phoneNumbers[0].number,
                            token: token.data.access_token,
                          })
                            .then((res) => {

                              console.log('addfriend',res.data.data.rows[0])
                              if (res.data.data.rows.length > 0) {
                                // alert('user found')
                                // toggleOverlayPhone()
                                navigation.navigate('CurhatKeTemanContactDetail', {
                                  params: res.data.data.rows[0],
                                  local: true
                                });
                              } else {
                                console.log(res.data)
                                Alert.alert('','User belum terdaftar pada aplikasi Santooi');
                              }
                            })
                            .catch((err) => console.log("error",err))
                        }
                          // navigation.navigate('CurhatKeTemanContactDetail', {
                          //   nama: item.displayName,
                          // })
                        }>
                        <Text style={{color: 'white'}}>{item.displayName}</Text>
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
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#67308F',
                    width: Screen.width,
                    paddingVertical: 1,
                    paddingHorizontal: 20,
                    marginBottom: 20,
                    marginLeft: -15,
                  }}
                />
                <Text style={{color: 'white', fontSize: 32}}>
                  Belum Ada Teman
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
        <OverlayPhone
          api={api.findFriend}
          token={token.data.access_token}
          visible={visiblePhone}
          toggleOverlay={toggleOverlayPhone}
          navigation={navigation}
        />
        <OverlayInvite
          visible={visibleInvite}
          token={token}
          toggleOverlay={toggleOverlayInvite}
        />
      </View>
    </TemplateBackground>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token.payload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenRedux), dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindUserByContact);
