import React from 'react';
import Sidebar from './layout/Sidebar';
import { Outlet } from 'react-router-dom';
import '../component/Dashboard.css'; // Add styling for dashboard layout
import useAuth from '../hook/useAuth';
const Dashboard = () => {
    const { auth } = useAuth()
    let  accessToken= auth?.accessToken
console.log("Desborad",accessToken)
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
