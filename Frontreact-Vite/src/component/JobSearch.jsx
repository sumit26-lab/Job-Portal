// src/pages/JobSearchPage.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hook/useAxiosPrivate'
import { Joblistings } from '../component/Joblistings'; // This component will display the job posts
import useAuth from '../hook/useAuth';
import { jwtDecode } from 'jwt-decode';
const JobSearchPage = () => {
    const [query, setQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('ASC'); // 'asc' or 'desc'
    const [sortBy, setSortBy] = useState('jt.salary'); // 'date' or 'salary'
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [search, setSearch] = useState('');// 'all', 'active', 'closed'
    const [jobPosts, setJobPosts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const { auth } = useAuth()
    let  accessToken= auth?.accessToken
    let UserInfo;
   console.log("Auth",auth.accessToken)
   if(!auth?.accessToken){
    console.log("notwork",auth)
   }else{
     UserInfo =jwtDecode(accessToken)?.UserInfo.username
   }
console.log("userInfo",UserInfo.user_account_id)
  
const axiosPrivate=useAxiosPrivate() 
    



 const fetchJobPosts = async (signal) => {
        try {
            console.log("userInfo",UserInfo?.user_account_id)
            const response = await axiosPrivate.get(`api/job_Post/${UserInfo?.user_account_id}`, {
                params:{ page,
                sortBy,
                limit,
                sortOrder,
                search
            },
                signal

        })
            console.log("jobPost",response.data.rows)
            setJobPosts(response.data.rows)
        

            setTotalCount(response.data.totalCount)
            setLoading(false)
        } catch (err) {
            if (err.name === 'CanceledError') {
                console.log('Request canceled');
            } else {
                console.error('Error fetching job posts:', err);
                // Optional: Navigate to login if unauthorized
                // navigate('/login');
            }
        }
    }


    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
    
        setLoading(true); // Start loading indicator
        fetchJobPosts(signal);
    
        return () => {
            controller.abort(); // Cleanup function to abort the request if the component unmounts
        };
    }, [page, sortBy, sortOrder, search]); // Dependencies array
    
    
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset to first page on new search
        fetchJobPosts(new AbortController().signal); // Fetch job posts based on new query
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(totalCount / limit);
//   console.log("totalPages",totalPages)
console.log("sortBy",sortBy)
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Job Posts</h1>

            <form onSubmit={handleSearch} className="mb-6 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search for job posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-2 border rounded-md w-full md:w-80"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    Search
                </button>

                <div className="flex items-center space-x-4">
                    <label htmlFor="sort-by" className="text-gray-700">Sort by:</label>
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border p-2 rounded-md"
                    >
                        <option value="jp.createat">Date Posted</option>
                        <option value="jt.salary">Salary</option>
                    </select>

                    <label htmlFor="sort-order" className="text-gray-700">Order:</label>
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border p-2 rounded-md"
                    >
                        <option value="DESC">Descending</option>
                        <option value="ASC">Ascending</option>
                    </select>

                    <NavLink className="bg-blue-500 text-white p-2 rounded-md" to="add-job">Post Jobs</NavLink>
                </div>
            </form>

            <Joblistings isLoading={Loading} jobPosts={jobPosts} />

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="bg-blue-500 text-white p-2 rounded-md mx-1"
                >
                    Previous
                </button>
                <span className="mx-2">{page} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="bg-blue-500 text-white p-2 rounded-md mx-1"
                >
                    Next
                </button>
            </div>
        </div>
    );
};


export default JobSearchPage;