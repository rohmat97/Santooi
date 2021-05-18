import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ResetPasswordRequest: ['data'],
  ResetPasswordSuccess: ['payload'],
  ResetPasswordFailure: null
})

export const ResetPasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null||undefined,
  error: null
})

/* ------------- Selectors ------------- */

export const ResetPasswordSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: INITIAL_STATE.payload })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESETPASSWORD_REQUEST]: request,
  [Types.RESETPASSWORD_SUCCESS]: success,
  [Types.RESETPASSWORD_FAILURE]: failure
})