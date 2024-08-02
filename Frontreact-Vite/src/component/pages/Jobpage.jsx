import { useParams, useLoaderData,Link ,useNavigate} from 'react-router-dom'
import { FaArrowLeft,FaMapMarker } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useAuth from '../../hook/useAuth'
import useAxiosPrivate from '../../hook/useAxiosPrivate'
import { useState,useEffect } from 'react'


export const Jobpage = ({deleteJob}) => {
    let {id}= useParams()
    const axiosPrivate=useAxiosPrivate()
    const [jobs, setJobs] = useState([]);
    const [Loading, setLoading] = useState(true);
 
    let navigation=useNavigate()
    const fetchJobPosts = async (signal) => {
        try {
            const response = await axiosPrivate.get(`api/job_Post/getJobId/${id}`, {
                
                signal

        })
            console.log("jobPost",response.data.data)
            setJobs(response.data.data)
        
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
    }, [])
    if (!jobs) {
        return (
            <div>
                <h1>Job Not Found</h1>
                <Link to="/jobs" className="text-indigo-500 hover:text-indigo-600 flex items-center">
                    <FaArrowLeft className='mr-2' /> Back to Job Listings
                </Link>
            </div>
        );
    }
    return (
        <>
        <h1>JobPage</h1>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/jobs"
                        className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                        <FaArrowLeft className='mr-2'/>Back to Job Listings
                    </Link>
                </div>
            </section>

            <section className="bg-indigo-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <div
                                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                            >
                                <div className="text-gray-500 mb-4">{jobs.title}</div>
                                <h1 className="text-1 font-bold mb-4">
                                   {jobs.type}
                                </h1>
                                <div
                                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                                >
                                    <FaMapMarker className='text-orange-700 mr-2'/>
                                    <p className="text-orange-700">{jobs.job_city}</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                               JOb Description
                                </h3>

                                <p className="mb-4">
                                {jobs.description}
                                </p>

                                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                                <p className="mb-4">{jobs.salary}</p>
                            </div>
                        </main>

                        <aside>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                                <h2 className="text-2xl">{jobs.company_name}</h2>

                                <p className="my-2">
                                    {jobs.company_description}
                                </p>

                         <hr className="my-4" />

                                <h3 className="text-xl">Contact Email:</h3>

                                <p className="my-2 bg-indigo-100 p-2">{jobs.company_email}</p>

                                <h3 className="text-xl">Contact Phone:</h3>

                                <p className="my-2 bg-indigo-100 p-2 font-bold">{jobs.company_contactnum}</p>
                            </div>


                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                                <Link
                                    to={`/Edit-jobs/${jobs.id}`}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >Edit Job</Link>
                                <button
                                   onClick={()=> onclickdeleteJob(jobs.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >
                                    Delete Job
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}


export   { Jobpage as default }