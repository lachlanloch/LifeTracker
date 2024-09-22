'use client'
import { Abril_Fatface } from 'next/font/google';
import Calender from './Calender.js';
import Login from "./Login.js"
import Loading from "./Loading.js"
import React, {useEffect, useState} from 'react'
import { useAuth } from '@/context/AuthContext';
import { setDoc, doc, } from 'firebase/firestore';
import { db } from '@/firebase';

const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ['400']});

//grid grid-cols-1 sm:grid-cols-3 will have 1 column until small screen then becomes 3

//truncate add ... when too small to fit
//fix on mobiel
export default function Dashboard() {

const [data, setData] = useState({})
const {currentUser, userDataObj, setUserDataObj, loading } = useAuth()
const now = new Date()


function countValues(){
  let total_number_of_days = 0
  let sum_moods = 0
  for (let year in data) {
    for (let month in data[year]) {
      for( let day in data[year][month]) {
        let days_mood = data[year][month][day]
        total_number_of_days++
        sum_moods+= days_mood
      }
    }
    return{days_in_a_row: total_number_of_days,}
  }
}
const statuses = {
   time_remaining: `${23 - now.getHours()}H ${ 60 - now.getMinutes()}M ` 
 }
async function handleSetMood(mood){
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    try{  
      const newData = { ...userDataObj } 
    //protection for code beloe to set the mood
      if(!newData?.[year]) { //will return if doesnt exist
        newData[year] = {}
      }
      if(!newData?.[year]?.[month]){
        newData[year][month] = {}
      }     
      newData[year][month][day] = mood
    //update current state 
      setData(newData)
      console.log(newData)
      //update global state
      setUserDataObj(newData)
      // update firebase whhy do i use async?? look it upo do it via an object in setDoc to be more efficient
      const docRef = doc(db, "users", currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]:{
            [day] : mood
            }         
            
          }
        }, { merge: true})
  } catch(err){
  console.log("Failed to set data: ", err.message)
    }
 }
  const moods = {
    'Cheerful': '😊',
    'Angry':  '😡',
    'Unhappy': '🥲',
    'Miserable': '😭',
    'Amazing': '🥳',
  }
  useEffect(() => {
    if(!currentUser || !userDataObj){
      return 
    } 
    setData(userDataObj)

  }, [currentUser, userDataObj])


  if (loading){
    return <Loading />
  }

  if (!currentUser){
    return <Login />
  }
     

  console.log(data)
  return (
    <div className='flex flex-col gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-2  bg-indigo-50 text-indigo-500 rounded-large'>

        {Object.keys(statuses).map((status, statusIndex) => {
          return(
            <div key={statusIndex} className='p-4 flex flex-col items-center gap-2 sm:gap-3'>
              <p className='font-medium capitalize text-xs sm:text-sm truncate pr-2'>{status.replaceAll('_', ' ')}</p>
              <p className={'text-base text:lg pr-2 text-center '+ abril_fatface.className}>{statuses[status]}</p>
            </div>
          )
        })}          
      </div>
      <h4 className={'text-3xl sm:text-4xl md:text-5xl text-center '+ abril_fatface.className}>
            How do you feel today?  
        </h4>

        <div className='grid grid-cols-2 md:grid-col-5 gap-4'>
          
       {Object.keys(moods).map((mood, moodsIndex) => {
        return (
          <button onClick={() => {
            const currentMoodValue = moodsIndex + 1
            handleSetMood(currentMoodValue)
          }} className={' p=4 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-[lavender]  ' +(moodsIndex === 4 ? 'cols-span-2' : ' ')} key={moodsIndex}>
            <p className={'text-4xl sm:text-5xl md:text-6x ' + abril_fatface.className}>{moods[mood]}</p>
            <p className={'text-indigo-500 ' + abril_fatface.className}>{mood}</p>
          </button>
        )
       })}
            
            
        </div>
     
        
        <Calender completeData={data} handleSetMood={handleSetMood} />
      
    </div>

  
      


  )
}