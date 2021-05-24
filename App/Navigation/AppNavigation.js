import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CreateNewPassword  from '../Containers/Auth/CreateNewPassword';
import { CreateNewPasswordSuccess } from '../Containers/Auth/CreateNewPasswordSuccess';
import { FirstLoginScreen } from '../Containers/Auth/FirstLoginScreen';
import ForgotPassword  from '../Containers/Auth/ForgotPassword';
import LoginScreen  from '../Containers/Auth/LoginScreen';
import SignUp from '../Containers/Auth/SignUp';
import SplashScreen from '../Containers/SplashScreen'
import MainScreen from '../Containers/Main/MainScreen'

import styles from './Styles/NavigationStyles'
import BerhitungYuk from '../Containers/Main/BerhitungYuk';
import JalanYuk from '../Containers/Main/JalanYuk';
import FotoFavorit from '../Containers/Main/FotoFavorit';

// Manifest of possible screens
const AuthNavigator = createStackNavigator({
  LaunchScreen: { screen: FirstLoginScreen },
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUp },
  ForgotPasswordScreen: { screen: ForgotPassword },
  CreateNewPasswordScreen: { screen: CreateNewPassword },
  CreateNewPasswordSuccessScreen: { screen: CreateNewPasswordSuccess },
  SplashScreen: {screen: SplashScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const MainNavigator = createStackNavigator({
  MainScreen: { screen: MainScreen },
  BerhitungYuk: { screen: BerhitungYuk },
  JalanYuk: { screen: JalanYuk },
  FotoFavorit: { screen: FotoFavorit },
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimaryNav = createSwitchNavigator({
  // LaunchScreen: { screen: LaunchScreen },
  Auth: AuthNavigator,
  Main: MainNavigator,
  Splash:SplashScreen
},{
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Splash',
  navigationOptions: {
    headerStyle: styles.header
  }
})
export default createAppContainer(PrimaryNav)
