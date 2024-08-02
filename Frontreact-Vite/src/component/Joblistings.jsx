import React from 'react'
import jobjson from '../jobs.json'
import Joblisting from './Joblisting'
import { useState, useEffect } from 'react'
import { Spinner } from './Spinner'

export const Joblistings = ({ isHome = false ,jobPosts,isLoading}) => {
    // let joblisteing= isHome ? jobjson.slice(0,3):jobjson
    console.log(isHome)
    const [Jobs, setJobs] = useState([])
    // const [Loding, setLoading] = useState(true)
    let url =isHome ? 'http://localhost:4000/api/job_Post':'/api/jobs'
//  let joblisteing=isHome?setLoading(false)
    // useEffect(() => {
    //     try {
    //         async function fetchData() {
    //             let data = await fetch(url)
    //             let res = await data.json();
    //            console.log(res)

    //             setJobs(res)
    //         }
    //         fetchData()
    //     }
    //     catch (err) {

    //     }
    //     finally {
    //         setLoading(false)

    //     }

    // }, [])
    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? 'Recent_job' : 'Browse Jobs'}
                </h2>

                {isLoading ? <Spinner loading={isLoading} /> :
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{jobPosts?.map((job) => (
                        <Joblisting key={job.id} job={job} />
                    ))}


                    </div>
                }




            </div>
        </section>
    )
}
