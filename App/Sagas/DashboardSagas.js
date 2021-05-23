import { call, put } from 'redux-saga/effects'
import EmoticonRedux from '../Redux/Dashboard/EmoticonRedux'
import { Alert } from 'react-native'

export function * getEmoticon(api, action) {
  // make the call to the api
  // console.log(action.data)
  const response = yield call(api.getEmoticon, action.data)
  // console.log('response',response)
  if (response.ok) {
    yield put(EmoticonRedux.EmoticonSuccess(response.data))
  } else {
    yield put(EmoticonRedux.EmoticonFailure(response))
    Alert.alert(response.data.message)
  }
}
