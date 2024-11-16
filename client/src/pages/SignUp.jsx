import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const { setIsAuthenticated,handleRole,handleUserId } = useAuth();
  const navigate = useNavigate();


  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = async () => {
    if (!name || !email || !password || !registrationNumber || !contactNumber) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/Auth/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status) {
        toast.success(data.msg);
        setIsOtpSent(true);
        setStep(2); 
        setTimer(30); 
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error sending OTP');
    }
  };
  
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/Auth/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (data.status) {
        // toast.success('OTP Verified! Registration successful.');
        setOtpVerified(true);
        try {
          const register = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/Auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,password,registrationNumber,contactNumber}),
          });
    
          const data = await register.json();
          if (data.signup) {
            toast.success(data.msg);
            setIsAuthenticated(true)
            handleUserId(data.userId)
            handleRole('User')
            navigate("/user");


          } else {
            toast.error(data.msg);
          }
        } catch (error) {
          toast.error('Error registering user',error);
        }

        resetForm();
      } 
      else {
        toast.error(data.msg || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP');
    }
  };

  const resetForm = () => {
    setStep(1);
    setName('');
    setEmail('');
    setPassword('');
    setRegistrationNumber('');
    setContactNumber('');
    setOtp('');
    setIsOtpSent(false);
    setOtpVerified(false);
  };

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsOtpSent(false);
      setTimer(30);
    }
    return () => clearInterval(countdown);
  }, [isOtpSent, timer]);
  return (
    <div className="bg-gradient-to-br from-[#f7f8fa] to-[#eaeef1] min-h-screen flex items-center flex-col justify-center px-4">
       <Toaster />
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold text-center text-[#162243] mb-6">
          {step === 1 ? 'Sign Up' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
            />

            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
            />

            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
            />

            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-600 mb-2">
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter your registration number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
            />

            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-600 mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
            />

            <button
              onClick={handleSendOtp}
              className="w-full bg-gradient-to-r from-[#1a2a6c] to-[#0f1a3d] text-white font-semibold py-2 rounded-md hover:bg-gradient-to-r hover:from-[#25334d] hover:to-[#162243] transition-colors duration-300"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 mt-6">
              An OTP has been sent to {email}. Please enter it below.
            </p>
            <br />

            <label htmlFor="otp" className="block text-sm font-medium text-gray-600 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
            />

            

            {isOtpSent && timer > 0 ? (
              <>

              <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-[#1a2a6c] to-[#0f1a3d] text-white font-semibold py-2 rounded-md hover:bg-gradient-to-r hover:from-[#25334d] hover:to-[#162243] transition-colors duration-300"
              
            >
              Verify OTP
            </button>
      <p className="text-center text-sm text-gray-500 mt-4">
        Resend OTP in {timer}s
      </p>
      </>
    ) : (
      <button
        onClick={handleSendOtp} // You should implement this function to resend OTP
        className="w-full bg-gradient-to-r from-[#1a2a6c] to-[#0f1a3d] text-white font-semibold py-2 rounded-md hover:bg-gradient-to-r hover:from-[#25334d] hover:to-[#162243] transition-colors duration-300 mt-4"
      >
        Resend OTP
      </button>
    )}

          </>
        )}
      </div>
    </div>
  );
}
