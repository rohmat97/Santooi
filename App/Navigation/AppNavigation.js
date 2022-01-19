import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CreateNewPassword from '../Containers/Auth/CreateNewPassword';
import {CreateNewPasswordSuccess} from '../Containers/Auth/CreateNewPasswordSuccess';
import {FirstLoginScreen} from '../Containers/Auth/FirstLoginScreen';
import ForgotPassword from '../Containers/Auth/ForgotPassword';
import LoginScreen from '../Containers/Auth/LoginScreen';
import SignUp from '../Containers/Auth/SignUp';
import SplashScreen from '../Containers/SplashScreen';
import MainScreen from '../Containers/Main/MainScreen';

import styles from './Styles/NavigationStyles';
import BerhitungYuk from '../Containers/Main/BerhitungYuk';
import JalanYuk from '../Containers/Main/JalanYuk';
import FotoFavorit from '../Containers/Main/FotoFavorit';
import KalimatBijak from '../Containers/Main/KalimatBijak';
import Konseling from '../Containers/Main/Konseling';
import KonselingWaiting from '../Containers/Main/KonselingWaiting';
import SelectKonseling from '../Containers/Main/SelectKonseling ';
import CurhatKeTeman from '../Containers/Main/CurhatKeTeman';
import CurhatKeTemanContact from '../Containers/Main/CurhatKeTeman/CurhatKeTemanContact';
import CurhatKeTemanContactDetail from '../Containers/Main/CurhatKeTeman/CurhatKeTemanContactDetail';
import FindUserByContact from '../Containers/Main/CurhatKeTeman/FindUserByContact';
import DetailAlbum from '../Containers/Main/Foto/DetailAlbum';
import CallRoom from '../Containers/Main/CurhatKeTeman/CallRoom';
import VideoRoom from '../Containers/Main/CurhatKeTeman/VideoRoom';
import DetailChat from '../Containers/Main/CurhatKeTeman/Chat/DetailChat';

// Manifest of possible screens
const AuthNavigator = createStackNavigator(
  {
    LaunchScreen: {screen: FirstLoginScreen},
    LoginScreen: {screen: LoginScreen},
    SignUpScreen: {screen: SignUp},
    ForgotPasswordScreen: {screen: ForgotPassword},
    CreateNewPasswordScreen: {screen: CreateNewPassword},
    CreateNewPasswordSuccessScreen: {screen: CreateNewPasswordSuccess},
    SplashScreen: {screen: SplashScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    MainScreen: {screen: MainScreen},
    BerhitungYuk: {screen: BerhitungYuk},
    JalanYuk: {screen: JalanYuk},
    FotoFavorit: {screen: FotoFavorit},
    KalimatBijak: {screen: KalimatBijak},
    Konseling: {screen: Konseling},
    KonselingWaiting: {screen: KonselingWaiting},
    SelectKonseling: {screen: SelectKonseling},
    CurhatKeTeman: {screen: CurhatKeTeman},
    CurhatKeTemanContact: {screen: CurhatKeTemanContact},
    CurhatKeTemanContactDetail: {screen: CurhatKeTemanContactDetail},
    DetailAlbum: {screen: DetailAlbum},
    CallRoom: {screen: CallRoom},
    VideoRoom: {screen: VideoRoom},
    FindUserByContact: {screen: FindUserByContact},
    DetailChat: {screen: DetailChat},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

const PrimaryNav = createSwitchNavigator(
  {
    // LaunchScreen: { screen: LaunchScreen },
    Auth: AuthNavigator,
    Main: MainNavigator,
    Splash: SplashScreen,
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Splash',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);
export default createAppContainer(PrimaryNav);
