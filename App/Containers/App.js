import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'

import FlashMessage from "react-native-flash-message";
// create our store
const store = createStore()
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native'

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

 function App() {
  
  return (
    <Provider store={store} uriPrefix={'santooi://'}>
      <RootContainer/>
      <FlashMessage position="bottom" /> 
    </Provider>
  )
}
// class App extends Component {
//   componentDidMount(){
//     requestUserPermission()
//   }
//   render () {
   
//   }
// }

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
