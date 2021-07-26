import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  token: require('./Authentication/TokenRedux').reducer,
  login: require('./Authentication/LoginRedux').reducer,
  regist: require('./Authentication/RegisterRedux').reducer,
  forgot: require('./Authentication/ForgotRedux').reducer,
  callbackFacebook: require('./Authentication/CallbackFacebookRedux').reducer,
  callbackGoogle: require('./Authentication/CallbackGoogleRedux').reducer,
  resetPassword: require('./Authentication/ResetPasswordRedux').reducer,
  emoticon: require('./Dashboard/EmoticonRedux').reducer,
  checkEmail: require('./Authentication/CheckEmailRedux').reducer,
  checkPhone: require('./Authentication/CheckPhoneRedux').reducer,
  UpdateStatus: require('./Dashboard/UpdateStatusRedux').reducer,
  status: require('./Dashboard/StatusRedux').reducer,
  music: require('./Berhitung/MusicRedux').reducer,
  kalimatbijak: require('./KalimatBijak/KalimatBijakRedux').reducer,
  addFavorite: require('./KalimatBijak/AddFavoriteRedux').reducer,
  gallery: require('./FotoFav/GalleryRedux').reducer,
  addFoto: require('./FotoFav/AddFotoRedux').reducer,
  deleteFoto: require('./FotoFav/DeleteFotoRedux').reducer,
  album: require('./FotoFav/AlbumRedux').reducer,
  addalbum: require('./FotoFav/AddAlbumRedux').reducer,
  deletealbum: require('./FotoFav/DeleteAlbumRedux').reducer,
  updateAlbum: require('./FotoFav/UpdateAlbumRedux').reducer,
  uploadAlbum: require('./FotoFav/UploadPhotoAlbumRedux').reducer,
  detailAlbum: require('./FotoFav/DetailAlbumRedux').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}
