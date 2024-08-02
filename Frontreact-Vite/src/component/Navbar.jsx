import React from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import useAuth from '../hook/useAuth'
import axios from '../api/axios'
import { useNavigate,useLocation } from 'react-router-dom'
import useLogout from '../hook/useLogout'
const Navbar = () => {
  let navigate= useNavigate()
  const location = useLocation();
  let {auth,setAuth}=useAuth()
  const logout = useLogout()
 
  const { pathname, search, hash, state } = location;

let user=auth?.accessToken?true:false
console.log(auth)
const handleLogout = async () => {

  await logout()
  //navigate('/Login', { state: { from: location }, replace: true });
  //await axios.post('/user/logout');



};
// if(user){
//   console.log(user)
// }
// let logoutFunction=async()=>{
//      useLogout()
// }
  let classIsActive = ({ isActive }) => isActive ? 'text-white bg-black hover:bg-gray-900:hover:text-white rounded-md px-3 py-2' : 'text-white  hover:bg-gray-900:hover:text-white rounded-md px-3 py-2'
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="React Jobs"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
              >React Jobs</span
              >
            </NavLink>

            <div className="md:ml-auto">
              <div className="flex space-x-2">
                {/* <NavLink
                  to="/"
                  className={classIsActive}>Home</NavLink> */}
                {
                  user? <> <NavLink
                    to="/jobs"
                    className={classIsActive}
                  >Jobs</NavLink>
                    <NavLink
                      to="/add-job"
                      className={classIsActive}
                    >Add Job</NavLink>
                      <NavLink to="/Login" className={classIsActive} onClick={handleLogout}>Logout</NavLink>

                  </> : (
                    <>
                      <NavLink to="/Signup" className={classIsActive}>Singup</NavLink>
                      <NavLink to="/Login" className={classIsActive}>Login</NavLink>
                    </>
                  )

                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar