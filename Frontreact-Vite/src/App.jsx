import React from 'react'
import Navbar from './component/Navbar'
import { Hero } from './component/Hero'
import { HomeCard } from './component/HomeCard'

import Mainlayout from './component/layout/Mainlayout'
import { Home } from './component/pages/Home'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import NotFoundPage from './component/pages/Notfoundpage'
import { Jobpage, } from './component/pages/Jobpage'

import { Addjobs } from './component/pages/Add-Jobs'
import { Editjobs } from './component/pages/Edit-jobs'
import Signup from './component/pages/signup'
import OTPVerification from './component/pages/OTp'
import Login from './component/pages/Login'
import { AddCompany } from './component/pages/AddCompany'

import Dashboard from './component/Desboard'
import JobSearch from './component/JobSearch'
import UserProfile from './component/pages/UserProfile'

import RequireAuth from './component/RequireAuth'

import PersistLogin from './component/PersistLogin'
import UserHome from './component/UserHome'
function App() {


  const route = createBrowserRouter(
    createRoutesFromElements(

      <Route path='/' element={<Mainlayout />} >
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<Dashboard />}>
              <Route path='search' element={<JobSearch />} />
              <Route path='search/jobs/:id' element={<Jobpage />} />
              <Route path='Add-company' element={<AddCompany />} />
              <Route path='search/add-job' element={<Addjobs />} />
              <Route path='Edit-jobs/:id' element={<Editjobs />} />
            </Route>
              <Route path='/home' element={<UserHome />} />
            
          </Route>
          
          <Route path='/Profile' element={<UserProfile />} />
          <Route index element={<Home />} />
          {/* <Route path='/jobs' element={<Jobpages />} /> */}



          <Route path='/Otp' element={<OTPVerification />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      // {/* </> */ }









    )
  )

  return (
    <>

      <RouterProvider router={route} />
      {/* <Navbar/>
      <Hero title="this my page" subtitle="this subtitle"/>
      <HomeCard/>
      <Joblistings/>
      <ViewJob/> */}





    </>
  )
}

export default App