import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import GetPlaceRedux from '../Redux/JalanYuk/GetPlaceRedux'
import HistoryPlaceRedux from '../Redux/JalanYuk/HistoryPlaceRedux'
import UpdateHistoryRedux from '../Redux/JalanYuk/UpdateHistoryRedux'

export function * getPlace (api, action) {
  // make the call to the api
  const { data } = action
  console.log(`data`, data)
  const response = yield call(api.getPlace, data)

  if (response.ok) {
    // console.log('response getPlace',response.data)
    // do data conversion here if needed
    yield put(GetPlaceRedux.GetPlaceSuccess(response.data.data.rows))
  }
}


export function * getPlaceHistory (api, action) {
  // make the call to the api
  const { data } = action
  const response = yield call(api.getHistoryPlace, data)

  if (response.ok) {
    // console.log('response getPlace',response.data)
    // do data conversion here if needed
    yield put(HistoryPlaceRedux.HistoryPlaceSuccess(response.data.data.rows))
  }
}


export function * updateHistory (api, action) {
  // make the call to the api
  const { data } = action
  const response = yield call(api.updateHistory, data)

  if (response.ok) {
    // console.log('response updateHistory',response.data)
    // do data conversion here if needed
    yield put(UpdateHistoryRedux.UpdateHistorySuccess(response.data))
  }
}