import { call, put } from 'redux-saga/effects'
import KalimatBijakRedux from '../Redux/KalimatBijak/KalimatBijakRedux'


export function * getKalimat(api, action) {
    // make the call to the api
    // console.log(action.data)
    const response = yield call(api.getKalimatBijak, action.data)
    if (response.ok) {
      console.log('response',response.data.data.rows)
      yield put(KalimatBijakRedux.KalimatBijakSuccess(response.data.data.rows))
    } else {
      yield put(KalimatBijakRedux.KalimatBijakFailure(response))
    }
  }