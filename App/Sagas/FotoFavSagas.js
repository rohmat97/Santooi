import { call, put } from 'redux-saga/effects'
import GalleryRedux from '../Redux/FotoFav/GalleryRedux'
import AddFotoRedux from '../Redux/FotoFav/AddFotoRedux'
import DeleteFotoRedux from '../Redux/FotoFav/DeleteFotoRedux'
import AlbumRedux from '../Redux/FotoFav/AlbumRedux'
import AddAlbumRedux from '../Redux/FotoFav/AddAlbumRedux'
import DeleteAlbumRedux from '../Redux/FotoFav/DeleteAlbumRedux'
import UpdateAlbumRedux from '../Redux/FotoFav/UpdateAlbumRedux'
import UploadPhotoAlbumRedux from '../Redux/FotoFav/UploadPhotoAlbumRedux'
import DetailAlbumRedux from '../Redux/FotoFav/DetailAlbumRedux'
//gallery
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

//album

export function * getAlbum (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getAlbum, data)
  console.log('getAlbum', response.data)
  yield put(AlbumRedux.AlbumSuccess(response.data))
}


export function * getDetailAlbum (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getDetailAlbum, data)
  if (response.ok) {
    // do data conversion here if needed
    // console.log('getDetailAlbum', response.data.data.rows)
    yield put(DetailAlbumRedux.DetailAlbumSuccess(response.data.data.rows))
  } 
}


export function * getAddAlbum (api, action) {
  const { data } = action
  // console.log('data', data.body)
  // make the call to the api
  const response = yield call(api.addAlbum, data)
  if (response.ok) {
    console.log('response AddAlbum', response.data)
    yield put(AddAlbumRedux.AddAlbumSuccess(response.data))
  }
}


export function * DeleteAlbum (api, action) {
  const { data } = action
  // console.log('data DeleteAlbum', data)
  const response = yield call(api.deleteAlbum, data)
  // console.log('response DeleteAlbum', response.data)
  if (response.ok) {
    yield put(DeleteAlbumRedux.DeleteAlbumSuccess(response.data))
  }
  
}


export function * UpdateAlbum (api, action) {
  const { data } = action
  // console.log('data', data.body)
  // make the call to the api
  // console.log(data.body._searchParams[0])
  const response = yield call(api.updateAlbum , data)
  console.log('response UpdateAlbum', response.data)
  if (response.ok) {
    console.log('response UpdateAlbum', response.data)
    yield put(UpdateAlbumRedux.UpdateAlbumSuccess(response.data))
  }
 
}


export function * UploadFotoAlbum (api, action) {
  const { data } = action
  // console.log('data', data.body)
  // make the call to the api
  // console.log(data.body._searchParams[0])
  const response = yield call(api.getUpdatePhotoAlbum , data)
  if (response.ok) {
    // console.log('response getUpdatePhotoAlbum', response.data)
    yield put(UploadPhotoAlbumRedux.UploadAlbumSuccess(response.data))
  }
 
}