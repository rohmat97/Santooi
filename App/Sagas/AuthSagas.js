import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginRedux from '../Redux/LoginRedux'
import RegisterRedux from '../Redux/RegisterRedux'
import ForgotRedux from '../Redux/ForgotRedux'
import ResetPasswordRedux from '../Redux/ResetPasswordRedux'
import CallbackFacebookRedux from '../Redux/CallbackFacebookRedux'
import CallbackGoogleRedux from '../Redux/CallbackGoogleRedux'
import TokenRedux from '../Redux/TokenRedux'
import CheckEmailRedux from '../Redux/CheckEmailRedux'
import CheckPhoneRedux from '../Redux/CheckPhoneRedux'
import { Alert } from 'react-native'

export function * getLogin (api, action) {
  // make the call to the api
  // console.log(action.data)
  const response = yield call(api.getLogin, action.data)
  console.log('response login',response.data)
  if (response.ok) {
    
    // do data conversion here if needed
    if(response.data.data.user.role ===1){
      Alert.alert("Account Unauthorized")
      yield put(LoginRedux.LoginFailure())
    }else{
      yield put(LoginRedux.LoginSuccess(response.data))
      yield put(TokenRedux.TokenSuccess(response.data))
    }
  } else {
    yield put(LoginRedux.LoginFailure(response))
    yield put(LoginRedux.LoginSuccess(response))
  }
}

export function * getSignup (api, action) {
  const { data } = action
  // make the call to the api
  // console.log('data', data)
  const response = yield call(api.getRegister, data)

  if (response.ok) {
    // do data conversion here if needed
    Alert.alert(response.data.message)
    yield put(RegisterRedux.RegisterSuccess(response.data))
    yield put(TokenRedux.TokenSuccess(response.data))
  } else {
    yield put(RegisterRedux.RegisterFailure())
    Alert.alert(response.data.message)
  }
}

export function * getForgotPassword (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getForgotPassword, data)
  // console.log('data Reset', response)

  if (response.ok) {
    // do data conversion here if needed
    yield put(ForgotRedux.ForgotSuccess(response.data))
  } else {
    yield put(ForgotRedux.ForgotFailure(response))
    Alert.alert(response.data.message)
  }
}

export function * getResetPassword (api, action) {
  const { data } = action
  // make the call to the api
  console.log('data Reset', data)
  const response = yield call(api.getResetPassword, data)
  console.log('response Reset', response)

  if (response.ok) {
    // do data conversion here if needed
    yield put(ResetPasswordRedux.ResetPasswordSuccess(response.data))
  } else {
    yield put(ResetPasswordRedux.ResetPasswordFailure(response))
    Alert.alert(response.data.message)
  }
}

export function * getLogout (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getLogout, data)

  if (response.ok) {
    
    // do data conversion here if needed
    yield put(GithubActions.userSuccess(response.data))
  } else {
    yield put(GithubActions.userFailure(response))
    Alert.alert(response.data.message)
  }
}


export function * getCallBackFacebook (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getCallBackFacebook, data)
  if (response.ok) {
    console.log('data callback facebook', response.data)
    // do data conversion here if needed
    yield put(CallbackFacebookRedux.CallbackFacebookSuccess(response.data))
    yield put(TokenRedux.TokenSuccess(response.data))
  } else {
    yield put(CallbackFacebookRedux.CallbackFacebookFailure(response))
    Alert.alert(response.data.message)
  }
}

export function * getCallBackGoogle (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getCallBackGoogle, data)

  if (response.ok) {
    console.log('data callback google', response.data)
    
    // do data conversion here if needed
    yield put(CallbackGoogleRedux.CallbackGoogleSuccess(response.data))
    yield put(TokenRedux.TokenSuccess(response.data))
  } else {
    yield put(CallbackGoogleRedux.CallbackGoogleFailure())
    yield put(CallbackGoogleRedux.CallbackGoogleSuccess(response.data))
    Alert.alert(response.data.message)
  }
}

export function * getCheckEmail (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.checkEmail, data)
  console.log('email', response.data)

  if (response.ok) {
    // do data conversion here if needed
    yield put(CheckEmailRedux.CheckEmailSuccess(response.data))
  } else {
    yield put(CheckEmailRedux.CheckEmailFailure())
  }
}

export function * getCheckPhone (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.checkPhone, data)
  // console.log('email', response.data)

  if (response.ok) {
    
    // do data conversion here if needed
    yield put(CheckPhoneRedux.CheckPhoneSuccess(response.data))
  } else {
    yield put(CheckPhoneRedux.CheckPhoneFailure())
  }
}