import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FirstLoginScreen } from '../Containers/Auth/FirstLoginScreen';
import { LoginScreen } from '../Containers/Auth/LoginScreen';
import { YourName } from '../Containers/Auth/YourName';
import LaunchScreen from '../Containers/LaunchScreen'
import MainScreen from '../Containers/Main/MainScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const AuthNavigator = createStackNavigator({
  LaunchScreen: { screen: FirstLoginScreen },
  LoginScreen: { screen: LoginScreen },
  YourNameScreen: { screen: YourName },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const MainNavigator = createStackNavigator({
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

const PrimaryNav = createSwitchNavigator({
  // LaunchScreen: { screen: LaunchScreen },
  Auth: AuthNavigator,
  Main: MainNavigator,
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
