import messaging from '@react-native-firebase/messaging';
export const CheckEmail = async (setavail, type, check,email,password,LoginRequest,setvisible,setsubmitted,navigate,CheckEmailSuccess)=>{
    const fcmToken = await messaging().getToken()
    if(type === 'login'){
        setsubmitted(true)
        console.log('login')
        if(check.status) {
            setavail(true)
            setvisible(false)
        }else{
            LoginRequest({
                'email': email?email:'user1@mailinator.com',
                'password': password?password:'123456',
                'firebase_token': fcmToken
            })
            setavail(false)
            setvisible(false)
        }
    }
    if(type === 'signup'){
        setsubmitted(true)
        console.log('singup',check)
        if(check.status) {
            setavail(false)
            navigate('SignUpScreen',{ params : {
                email: email,
                password: password
            }})
        }else{
            setavail(true)
        }
    }
    console.log('check',check)
    CheckEmailSuccess(null)
}

export const CheckPhone = async (setavailPhone,checkPhone,setsubmitted,LoginRequest,email,password,setvisible)=>{
    const fcmToken = await messaging().getToken()
    setsubmitted(true)
    if(checkPhone.status){
        setavailPhone(true)
        setvisible(false)
    }else{
        LoginRequest({
            'email': email?email:'user1@mailinator.com',
            'password': password?password:'123456',
            'firebase_token': fcmToken
        })
        setavailPhone(false)
        setvisible(false)
    }
}
export function isNumeric(value) {
    return /^-?\d+$/.test(value);
}