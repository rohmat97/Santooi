export const CheckEmail =(setavail, type, check)=>{
    if(type == 'login' &&  type==='forgot'){
        if(check.status) {
            setavail(true)
        }else{
            setavail(false)
        }
    }else{
        if(check.status) {
            setavail(false)
        }else{
            setavail(true)
        }
    }
}