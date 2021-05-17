import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginRedux from '../Redux/LoginRedux'
import RegisterRedux from '../Redux/RegisterRedux'

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
  const response = yield call(api.getUser, data)

  if (response.ok) {
    
    // do data conversion here if needed
    yield put(GithubActions.userSuccess(avatar))
  } else {
    yield put(GithubActions.userFailure())
  }
}

export function * getLogout (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getLogout, data)

  if (response.ok) {
    
    // do data conversion here if needed
    yield put(GithubActions.userSuccess(avatar))
  } else {
    yield put(GithubActions.userFailure())
  }
}