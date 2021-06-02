import { call, put } from 'redux-saga/effects'
import EmoticonRedux from '../Redux/Dashboard/EmoticonRedux'
import UpdateStatusRedux from '../Redux/Dashboard/UpdateStatusRedux'
import StatusRedux from '../Redux/Dashboard/StatusRedux'
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

export function * UpdateStatus(api, action) {
  // make the call to the api
  // console.log(action.data)
  const response = yield call(api.updateStatus, action.data)
  console.log('UpdateStatus',response.data)
  if (response.ok) {
    yield put(UpdateStatusRedux.UpdateStatusSuccess(response.data))
  } else {
    yield put(UpdateStatusRedux.UpdateStatusFailure(response))
    // Alert.alert(response.data.message)
  }
}

export function * getStatus(api, action) {
  // make the call to the api
  // console.log(action.data)
  const response = yield call(api.getStatus, action.data)
  if (response.ok) {
    console.log('getStatus',response.data.data.rows)
    yield put(StatusRedux.StatusSuccess(response.data.data.rows))
  } else {
    yield put(StatusRedux.StatusFailure(response))
    // Alert.alert(response.data.message)
  }
}