import React , {  } from 'react';
import { Linking, Platform } from "react-native";


export const Initiate = (setUrl,setCame,navigate,routeName,goBack ) =>{
    Linking.getInitialURL().then(URL1 => {
        // this.navigate(url);
            console.log('INITIAL: ',URL1);
        if(URL1){
            setUrl(URL1);
        }
        setCame(true)
      });

    Linking.addEventListener('url',(URL)=>{ 
        console.log('this is the url didmount: ',URL.url);
        if(URL){
            setUrl(URL.url);
            ExtractURL(URL.url, navigate, routeName, goBack)
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
    // console.log('masuk', params);
        if(params.type ==='transition'){
            setTimeout(() => {
                navigate(params.root, {
                    screen: params.screen,
                    initial: true,
                }) 
        }, 1000);
    }
    
}

export const ExtractURL =(url, navigate, routeName,goBack) =>{
    const route =  url && url.replace(/.*?:\/\//g, '');
    console.log(url)
    let paramName = route && route.split('?')
    if(paramName&&paramName.length>1) {

        console.log(paramName)
        if(Platform.OS==='android') {
            if(paramName[0] === 'VideoRoom'){
                const params = JSON.parse(paramName[1])
                navigate('VideoRoom',{
                    params: params, 
                    name: params?.user?.name,
                    title: params?.user?.name.charAt(0),
                    pict: params?.user?.photo?.url,
                  });
            }else if(paramName[0] === 'CallRoom') {
                const params = JSON.parse(paramName[1])
                navigate('CallRoom', {
                    params: params, 
                    name: params?.friend?.user?.name,
                    title: params?.friend?.user?.name.charAt(0),
                    pict: params?.friend?.user?.photo?.url,
                  })
            } else if (paramName[0] === 'DetailChat') {
                let data = JSON.parse(paramName[1])
                console.log(`data deeplink`, data)
                  navigate('DetailChat',{
                      params: data
                  })
            } else{
                const email = paramName&& paramName[1].match(/email=([^&]*)/)
                const token = paramName&& paramName[1].match(/token=([^&]*)/)
                const id_user = paramName && paramName[1].match(/id_user=([^&]*)/)
                setTimeout(() => {
                    navigate(paramName[0], {
                        params :{
                            email:email && email[1],
                            token:token && token[1],
                            id_user: id_user&& id_user[1]
                        }
                    })
                }, 1000);
            }
        } else{
            let params =JSON.parse(paramName[1].replace(/%7B/gm,'{').replace(/%22/gm,'"').replace(/%5B/gm,'[').replace(/%7D/gm,'}').replace(/%5D/gm,']'))
            console.log(`params.id`, paramName)
            console.log(`params.friend`,params)
            navigate('DetailChat',{
                params: params
            })
        }
    }else{
        console.log('else',paramName)
        setTimeout(() => {
            navigate(paramName[0])
        }, 1000);
    }
    
    //   console.log('  param',paramName)
    //   console.log('  email ',email )
    //   console.log('  token ',token )
   
}