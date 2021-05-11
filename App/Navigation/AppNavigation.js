import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { CreateNewPassword } from '../Containers/Auth/CreateNewPassword';
import { CreateNewPasswordSuccess } from '../Containers/Auth/CreateNewPasswordSuccess';
import { FirstLoginScreen } from '../Containers/Auth/FirstLoginScreen';
import { ForgotPassword } from '../Containers/Auth/ForgotPassword';
import { LoginScreen } from '../Containers/Auth/LoginScreen';
import { SignUp } from '../Containers/Auth/SignUp';
import LaunchScreen from '../Containers/LaunchScreen'
import MainScreen from '../Containers/Main/MainScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const AuthNavigator = createStackNavigator({
  LaunchScreen: { screen: FirstLoginScreen },
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUp },
  ForgotPasswordScreen: { screen: ForgotPassword },
  CreateNewPasswordScreen: { screen: CreateNewPassword },
  CreateNewPasswordSuccessScreen: { screen: CreateNewPasswordSuccess },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const MainNavigator = createStackNavigator({
  MainScreen: { screen: MainScreen }
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
},{
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Main',
  navigationOptions: {
    headerStyle: styles.header
  }
})
export default createAppContainer(PrimaryNav)
