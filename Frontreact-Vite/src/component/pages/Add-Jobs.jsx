import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Spinner } from '../Spinner';
export const Addjobs = ({ addJobSubmit }) => {
  const [job_typeData, setjob_typeData] = useState({
    name: "",
    description: "",
    qualification: "",
    skills_required: "",
    experience_required: "",
    title: "",
    salary: "",
    type: "FullTime"

  })
  const [job_loaction, setlocation] = useState({
    street_address: "",
    city: "",
    state: "",
    zip: 0
  })
  const [loading, setLoading] = useState(false);
  const typeHandler = (e) => {
    const { name, value } = e.target;
    setjob_typeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const locationHandler = (e) => {
    const { name, value } = e.target;
    setlocation(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
  let token = localStorage.getItem('token')
  let { user_account_id } = jwtDecode(token)
  console.log(user_account_id)

  const submitFormHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(job_typeData, job_loaction)

    //api in type
    try {
      let Data = {};
      const job_type = await fetch('http://localhost:4000/api/job_type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job_typeData)
      });

      if (job_type.ok) {
        let { id } = await job_type.json();
        console.log("job_typeId", id)
        Data.job_type_id = id
        const loctaion = await fetch('http://localhost:4000/api/job_location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(job_loaction)
        });
        if (loctaion.ok) {
          let { id } = await loctaion.json();
          console.log("job_location_id", id)
          Data.job_location_id = id
          if (id) {
            let Comapny = await fetch(`http://localhost:4000/api/company/${user_account_id}`)
            let comapnyData = await Comapny.json()
            let { id } = comapnyData
            console.log("company_id", id)
            Data.company_id = id
            Data.posted_by_id = user_account_id

            const jobpost = await fetch('http://localhost:4000/api/job_Post', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Data)
            });
            if (jobpost.ok) {

              toast.success('You Job Post Sucessfuliy add..')
             

            }

          }
        }

      } else {
        const errorData = await stream.json();
        toast.error(errorData.error || 'Failed to create business stream.');
        return;
      }
    }
    catch (err) {
      console.log(err)
    }


  }

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={submitFormHandler}>
            <h2 className="text-3xl text-center font-semibold mb-6">Post Job</h2>



            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
              >Job  Type</label
              >
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Witch type ypor Profile software engineering "
                required
                value={job_typeData.name}
                onChange={typeHandler}
              />
            </div>


            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
              >Type</label
              >
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={job_typeData.type}
                onChange={typeHandler}
              >
                <option value="FullTime">Full-Time</option>
                <option value="PartTime">Part-Time</option>
                <option value="Remote">Remote</option>
                {/* <option value="Internship">Internship</option> */}
              </select>
            </div>


            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >Description</label
              >
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={job_typeData.description}
                onChange={typeHandler}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="qualification" className="block text-gray-700 font-bold mb-2"
              >qualification</label
              >
              <input
                type="text"
                id="qualification"
                name="qualification"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. qualification"
                required
                value={job_typeData.qualification}
                onChange={typeHandler}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="skills_required" className="block text-gray-700 font-bold mb-2"
              > skills</label
              >
              <input
                type="text"
                id=" skills_required"
                name="skills_required"
                className="border rounded w-full py-2 px-3"
                placeholder=" skills_required"
                value={job_typeData.skills_required}
                onChange={typeHandler}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >title</label
              >
              <input
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="title?"
                value={job_typeData.title}
                onChange={typeHandler}
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                experience</label
              >
              <input
                id="title"
                name="experience_required"
                className="border rounded w-full py-2 px-3"
                placeholder="experience_required"
                value={job_typeData.experience_required}
                onChange={typeHandler}
              ></input>
            </div>

            <div className="mb-4">
              <label htmlFor="salary" className="block text-gray-700 font-bold mb-2"
              >Salary</label
              >
              <input
                type='text'
                id='salary'
                name='salary'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='salary'
                required
                value={job_typeData.salary}
                onChange={typeHandler}
              />

            </div>

            <div className='mb-4'>
              <label htmlFor='city' className='block text-gray-700 font-bold mb-2'>
                city
              </label>
              <input
                type='text'
                id='city'
                name='city'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='city'
                required
                value={job_loaction.city}
                onChange={locationHandler}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='city' className='block text-gray-700 font-bold mb-2'>
                ZipCode
              </label>
              <input
                type='number'
                id='zip'
                name='zip'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='number'
                required
                value={job_loaction.zip}
                onChange={locationHandler}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='city' className='block text-gray-700 font-bold mb-2'>
                state
              </label>
              <input
                type='text'
                id='state'
                name='state'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='state'
                required
                value={job_loaction.state}
                onChange={locationHandler}
              />
            </div>
            {/* <h3 className="text-2xl mb-5">Company Info </h3> */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >Address</label
              >
              <textarea
                id="street_address"
                name="street_address"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="street_address"
                value={job_loaction.street_address}
                onChange={locationHandler}
              ></textarea>
            </div>



            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
