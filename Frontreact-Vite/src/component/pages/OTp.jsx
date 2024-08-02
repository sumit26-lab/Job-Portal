// OTPVerification.js

import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const OTPVerification = () => {
    const [timeLeft, setTimeLeft] = useState(60); // Timer in seconds
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
 const navigate= useNavigate()
 const location = useLocation();
 
  const { email } = location.state || {};
  
    useEffect(() => {
        const countdown = () => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            }
        };

        // Update timer every second
        const timer = setInterval(countdown, 1000);

        // Clean up timer
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };
    async function ResendOtp(){
        setLoading(true)
  
        const res = await fetch('http://localhost:4000/api/user/ResendOtp', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({email:email})
           });
           if (res.ok) {
            // Handle success
            setLoading(false)
            toast.success('Otp send  successfully you email!')
            // navigate('/jobs')
           }
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
     
        setLoading(true); // Start loading state
                try {
            // Mock API call delay
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a 2-second delay
            let data={otp,email}

            const res = await fetch('http://localhost:4000/api/user/verifyOtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
        
              if (res.ok) {
                // Handle success
                setLoading(false)
                toast.success('User successfully verfiy!')
                navigate('/Add-company')
                // Redirect or show success message
              } else {
                // Handle error
                const errorData = await res.json();
                 errorData.errors.forEach(error => {
                  toast.error(error.msg);
                });
                
              }
          
        } catch (error) {
            console.error('Verification failed:', error);
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-6 text-center">OTP Verification</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            maxLength="6"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Verify OTP'}
                        </button>
                        <div className="text-sm font-medium text-gray-700">
                            {timeLeft > 0 ? `Resend OTP in ${timeLeft} seconds` : <button className='bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={ResendOtp} >
                           Ressend </button>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPVerification;
