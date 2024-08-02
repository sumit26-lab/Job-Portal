import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePickerComponent from '../DatePickerComponent';
import { Spinner } from '../Spinner';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../../hook/useAuth';
import useAxiosPrivate from '../../hook/useAxiosPrivate';
export const AddCompany = ({ addJobSubmit }) => {
    const{auth}=useAuth()
    const axiosPrivate=useAxiosPrivate()
    const navigate = useNavigate();
    // const { companyId } = useParams(); // Use companyId from route params to fetch/edit specific company data
    const [business_stream_name, setBusinessStreamName] = useState('');
    const [companyId ,setcompanyId] = useState(0);
    const [company_name, setCompanyName] = useState('');
    const [company_Email, setCompanyEmail] = useState('');
    const [company_web, setCompanyWeb] = useState('');
    const [num_employes, setNumEmployes] = useState(1);
    const [company_loaction, setCompanyLoaction] = useState('');
    const [company_description, setCompanyDescription] = useState('');
    const [company_contactnum, setCompanyContactnum] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // To handle edit mode
    const [industryOptions, setIndustryOptions] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState('');

    // let token = localStorage.getItem('token')
     let {user_account_id} = auth?.accessToken ? jwtDecode(auth.accessToken)?.UserInfo.username :{} 
   
     const fetchIndustyData= async(signal)=>{
        try{

            let industry_res= await axiosPrivate.get(`http://localhost:4000/api/company/Industry`,{
                signal
            })
            
            //  let industry= await industry_res.json()
             setIndustryOptions(industry_res.data)
             console.log("industry_res.data",industry_res.data)
           
        }catch(error){
            console.log(error)
        }
        }

        let fetchData=async(signal)=>{
           try{
             const responseCompany=await axiosPrivate.get(`http://localhost:4000/api/company/${user_account_id}`,{signal})
             if(!responseCompany.data) return setIsEditing(false)
                      if(responseCompany.data){
                   const responsebusiness=await axiosPrivate.get(`http://localhost:4000/api/buisnessStream/${responseCompany.data.business_stream_id}`,{signal})
                     if(responsebusiness.data){
                         setBusinessStreamName(responsebusiness.data.business_stream_name || '')
                        }
                        console.log("comapny",responseCompany.data)
                        setSelectedIndustry(responseCompany.data.industry_id || '')
                        setcompanyId(responseCompany.data.id || 0);
                        setCompanyName(responseCompany.data.company_name || '');
                        setCompanyWeb(responseCompany.data.company_web || '');
                        setNumEmployes(responseCompany.data.num_employes || 1);
                        setCompanyLoaction(responseCompany.data.company_loaction || '');
                        setCompanyDescription(responseCompany.data.company_description || '');
                        setCompanyContactnum(responseCompany.data.company_contactnum || '');
                        setCompanyEmail(responseCompany.data.company_email || '');
                        setSelectedDate(responseCompany.data.establishment_date ? new Date(data.establishment_date) : null);
    
                    }
            
    
                    }catch(err){
                        console.log("Api is not working",err)
                    }
        }
    useEffect(()=>{
        const controller = new AbortController();
        const { signal } = controller;
            fetchIndustyData(signal)
            // if(user_account_id){
               
                setIsEditing(true)
                fetchData(signal)
            //}
    },[])


 
    useEffect(() => {
        if (user_account_id) {
            // Fetch existing company data for editing
         
        }
    }, [user_account_id]);
 
    console.log("isEditing",isEditing)
    const formatDate = (date) => {
        if (!date) return ''; // Handle null or undefined dates
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0'); // Pad single-digit days
        return `${year}-${month}-${day}`;
    };

    const submitFormHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const establishment_date = formatDate(selectedDate);
        let companyData = {
            company_name,
            company_Email,
            company_web,
            num_employes,
            company_loaction,
            company_description,
            company_contactnum,
            establishment_date,
            user_account_id,
            industry_id:selectedIndustry
        };

        try {
            let streamId;
            console.log("enterBusiessStream",business_stream_name)
            const controller = new AbortController();
            const { signal } = controller;
            if (business_stream_name) {
               
                const stream = await axiosPrivate.post('/api/buisnessStream', 
                    JSON.stringify({business_stream_name}),
                    {signal,headers:{'Content-Type':"application/json"}},
                )

                if (stream.data) {
                    const { id } = await stream.data;
                    streamId = id;
                } else {
                    const errorData = await stream.data;
                    toast.error(errorData.error || 'Failed to create business stream.');
                    return;
                }
            }

            if (isEditing) {
                companyData.business_stream_id=streamId
               
                //Update company data
                const updateResponse = await fetch(`http://localhost:4000/api/company/${companyId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                
                    body: JSON.stringify( companyData )
                });
                 

                if (updateResponse.ok) {
                    const updateBusinessStrem = await fetch(`http://localhost:4000/api/buisnessStream/${streamId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({business_stream_name:business_stream_name})
                    });
                   
                    toast.success('Company updated successfully!');
                } else {
                    const errorData = await updateResponse.json();
                    toast.error(errorData.error || 'Failed to update company.');
                }
            } else {
                //Add new company
                const ResponseCompany = await axiosPrivate.post('http://localhost:4000/api/company',
                    JSON.stringify({ ...companyData, business_stream_id: streamId }),
                    {signal,headers:{'Content-Type':"application/json"}},

                );

                if (ResponseCompany.data) {
                    toast.success('Company added successfully!');
                    setLoading(false)
                } else {
                    const errorData = await ResponseCompany.data;
                    toast.error(errorData.error || 'Failed to add company.');
                }
            }
