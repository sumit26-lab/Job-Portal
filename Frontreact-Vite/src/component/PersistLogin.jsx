import { useState,useEffect } from "react";
import useRefresh from "../hook/useRefresh";
import React from 'react'
import useAuth from "../hook/useAuth";
import { Outlet } from "react-router-dom";

 const PersistLogin= () => {
    const[isLoading,setisLoading]=useState(true)
    const {auth,persist}=useAuth()
    console.log("PersistLogin......",auth?.accessToken)
    const refresh= useRefresh()
    useEffect(()=>{
        let isMounted=true
        const verifyRefreshToken=async()=>{ 
            
            try{
                await refresh()
    
            }catch(err){
                console.log(err)
    
            }finally{
                isMounted&&setisLoading(false)
    
            }
        }
        !auth?.accessToken?verifyRefreshToken():setisLoading(false)
        return ()=>isMounted=false
        
    },[])
    
    useEffect(()=>{
        console.log(`Is Lodaing is ${isLoading}`)
        console.log(`At token ${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])
  return (
    <>{
        !persist?
        <Outlet/>:
        isLoading?
        <p>...LodingToken</p>
        :<Outlet/>
    }
    </>
  )
}
export default PersistLogin