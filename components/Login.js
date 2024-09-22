'use client'
// need useclient to manage form
import React, {useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const poppins = Poppins({ subsets: ["latin"], weight: ['700']});

//&#39; use this in place of '
//focus:border-indigo-700 hover:border-indigo-700 makes it more responsive and shows easier what u have hovered or selected
export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [error, setError] = useState('')
  const {signup, login} = useAuth()
  const [registerError, setRegisterError] = useState()


  useEffect(() =>{
    

    setError('')
    setPasswordError('')
    setEmailError('')
    setRegisterError('')


    
    
  }, [isRegister])




  //create an error state to inform user of the erro
  async function handleSubmit(){ //add regx to check if email is infact an email

    setError('')
    setPasswordError('')
    setEmailError('')
    setRegisterError('')



    if(!emailRegex.test(email) && isRegister){
      setEmailError("Please Enter a Valid Email")
    } else { 
      setEmailError("")
    }
    if(password.length < 6 && isRegister){
      setPasswordError("Please Enter a Valid Password")
    }
      
    
    setAuthenticating(true)
    try {
      if(isRegister) {
        console.log("Signing up new user")
        await signup(email, password)
      } else {
        console.log("Logging in new user")
        await login(email,password)
      }
    } catch(error) {
      const errorCode = error.code;
      console.log(errorCode)

      if(error.code === 'auth/email-already-in-use'){
        setRegisterError("The email is already in use")
      }
    

      
      if(!isRegister){
        setError('Your login details do not match please try again') 
      } else {
        
      }
      
    } finally{
      setAuthenticating(false)
      
    }
  }

 
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4 px-16 '>
      <h3 className={'text-3xl sm:text-5xl m:text-6xl text-slate-950 nowrap ' + poppins.className}> {isRegister ? 'Register' : 'Login'}</h3>
      <p>You&#39;re one step away</p>

      <input value = {email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='w-full max-w-[400] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 
      focus:border-indigo-700 hover:border-indigo-800 rounded-full outline-none' placeholder='Email'/>
      <p className={'text-red-700 mr-auto text-s p-1 ' + poppins.className}>{emailError}</p>
      
      <input value = {password} onChange={(e) => {
        setPassword(e.target.value)
      }}  
      className='w-full max-w-[400] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 
      focus:border-indigo-700 hover:border-indigo-800 rounded-full outline-none' placeholder='Password'/>
      <p className={'text-red-700 mr-auto text-s p-1 ' + poppins.className}>{passwordError}</p>

      <div className='max-w-[400] w-full mx-auto '>
        <Button clickHandler={handleSubmit} text={authenticating ? "Submitting": "Submit"} full/>
      </div>

      <p className='text-center '>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? ' }
      <button onClick={(e) =>{
        setIsRegister(!isRegister)
      }} className='text-indigo-500 '> {!isRegister ? 'Sign Up': 'Sign In'}</button></p>
      <p className={'text-red-700 text-m p-1 text-center ' + poppins.className}>{error}</p>
      <p className={'text-red-700 text-m p-1 ' + poppins.className}>{registerError}</p>
      
   
     
    </div>
  )
}

