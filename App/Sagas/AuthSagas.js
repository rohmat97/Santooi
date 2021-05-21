import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginRedux from '../Redux/LoginRedux'
import RegisterRedux from '../Redux/RegisterRedux'
import ForgotRedux from '../Redux/ForgotRedux'
import ResetPasswordRedux from '../Redux/ResetPasswordRedux'
import CallbackFacebookRedux from '../Redux/CallbackFacebookRedux'
import CallbackGoogleRedux from '../Redux/CallbackGoogleRedux'

export function * getLogin (api, action) {
  // make the call to the api
  // console.log(action.data)
  const response = yield call(api.getLogin, action.data)
  // console.log('response',response)
  if (response.ok) {
    
    // do data conversion here if needed
    yield put(LoginRedux.LoginSuccess(response.data))
  } else {
    yield put(LoginRedux.LoginFailure(response))
  }
}

export function * getSignup (api, action) {
  const { data } = action
  // make the call to the api
  console.log('data', data)
  const response = yield call(api.getRegister, data)

  if (response.ok) {
    
    // do data conversion here if needed
    yield put(RegisterRedux.RegisterSuccess(response.data))
  } else {
    yield put(RegisterRedux.RegisterFailure(response))
  }
}

export function * getForgotPassword (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getForgotPassword, data)
  console.log('data Reset', response)

  if (response.ok) {
    // do data conversion here if needed
    yield put(ForgotRedux.ForgotSuccess(response.data))
  } else {
    yield put(ForgotRedux.ForgotFailure(response))
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
  }
}


export function * getCallBackFacebook (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getCallBackFacebook, data)
  console.log('data callback facebook', data)
  if (response.ok) {
    
    // do data conversion here if needed
    yield put(CallbackFacebookRedux.CallbackFacebookSuccess(response.data))
  } else {
    yield put(CallbackFacebookRedux.CallbackFacebookFailure(response))
  }
}

export function * getCallBackGoogle (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getCallBackGoogle, data)
  console.log('data callback google', response)

  if (response.ok) {
    
    // do data conversion here if needed
    yield put(CallbackGoogleRedux.CallbackGoogleSuccess(response.data))
  } else {
    yield put(CallbackGoogleRedux.CallbackGoogleFailure(response))
  }
}