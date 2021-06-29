import { call, put } from 'redux-saga/effects'
import GalleryRedux from '../Redux/FotoFav/GalleryRedux'
import AddFotoRedux from '../Redux/FotoFav/AddFotoRedux'
import DeleteFotoRedux from '../Redux/FotoFav/DeleteFotoRedux'

export function * getGallery (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getGallery, data)
  // console.log('response', response.data)
  if (response.ok) {
    // do data conversion here if needed
    yield put(GalleryRedux.GallerySuccess(response.data))
  } else {
    yield put(GalleryRedux.GalleryFailure())
  }
}

export function * AddFoto (api, action) {
  const { data } = action
  // console.log('data', data.body)
  // make the call to the api
  const response = yield call(api.addFoto, data)
  console.log('response AddFoto', response.data)
  yield put(AddFotoRedux.AddfotoSuccess(response.data))
}


export function * DeleteFoto (api, action) {
  const { data } = action
  // console.log('data', data.body)
  // make the call to the api
  // console.log(data.body._searchParams[0])
  const response = yield call(api.deleteFoto , data)
  console.log('response DeleteFoto', response.data)
  yield put(DeleteFotoRedux.DeletefotoSuccess(response.data))
}