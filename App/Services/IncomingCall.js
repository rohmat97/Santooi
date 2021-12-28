
 
import { Alert, DeviceEventEmitter, Linking, Platform } from 'react-native';
import IncomingCall from 'react-native-incoming-call';
import RNCallKeep from 'react-native-callkeep';

import API from '../Services/Api';
const api =  API.create();
export function handleRemoteMessage(remoteMessage) {
  console.log(`remoteMessage bgtask`, remoteMessage)
    if (Platform.OS === 'android') {
      if(remoteMessage?.data?.title === 'incoming_call') {
        IncomingCall.display(
          'callUUIDv4', // Call rrrUUID v4
          remoteMessage.notification.title, // Username
          'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg', // Avatar URL
          remoteMessage.notification.body, // Info text
          20000, // Timeout for end call after 20s
        ); 
      }
      const data = JSON.parse(remoteMessage?.data?.data)
      // console.log(`data handleRemoteMessage`, data)
      const nav = data?.call_detail?.type
      DeviceEventEmitter.addListener('endCall', (payload) => {
        console.log('endCall', payload);
      });
      DeviceEventEmitter.addListener('answerCall', (payload) => {
        console.log(`answer call close app`)
        if (payload.isHeadless) {
          IncomingCall.openAppFromHeadlessMode(payload.uuid);
          if(nav === 'v_call'){
            Linking.openURL('santooi://VideoRoom?'+JSON.stringify(data))
          }
          if(nav === 'call'){
            Linking.openURL('santooi://CallRoom?'+JSON.stringify(data))
          }
          if(nav === 'chat'){

          }
        } else {
          IncomingCall.backToForeground();
        }
      });
    } else {
        if(remoteMessage?.data?.title === 'incoming_call') {
        const data = JSON.parse(remoteMessage?.data?.data)
        // console.log(`data handleRemoteMessage`, data)
        const nav = data?.call_detail?.type
        RNCallKeep.displayIncomingCall(
          '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          remoteMessage?.data?.body,
          remoteMessage.notification.title,
          'number',
          false,
        );
        RNCallKeep.addEventListener('didActivateAudioSession', () => {
          RNCallKeep.answerIncomingCall('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
          RNCallKeep.rejectCall('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
          RNCallKeep.endAllCalls();
          RNCallKeep.endCall('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
          // you might want to do following things when receiving this event:
          // - Start playing ringback if it is an outgoing call
        });
        RNCallKeep.addEventListener('answerCall', ({callUUID}) => {
          RNCallKeep.answerIncomingCall(callUUID);
          RNCallKeep.rejectCall(callUUID);
          RNCallKeep.endAllCalls();
          RNCallKeep.endCall(callUUID);
          console.log(`callUUID`, callUUID)
          // Do your normal `Answering` actions here.
            RNCallKeep.backToForeground();
            if(nav === 'v_call'){
              Linking.openURL('santooi://VideoRoom?'+JSON.stringify(data))
            }
            if(nav === 'call'){
              Linking.openURL('santooi://CallRoom?'+JSON.stringify(data))
            }
        });
      }    
      if(remoteMessage?.data?.title  === 'chat'){
        let data = JSON.parse(remoteMessage?.data?.data) 
        let params = {
            id: data?.chat_detail?.id_user_friend,
            friend: data
        }
        // console.log(`params`, params)
        Linking.openURL('santooi://DetailChat?'+JSON.stringify(params))
    }
    }
  }

export function CallIncoming(navigate, remoteMessage, token ){

  const data = JSON.parse(remoteMessage?.data?.data)
    if (Platform.OS === 'android') {
      if(remoteMessage?.data?.title === 'incoming_call') {
        IncomingCall.display(
          'callUUIDv4', // Call rrrUUID v4
          remoteMessage.notification.title, // Username
          'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg', // Avatar URL
          remoteMessage.notification.body, // Info text
          20000, // Timeout for end call after 20s
        ); 
      }
     
      DeviceEventEmitter.addListener('answerCall', async(payload) => {

      console.log(`data`, data)
      console.log(`payload`, payload)
        await api.checkUserCall({
          id: data?.user?.id,
          type: data?.call_detail?.type,
          status: 'pickup',
          token: token?.data?.access_token,
        }).then(
          success =>{
            console.log(`success CallIncoming ANDROID`, success.data)
            if(success.data.status === true){
              if(data?.call_detail?.type === 'v_call'){
                navigate('VideoRoom',{
                  params: data, 
                  name: data?.user?.name,
                  title: data?.user?.name?.charAt(0),
                  pict: data?.user?.photo?.url,
                });
              }else if(data?.call_detail?.type === 'call'){
                navigate('CallRoom', {
                  params: data, 
                  name: data?.friend?.user?.name,
                  title: data?.friend?.user?.name?.charAt(0),
                  pict: data?.friend?.user?.photo?.url,
                });
              }
            }else{
              Alert.alert('',success.data)
            }
          }
        ).catch(err =>{
          console.log(`err`, err)
        })
        // console.log(`payload`, payload)
      });
    } else {
      RNCallKeep.displayIncomingCall(
        '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        remoteMessage.notification.body,
        remoteMessage.notification.title,
        'number',
        false,
      );
      RNCallKeep.addEventListener('answerCall', async({callUUID}) => {
        // navigator.navigate('jitsi', {link: notification.data.link});
        console.log(`data?.call_detail`, data?.call_detail)
        await api.checkUserCall({
          id: data?.user?.id,
          type: data?.call_detail?.type,
          status: 'pickup',
          token: token?.data?.access_token,
        }).then(
          success =>{
            console.log(`success CallIncoming`, success.data)
            if(success.data.status === true){
              if(data?.call_detail?.type === 'v_call'){
                navigate('VideoRoom',{
                  params: data, 
                  name: data?.user?.name,
                  title: data?.user?.name?.charAt(0),
                  pict: data?.user?.photo?.url,
                });
              }else if(data?.call_detail?.type === 'call'){
                navigate('CallRoom', {
                  params: data, 
                  name: data?.user?.name,
                  title: data?.user?.name?.charAt(0),
                  pict: data?.user?.photo?.url,
                });
              }
            }else{
              console.log(`success CallIncoming`, success.data)
              // Alert.alert('',success.data)
            }
          }
        ).catch(err =>{
          console.log(`err`, err)
        })
        console.log(`answerCall`)
        RNCallKeep.rejectCall(callUUID);
        RNCallKeep.endAllCalls();
        RNCallKeep.endCall(callUUID);
        
      });
    }
  }