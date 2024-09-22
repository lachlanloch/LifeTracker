'use client'
import Button from './Button'
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function CallToAction() {

    const {currentUser} = useAuth()

    if (currentUser){
        return(
            <div className='mx-auto max-w-[600p] w-full'>
                <Link href={'/dashboard'}>
                    <Button full dark text='Go to the dashboard'/>
                </Link>
            </div>
        )
    }
  return (
    <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
        <Link href={'/dashboard'}>
            <Button text="Sign up"/>
        </Link>

        <Link href={'/dashboard'}>
            <Button text="Login" dark/>
        </Link>

    </div>
    
  )
}

