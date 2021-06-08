import { call, put } from 'redux-saga/effects'
import KalimatBijakRedux from '../Redux/KalimatBijak/KalimatBijakRedux'
import AddFavoriteRedux from '../Redux/KalimatBijak/AddFavoriteRedux'


export function * getKalimat(api, action) {
    // make the call to the api
    // console.log(action.data)
    const response = yield call(api.getKalimatBijak, action.data)
    if (response.ok) {
      // console.log('response',response.data.data.rows)
      yield put(KalimatBijakRedux.KalimatBijakSuccess(response.data.data.rows))
    } else {
      yield put(KalimatBijakRedux.KalimatBijakFailure(response))
    }
  }

export function * addFavorite(api, action) {
  // make the call to the api
  console.log(action.data.param,action.data)
  if(action.data.param ==='add'){
    const response = yield call(api.addFavorite, action.data)
    // console.log('response',response.data)
    if (response.ok) {
      yield put(AddFavoriteRedux.addFavoriteSuccess(response.data))
    } else {
      yield put(AddFavoriteRedux.addFavoriteFailure(response))
    }
  }else{
    const response = yield call(api.removeFavorite, action.data)
    // console.log('response',response.data)
    if (response.ok) {
      yield put(AddFavoriteRedux.addFavoriteSuccess(response.data))
    } else {
      yield put(AddFavoriteRedux.addFavoriteFailure(response))
    }
  }
 
}