
'use client'
import { Abril_Fatface } from 'next/font/google'
import React, { useState } from 'react'
import { gradients, baseRating } from '@/utils'
const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ['400']});


export default function Calender(props) {

  const {demo, completeData, handleSetMood} = props
  const now = new Date()
  const currentMonth = now.getMonth()
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth])
  const [selectedYear, setSelectedYear] = useState(now.getFullYear()) 

  const numericMonth = Object.keys(months).indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}//optuional chaining for security
  console.log(" this months data", completeData?.[selectedYear]?.[selectedMonth] || {})


  function handleIncrementMonth(val){
    //v +1 -1
    if(numericMonth + val < 0){
      setSelectedYear(curr => curr - 1)
      setSelectedMonth(monthsArr[monthsArr.length - 1])
    } else if (numericMonth + val > 11){
      setSelectedYear(curr => curr + 1)
      setSelectedMonth(monthsArr[0])

    } else {
    
      setSelectedMonth(monthsArr[numericMonth + val])
      
    }
    //if bounds are hit then change year then change the month to next month previous year
  }
 // const year = '2024'
 // const month= 'July'
  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
  const firstDayofMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()



  const daysToDisplay = firstDayofMonth + daysInMonth

  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-3 gap-4'>

        <button onClick={() =>{
            handleIncrementMonth(-1)
        }} 
        className='mr-auto text-slate-800 text-2xl  duration-200 hover:scale-110'><i className="fa-solid fa-circle-chevron-left "></i></button>
        <p className={'text-center capitalize text-2xl text-indigo-500 ' + abril_fatface.className} >{selectedMonth}, {selectedYear}</p>
        <button onClick={() =>{
            handleIncrementMonth(+1)
        }} 
        className='ml-auto text-slate-800 text-2xl hover:scale-110 duration-200'><i className="fa-solid fa-circle-chevron-right"></i> </button>


      </div>
    <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
      {[...Array(numRows).keys()].map((row, rowIndex) => {
        return(
          <div key={rowIndex} className='grid grid-cols-7 gap-1'>
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayofMonth - 1)
              // figures out bool value whether or not the first day of the month is and if the rest should be blank if first day of month is thurs then mon-wed will be blank on calender
              let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayofMonth ) ? false : true 
              let isToday = dayIndex === now.getDate()  
              if (!dayDisplay){
                return (
                  <div className='bg-white' key={dayOfWeekIndex}>
                  </div>
                )
              }
              let color = demo ? 
                gradients.indigo[baseRating[dayIndex]]
               : dayIndex in data ? gradients.indigo[data[dayIndex]] : 'white'


              return(
                <div style={{background:color}}className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' 
                + (isToday ? 'border-indigo-700' : 'border-indigo-100 ') + (color === 'white' ? ' text-indigo-400' : ' text-white ')} key = {dayOfWeekIndex}>
                  <p>{dayIndex}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
    </div>
  )
}