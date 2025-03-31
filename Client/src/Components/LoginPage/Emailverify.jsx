// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useContext } from 'react';
// import { AppContext } from '../context/Appcontext.jsx';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';

// function Emailverify() {
//     //send for cokie--
//     axios.defaults.withCredentials = true;

//     const { backendurl, isLoggedin, userData, getuserData } = useContext(AppContext)

//     const inputRefs = React.useRef([])
//     const navigate = useNavigate()

//     //for get value one by one---
//     const handelInput = (e, index) => {
//         if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
//             inputRefs.current[index + 1].focus();
//         }
//     }

//     //for delete value one by one---
//     const handeldown = (e, index) => {
//         if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
//             inputRefs.current[index - 1].focus();
//         }
//     }

//     //Hnadel pest feature---
//     const handelpast = (e) => {
//         const paste = e.clipboardData.getData('text');
//         const pasteArray = paste.split('')
//         pasteArray.forEach((char, index) => {
//             if (inputRefs.current[index]) {
//                 inputRefs.current[index].value = char;
//             }
//         })
//     }

//     //Handel the data is varify or not------
//     const onHnadelsubit = async (e) => {
//         try {
//             e.preventDefault();
//             const otpArray = inputRefs.current.map(e => e.value);
//             const otp = otpArray.join('')
//             const { data } = await axios.post(backendurl + '/api/auth/verify-Account', { otp })

//             if (data.success) {
//                 toast.success(data.message);
//                 getuserData()
//                 navigate('/')
//             }
//             else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     useEffect(()=>{
//         isLoggedin && userData && userData.isAccountVerify && navigate('/')
//     },[isLoggedin, userData])
     

//     return (
//         <div className='flex items-center justify-center mt-5 px-6 sm:px-0 bg-gradient-to-br  '>
//             <form onSubmit={onHnadelsubit} className='bg-state-900 p-8 rounded-lg shadow-lg sm:w-100 xl:w-[35%] bg-white text-sm'>
//                 <h1 className=' text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
//                 <p className='text-center mb-6  text-1xl'>Enter the 6-digit code send to your email id.</p>
//                 <div className='flex justify-between mb-8' onPaste={handelpast}>
//                     {Array(6).fill(0).map((_, index) => (
//                         <input type="text" maxLength={1} key={index} required className='w-12 h-12 border border-gray-400  text-center text-xl rounded-md'
//                             ref={e => inputRefs.current[index] = e}
//                             onInput={(e) => handelInput(e, index)}
//                             onKeyDown={(e) => handeldown(e, index)} />
//                     ))}

//                 </div>
//                 <Button className='w-full !py-3 !bg-[#fb541b] text-white rounded'>Verify Email</Button>
//             </form>
//         </div>
//     )
// }

// export default Emailverify

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function EmailVerify() {
  axios.defaults.withCredentials = true;

  const { backendurl, isLoggedin, userData, getuserData } = useContext(AppContext);
  const [loading, setLoading] = useState(false); // Disable button during API calls
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Handle OTP input navigation
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").split("");
    paste.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // Handle OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const otpArray = inputRefs.current.map((input) => input.value);
      const otp = otpArray.join(""); // Convert to string
      console.log("OTP entered:", otp); // Debugging log

      const { data } = await axios.post(`${backendurl}/api/auth/verify-Account`, { otp });

      console.log("API Response:", data); // Debugging log

      if (data.success) {
        toast.success(data.message);
        getuserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Verification Error:", error); // Debugging log
      toast.error(error.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP function
  const resendOtp = async () => {
    try {
      const { data } = await axios.post(`${backendurl}/api/auth/send-verify-otp`, {
        email: userData?.email, // Ensure email is available
      });

      if (data.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Try again later.");
    }
  };

  // Redirect if already verified
  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerify) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="flex items-center justify-center mt-5 px-6 sm:px-0 bg-gradient-to-br">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg sm:w-100 xl:w-[35%] text-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Email Verification</h1>
        <p className="text-center mb-6 text-lg">Enter the 6-digit code sent to your email.</p>

        {/* OTP Input Fields */}
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength={1}
                key={index}
                required
                className="w-12 h-12 border border-gray-400 text-center text-xl rounded-md"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
              />
            ))}
        </div>

        {/* Verify Button */}
        <Button type="submit" className="w-full !py-3 !bg-[#fb541b] text-white rounded" disabled={loading}>
          {loading ? "Verifying..." : "Verify Email"}
        </Button>

        {/* Resend OTP */}
        <p className="text-center text-sm mt-4">
          Didn't receive the code?{" "}
          <span onClick={resendOtp} className="text-blue-700 cursor-pointer underline">
            Resend OTP
          </span>
        </p>
      </form>
    </div>
  );
}

export default EmailVerify;
