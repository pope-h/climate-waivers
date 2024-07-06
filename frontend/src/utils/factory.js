import Cookies from "js-cookie";

export const getUser = () =>{
    const raw = Cookies.get("user")
    if(raw)return JSON.parse(raw)
        return false
}

export const getAuthToken = () =>{
    return Cookies.get("token")
}



export const authRequest = (fn) =>{
    try{
        return fn()
    }catch(err){
        if(err.status == 401){
            Cookies.delete("user")
            Cookies.delete("token")
            window.location.reload()
        }
    }
}