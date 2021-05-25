import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { ForgotTypes } from '../Redux/ForgotRedux'
import { ResetPasswordTypes } from '../Redux/ResetPasswordRedux'
import { CallbackFacebookTypes } from '../Redux/CallbackFacebookRedux'
import { CallbackGoogleTypes } from '../Redux/CallbackGoogleRedux'
import { EmoticonTypes } from '../Redux/Dashboard/EmoticonRedux'
import { CheckEmailTypes } from '../Redux/CheckEmailRedux'
import { CheckPhoneTypes } from '../Redux/CheckPhoneRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getEmoticon } from './DashboardSagas';
import { getLogin,getCheckEmail,getSignup,getForgotPassword, getCallBackFacebook,getCallBackGoogle,getResetPassword, getCheckPhone} from './AuthSagas';

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
  ])
}
