import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
//auth
import { LoginTypes } from '../Redux/Authentication/LoginRedux'
import { RegisterTypes } from '../Redux/Authentication/RegisterRedux'
import { ForgotTypes } from '../Redux/Authentication/ForgotRedux'
import { ResetPasswordTypes } from '../Redux/Authentication/ResetPasswordRedux'
import { CallbackFacebookTypes } from '../Redux/Authentication/CallbackFacebookRedux'
import { CallbackGoogleTypes } from '../Redux/Authentication/CallbackGoogleRedux'
import { CheckEmailTypes } from '../Redux/Authentication/CheckEmailRedux'
import { CheckPhoneTypes } from '../Redux/Authentication/CheckPhoneRedux'
//dashboard
import { EmoticonTypes } from '../Redux/Dashboard/EmoticonRedux'
import { UpdateStatusTypes } from '../Redux/Dashboard/UpdateStatusRedux'
import { StatusTypes } from '../Redux/Dashboard/StatusRedux'
//berhitung
import { MusicTypes } from '../Redux/Berhitung/MusicRedux';
//kalimatbijak
import { KalimatBijakTypes } from '../Redux/KalimatBijak/KalimatBijakRedux';
import { addFavoriteTypes } from '../Redux/KalimatBijak/AddFavoriteRedux';
//fotoFavorite
import { GalleryTypes } from '../Redux/FotoFav/GalleryRedux';
import { AddfotoTypes } from '../Redux/FotoFav/AddFotoRedux';
import { DeletefotoTypes } from '../Redux/FotoFav/DeleteFotoRedux';
import { AlbumTypes } from '../Redux/FotoFav/AlbumRedux';
import { AddAlbumTypes } from '../Redux/FotoFav/AddAlbumRedux';
import { DeleteAlbumTypes } from '../Redux/FotoFav/DeleteAlbumRedux';
import { UpdateAlbumTypes } from '../Redux/FotoFav/UpdateAlbumRedux';
import { UploadAlbumTypes } from '../Redux/FotoFav/UploadPhotoAlbumRedux';
import { DetailAlbumTypes } from '../Redux/FotoFav/DetailAlbumRedux';
//jalanyuks
import { GetPlaceTypes } from '../Redux/JalanYuk/GetPlaceRedux';
import { HistoryPlaceTypes } from '../Redux/JalanYuk/HistoryPlaceRedux';
import { UpdateHistoryTypes } from '../Redux/JalanYuk/UpdateHistoryRedux';
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getEmoticon,UpdateStatus,getStatus } from './DashboardSagas';
import { getLogin,getCheckEmail,getSignup,getForgotPassword, getCallBackFacebook,getCallBackGoogle,getResetPassword, getCheckPhone} from './AuthSagas';
import { getMusic } from './BerhitungSagas';
import { getKalimat, addFavorite } from './KalimatBijakSagas';
import { getGallery, AddFoto, DeleteFoto, getAlbum, getAddAlbum, DeleteAlbum, UpdateAlbum, UploadFotoAlbum,getDetailAlbum } from './FotoFavSagas';
import { getPlace, getPlaceHistory,updateHistory } from './JalanYukSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, getLogin, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, getSignup, api),
    takeLatest(ForgotTypes.FORGOT_REQUEST, getForgotPassword, api),
    takeLatest(ResetPasswordTypes.RESET_PASSWORD_REQUEST, getResetPassword, api),
    takeLatest(CallbackFacebookTypes.CALLBACK_FACEBOOK_REQUEST, getCallBackFacebook, api),
    takeLatest(CallbackGoogleTypes.CALLBACK_GOOGLE_REQUEST, getCallBackGoogle, api),
    takeLatest(EmoticonTypes.EMOTICON_REQUEST, getEmoticon, api),
    takeLatest(CheckEmailTypes.CHECK_EMAIL_REQUEST, getCheckEmail, api),
    takeLatest(CheckPhoneTypes.CHECK_PHONE_REQUEST, getCheckPhone, api),
    takeLatest(UpdateStatusTypes.UPDATE_STATUS_REQUEST, UpdateStatus, api),
    takeLatest(StatusTypes.STATUS_REQUEST, getStatus, api),
    takeLatest(MusicTypes.MUSIC_REQUEST, getMusic, api),
    takeLatest(KalimatBijakTypes.KALIMAT_BIJAK_REQUEST, getKalimat, api),
    takeLatest(addFavoriteTypes.ADD_FAVORITE_REQUEST, addFavorite, api),
    takeLatest(GalleryTypes.GALLERY_REQUEST, getGallery, api),
    takeLatest(AddfotoTypes.ADDFOTO_REQUEST, AddFoto, api),
    takeLatest(DeletefotoTypes.DELETEFOTO_REQUEST, DeleteFoto, api),
    takeLatest(AlbumTypes.ALBUM_REQUEST, getAlbum, api),
    takeLatest(AddAlbumTypes.ADD_ALBUM_REQUEST, getAddAlbum, api),
    takeLatest(DeleteAlbumTypes.DELETE_ALBUM_REQUEST, DeleteAlbum, api),
    takeLatest(UpdateAlbumTypes.UPDATE_ALBUM_REQUEST, UpdateAlbum, api),
    takeLatest(UploadAlbumTypes.UPLOAD_ALBUM_REQUEST, UploadFotoAlbum, api),
    takeLatest(DetailAlbumTypes.DETAIL_ALBUM_REQUEST, getDetailAlbum, api),
    takeLatest(GetPlaceTypes.GET_PLACE_REQUEST, getPlace, api),
    takeLatest(HistoryPlaceTypes.HISTORY_PLACE_REQUEST, getPlaceHistory, api),
    takeLatest(UpdateHistoryTypes.UPDATE_HISTORY_REQUEST, updateHistory, api),
  ])
}
