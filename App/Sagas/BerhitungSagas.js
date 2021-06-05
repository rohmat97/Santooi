import { call, put } from 'redux-saga/effects'
import MusicRedux from '../Redux/Berhitung/MusicRedux'
import { Alert } from 'react-native'


export function * getMusic(api, action) {
    // make the call to the api
    // console.log(action.data)
    const response = yield call(api.getMusic, action.data)
    if (response.ok) {
        // console.log('response',response.data.data.rows)
      yield put(MusicRedux.MusicSuccess(response.data.data.rows))
    } else {
      yield put(MusicRedux.MusicFailure(response))
    }
  }