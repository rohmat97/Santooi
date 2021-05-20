import React , {  } from 'react';
import { Linking } from "react-native";


export const Initiate = (setUrl,setCame ) =>{
    Linking.getInitialURL().then(URL1 => {
        // this.navigate(url);
            console.log('INITIAL: ',URL1);
        if(URL1){
            setUrl(URL1);
        }
        setCame(true)
      });

    Linking.addEventListener('url',(URL)=>{ 
        console.log('this is the url didmount: ',URL);
        if(URL){
            setUrl(URL.url);
        }
        setCame(true)
    });
  
}

export const RemoveEvent =(setUrl) =>{
    Linking.removeEventListener('url',(url)=>{ 
        console.log('this is the url unmount: ',url);
        setUrl(null);
    });
}

export const Transition = (navigate, getParam) =>{
    const params = getParam('params')
    if(params && params.type ==='transition'){
        setTimeout(() => {
            navigate(params.root, {
                screen: params.screen,
                initial: true,
            }) 
    }, 2000);
}
}

export const ExtractURL =(url, navigate) =>{
    const route = url && url.replace(/.*?:\/\//g, '');
    const paramName = route && route.split('?')
    const email = paramName && paramName[1].match(/email=([^&]*)/)
    const token = paramName && paramName[1].match(/token=([^&]*)/)
      console.log('  param',paramName)
      console.log('  email ',email )
      console.log('  token ',token )
    setTimeout(() => {
        navigate('CreateNewPasswordScreen', {
            params :{
                email:email,
                token:token
            }
        })
    }, 1000);
}