import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FirstLoginScreen } from '../Containers/Auth/FirstLoginScreen';
import { LoginScreen } from '../Containers/Auth/LoginScreen';
import { YourName } from '../Containers/Auth/YourName';
import { Welcome } from '../Containers/Auth/Welcome';
import { PhoneNumber } from '../Containers/Auth/PhoneNumber';
import LaunchScreen from '../Containers/LaunchScreen'
import MainScreen from '../Containers/Main/MainScreen'

import styles from './Styles/NavigationStyles'
import { DateBirth } from '../Containers/Auth/DateBirth';

// Manifest of possible screens
const AuthNavigator = createStackNavigator({
  LaunchScreen: { screen: FirstLoginScreen },
  LoginScreen: { screen: LoginScreen },
  YourNameScreen: { screen:YourName },
  WelcomeScreen: { screen:Welcome },
  DateBirthScreen: { screen:DateBirth },
  PhoneNumberScreen: { screen:PhoneNumber }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const MainNavigator = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  MainScreen: { screen: MainScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const HomeNavigator = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const JurnalNavigator = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const AccountNavigator = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const KonselingNavigator = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const CurhatNavigator = createBottomTabNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

// const PrimaryNav = createSwitchNavigator({
//   // LaunchScreen: { screen: LaunchScreen },
//   Auth: AuthNavigator,
//   Main: MainNavigator,
// })
export default createAppContainer(AuthNavigator)
