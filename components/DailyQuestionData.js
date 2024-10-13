'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import {React, useState} from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase';
import Loading from './Loading'
import Login from './Login'


export default function DailyQuestionData() {
  
  const [filter, setFilter] = useState('')
  const {dailyQuestionData, setDailyQuestionData, currentUser, loading} = useAuth()

  if (loading){
    return <Loading />
  }

  if (!currentUser){
    return <Login />
  }


  async function handleDeleteData(dataId){

    const docRef = doc(db, "users", currentUser.uid, 'collection1', dataId)
   const res = await deleteDoc(docRef)

    setDailyQuestionData(dailyQuestionData.filter((data)=>{
      if(data.id!==dataId){
          return data
      }
    }))

  }
    //console.log("the complete data in question comp",completeData)
  return (
    <div className='grid grid-rows-* gap-4 '>

<h1 className="border border-fill border-green-200 text-green-300 rounded-lg p-2 max-w-[100px]
 text-center "><Link href="/prompts"><i className="fa-solid fa-chevron-left mr-2"/>Return</Link></h1>

<input value={filter} className='text-indigo-400 p-2 border border-solid rounded-2xl text-center' placeholder='Filter By Question!' onChange={(e) =>{
  setFilter(e.target.value)
}}/>
      {dailyQuestionData.filter((item) =>{
                return filter.toLowerCase() === ""
                ? item.question
                : item.question.toLowerCase().includes(filter.toLowerCase())
              })
      .map((data)=>{
        return(        
         <div key={data.id} className='break-all border border-solid p-2 bg-indigo-200 rounded-lg border-slate-400 text-center'> 

          
          <i className="fa-solid fa-trash text-red-500" onClick={() =>{
            console.log("deleting data ", data.id)
            handleDeleteData(data.id)
          }}></i> 
        
            
        <h1 className=''>{data.question}</h1>
        <p className=''>{data.answer}</p>
        <p className='text-xs'>{data.day}/{data.month}/{data.year}</p>
        </div>
        )
        
      })}

  </div>     
  )
}
