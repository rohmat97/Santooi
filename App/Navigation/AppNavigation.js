import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LaunchScreen from '../Containers/LaunchScreen'
import MainScreen from '../Containers/Main/MainScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const AuthNavigator = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen }
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
},{
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimaryNav = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  Auth: AuthNavigator,
  Main: MainNavigator,
},{
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})
export default createAppContainer(PrimaryNav)
