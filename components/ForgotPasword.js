'use client'

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';





export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
const {sendResetEmail} = useAuth()

  const handleSubmit = async (email) => {
    
    try {
      await sendResetEmail(email);
      setMessage('Password reset email sent successfully!');
    } catch (error) {
      setMessage('Failed to send password reset email.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 border border-black p-5 rounded-xl">
        <i className="fa-solid fa-circle-exclamation text-8xl p-4 text-blue-400"></i>
      <h1 className="text-center my-2 text-xl font-bold">Forgot Password</h1>
      <p className="text-center text-gray-500">Enter your email below and we will send an email to recover your password. Just following the instructions sent in the email.</p>
      
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-fill p-1 hover:border-black max-w-[500px] my-4"
        />
        <button type="submit" onClick={(e) =>{
            handleSubmit(email)
        }}
        className="p-2 w-full text-center border border-gray-500 rounded-l my-2 text-white bg-green-600 max-w-[500px]">
        <p >Reset Password</p>
        </button>
        <Link href="/dashboard">
        <p className="text-gray-400 my-2 "><i className="fa-solid fa-chevron-left"></i> Back to Login</p>
        </Link>
      {message && <p>{message}</p>}
    </div>
  );
}
