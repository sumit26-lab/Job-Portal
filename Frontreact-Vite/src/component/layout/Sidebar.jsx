import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css'; // Add styling for sidebar

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li>
                    <NavLink to="search" className={({ isActive }) => (isActive ? 'active' : '')}>Search</NavLink>
                </li>
                <li>
                    <NavLink to="Add-company" className={({ isActive }) => (isActive ? 'active' : '')}>Company Profile</NavLink>
                </li>
                {/* Add more links as needed */}
            </ul>
        </div>
    );
};

export default Sidebar;
