import './App/Config/ReactotronConfig'
import { Alert, AppRegistry } from 'react-native'
import App from './App/Containers/App'

import OverlayPermissionModule from 'rn-android-overlay-permission';
import RNCallKeep from 'react-native-callkeep';

if (Platform.OS === 'android') {
    OverlayPermissionModule.isRequestOverlayPermissionGranted((status) => {
      // if (status) {
      //   Alert.alert(
      //     'Permissions',
      //     'Overlay Permission',
      //     [
      //       {
      //         text: 'Cancel',
      //         onPress: () => console.log('Cancel Pressed'),
      //         style: 'cancel',
      //       },
      //       {
      //         text: 'OK',
      //         onPress: () => OverlayPermissionModule.requestOverlayPermission(),
      //       },
      //     ],
      //     {cancelable: false},
      //   );
      // }
    });
  } else {
    const options = {
      ios: {
        appName: 'Santooi',
      },
    };
    RNCallKeep.setup(options).then((accepted) => {});
  }

AppRegistry.registerComponent('Santooi', () => App)
