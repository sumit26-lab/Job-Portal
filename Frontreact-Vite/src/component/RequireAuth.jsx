import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";
const RequireAuth=()=>{
    const {auth}=useAuth()
    console.log("RequireAuth",auth)
    const loaction= useLocation()
    return(
        auth?<Outlet/>:<Navigate to="/Login"/>
    )
}
export default  RequireAuth