;
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('An unexpected error occurred.');
        } finally {
            return () => {
                controller.abort();
            };
            // setLoading(false);
        }
    };

    const deleteCompanyHandler = async () => {
        const controller = new AbortController();
            const { signal } = controller;
        if (window.confirm('Are you sure you want to delete this company?')) {
            setLoading(true);

            try {
                console.log(`${companyId}/${selectedIndustry}`)
                const response = await axiosPrivate.delete(`http://localhost:4000/api/company/${companyId}/${selectedIndustry}`,
                    {signal}

                );
                console.log("responseData",response)

                if (response.data) {
                    toast.success('Company deleted successfully!');
                    navigate('/dashboard');
                } else {
                    const errorData = await response.data;
                    toast.error(errorData.error || 'Failed to delete company.');
                }
            } catch (error) {
                console.error('Error:', error.message);
                toast.error('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        }
    };
   

    return (
       
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form onSubmit={submitFormHandler}>
                        <h2 className="text-3xl text-center font-semibold mb-6">{isEditing ? 'Edit Company' : 'Add Company'}</h2>
                        {loading && <span className='mb-4 flex justify-center'><Spinner /></span>}

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Business Stream</label>
                            <input
                                type="text"
                                id="Business_Stream"
                                name="Business_Stream"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="e.g. Beautiful Apartment In Miami"
                                value={business_stream_name}
                                onChange={(e) => setBusinessStreamName(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Company Name</label>
                            <input
                                type='text'
                                id='company_name'
                                name='company_name'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='e.g. My Company'
                                value={company_name}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Company Email</label>
                            <input
                                type='email'
                                id='company_Email'
                                name='company_Email'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='e.g. My Company Email'
                                value={company_Email}
                                onChange={(e) => setCompanyEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="company_web" className="block text-gray-700 font-bold mb-2">Company Website</label>
                            <input
                                type="text"
                                id="company_web"
                                name="company_web"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Company website URL"
                                value={company_web}
                                onChange={(e) => setCompanyWeb(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="num_employes" className="block text-gray-700 font-bold mb-2">Number of Employees</label>
                            <input
                                type="number"
                                id="num_employes"
                                name="num_employes"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Number of employees"
                                value={num_employes}
                                onChange={(e) => setNumEmployes(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="company_loaction" className="block text-gray-700 font-bold mb-2">Company Location</label>
                            <input
                                type="text"
                                id="company_loaction"
                                name="company_loaction"
                                className="border rounded w-full py-2 px-3"
                                placeholder="e.g. New York, NY"
                                value={company_loaction}
                                onChange={(e) => setCompanyLoaction(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">


            <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
              >Industry</label
            >
            <select
              id="industry"
              name="industry"
              className="border rounded w-full py-2 px-3"
              required
              value={selectedIndustry}
              onChange={(e)=>setSelectedIndustry(e.target.value)}
            >
              <option value="">Select industry</option>
              {industryOptions.map((item)=><option key={item.industry_id} value={item.industry_id}>
                {item.industry_name}
              </option>
            )}
            </select>
          </div>

                        <div className="mb-4">
                            <label htmlFor="company_contactnum" className="block text-gray-700 font-bold mb-2">Contact Phone</label>
                            <input
                                type="tel"
                                id="company_contactnum"
                                name="company_contactnum"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Optional phone for applicants"
                                value={company_contactnum}
                                onChange={(e) => setCompanyContactnum(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="establishment_date" className="block text-gray-700 font-bold mb-2">Establishment Date</label>
                            <DatePickerComponent selectedDate={selectedDate} onChange={(e) => setSelectedDate(e)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="company_description" className="block text-gray-700 font-bold mb-2">Company Description</label>
                            <textarea
                                id="company_description"
                                name="company_description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="Add any job duties, expectations, requirements, etc."
                                value={company_description}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-between">
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-1/2 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {isEditing ? 'Update Company' : 'Add Company'}
                            </button>
                            {isEditing && (
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-1/2 focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={deleteCompanyHandler}
                                >
                                    Delete Company
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
