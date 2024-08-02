import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // let accessToken=localStorage.getItem('token')?localStorage.getItem('token'):{}
    // console.log("accessToken",accessToken)
    // let UserInfo={}
    // if(accessToken && accessToken.length >0){
    //    ( {UserInfo}=jwtDecode(accessToken) )

    // }
    // console.log(UserInfo)
 

    // accessToken:accessToken,username:UserInfo.username}
   
    const [auth, setAuth] = useState({});
    const [jobs,setjobs] = useState({});
    const [persist,setpersist]=useState(JSON.parse(localStorage.getItem('persist'))||false)

   
   console.log(auth)
 
    return (
        <AuthContext.Provider value={{ auth, setAuth,persist,setpersist,jobs,setjobs }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;