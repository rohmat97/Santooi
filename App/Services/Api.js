// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
export const staging = 'https://happiness-api.demoapp.xyz/api'
export const production = 'https://happiness-api.demoapp.xyz/api'
const create = (baseURL = staging) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  //authentication
  const getLogin = payload => api.post('/auth/login',payload,{})
  const getLogout = token => api.post('/auth/logout',{},{headers: { Authorization: `Bearer ${token}` }})
  const getForgotPassword = payload => api.post('/auth/forgot-password',payload)
  const getResetPassword = payload => api.post('/auth/reset-password',payload)
  const getChangePassword = payload => api.post('/auth/change-password', payload.body,{headers: { Authorization: `Bearer ${payload.token}` }})
  const getRegister = payload => api.post('/account/user',payload)
  const getCallBackGoogle = payload => api.post('/auth/google/callback', payload)
  const getCallBackFacebook = payload => api.post('/auth/facebook/callback', payload)
  //dashboard
  const getEmoticon = payload => api.get('/emoticon','',{headers: { Authorization: `Bearer ${payload}` }})
  const checkEmail = payload => api.get('/auth/is-available/email?key='+payload)
  const checkPhone = payload => api.get('/auth/is-available/phone?key='+payload)
  const updateStatus = payload => api.patch('/account/user/'+payload.id,payload.body,{headers: { Authorization: `Bearer ${payload.token}` }})
  const getStatus = payload => api.get('/account/user?id='+payload.id,'',{headers: { Authorization: `Bearer ${payload.token}` }})
  //berhitung
  const getMusic = payload => api.get('/music?limit=4&page='+payload.page,'',{headers: { Authorization: `Bearer ${payload.token}` }})
  const getKalimatBijak = payload =>api.get(`/wise?fav=${payload.fav}&sort=${payload.filter}&limit=10&page=${payload.page}`,'',{headers: { Authorization: `Bearer ${payload.token}` }})
  const addFavorite = payload => api.post('/account/user/wise',payload.body,{headers: { Authorization: `Bearer ${payload.token}` }})
  const removeFavorite = payload => api.delete('/account/user/wise/'+payload.body,'',{headers: { Authorization: `Bearer ${payload.token}` }})
  //foto
  const getGallery =payload=> api.get('/account/user/gallery?limit=10&page='+payload.page,'',{headers:{Authorization:`Bearer ${payload.token}`}})
  const addFoto = payload => api.post('/account/user/gallery',payload.body,{headers: { Authorization: `Bearer ${payload.token}`, 'Content-Type': 'multipart/form-data' }})
  const deleteFoto = payload => api.post('/account/user/gallery/delete',payload.body,{headers: { Authorization: `Bearer ${payload.token}`, 'Content-Type': 'multipart/form-data' }})
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getLogin,
    getChangePassword,
    getForgotPassword,
    getLogout,
    getResetPassword,
    getRegister,
    getCallBackFacebook,
    getCallBackGoogle,
    getEmoticon,
    checkEmail,
    checkPhone,
    updateStatus,
    getStatus,
    getMusic,
    getKalimatBijak,
    addFavorite,
    removeFavorite,
    getGallery,
    addFoto,
    deleteFoto
  }
}

// let's return back our create method as the default.
export default {
  create
}
