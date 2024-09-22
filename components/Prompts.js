'use client'
import DailyQuestionData from './DailyQuestionData';
import Login from './Login';
import { questionData } from '@/utils';
import React, { useEffect, useState} from 'react'
import { useAuth } from '@/context/AuthContext';
import Loading from './Loading';
import { db } from '@/firebase';
import { setDoc, doc, collection, getDocs  } from 'firebase/firestore';
import Link from 'next/link';
import { Abril_Fatface, DM_Serif_Text } from 'next/font/google'
const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ['400']});
const dm_serif_text = DM_Serif_Text({subsets: ["latin"], weight: ['400'], style: ['italic']});
export default function Prompts() {
 
  const [localData, setLocalData] = useState({})
  const {currentUser, loading, dailyQuestionData, setDailyQuestionData} = useAuth()
  const [dailyQuestion, setDailyQuestion] = useState(getRandomQuestion())
  const [answer, setAnswer] = useState('')
  const [haveAnswered, setHaveAnswered] = useState(false)
  const date = new Date()
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()+1
  const day = date.getUTCDate()
  const today = (year.toString() + month.toString() +  day.toString())
  const [dailyQuestionDisplay, setDailyQuestionDisplay] = useState('')
  const [dailyAnswerDisplay, setDailyAnswerDisplay] = useState('')

//load on first render of page
  useEffect(() => {
    setLocalData(dailyQuestionData)
    console.log("this is question data", dailyQuestionData)
    dailyQuestionData.map((data) =>{
      if(data.id===today){
        setHaveAnswered(true)
        setAnswer(data.answer)
        setDailyQuestion(data.question)
        setDailyAnswerDisplay(data.answer)
        setDailyQuestionDisplay(data.question)
      }
    })
      if(!currentUser || dailyQuestionData){
        return 
      }                    
  }, [ currentUser ,dailyQuestionData, today]);
  if (loading){
    return <Loading />
  }
  if (!currentUser){
    return <Login />
  }

  function convertToArray(obj){
    return Object.keys(obj).map(key =>({
      key,
      ...obj[key],
    }))
  }

  function reRollQuestion(){
    setDailyQuestion(getRandomQuestion())
  }
  function getRandomQuestion(){
    const {questions} = questionData
    const randomIndex = Math.floor(Math.random() * questionData.questions.length)
    return questions[randomIndex]
  }
const handleSubmit = async () => {
  console.log("submitting this data here!#@##!" ,dailyQuestionData)
  if(haveAnswered){
    setLocalData(dailyQuestionData.map((item)=>{
      if(item.id===today){
        {
          item.answer = answer,
          item.question = dailyQuestion, 
          item.day = day,
          item.month = month,
          item.year = year
        } 
        setDailyQuestionData(convertToArray(localData))
      }
    }))
  } else {    
    setLocalData(dailyQuestionData.push({
      id : today,
      answer : answer,
          question : dailyQuestion, 
          day : day,
          month : month,
          year : year
    }))
    setDailyQuestionData(convertToArray(localData))
  }
  const docRef = doc(db, "users", currentUser.uid, 'collection1', today)
  const res = await setDoc(docRef, {
    answer : answer,
    question : dailyQuestion, 
    day : day,
    month : month,
    year : year
    }, { merge: true})
    setHaveAnswered(true)
    setDailyQuestionDisplay(dailyQuestion)
    setDailyAnswerDisplay(answer)
}
  return (  
    <div className={'grid grid-rows gap-3  ' + dm_serif_text.className }> 
    <h1 className="text-blue-500 max-w-[75px] text-l"> <Link href="/viewall">View All</Link></h1>
    <h1 className='text-green-500 text-center mb-2'>{haveAnswered ? 'You have already answered a question today please come back again tomorrow for a new question or you can edit your answer below.': ''}</h1>   
      <button className='text-slate-700 text-4xl textGradient' onClick={reRollQuestion}><i className="fa-solid fa-dice"></i></button> 
    <h1 className='text-4xl text-center text-indigo-500 mx-auto py-4' ><span className={abril_fatface.className}>{dailyQuestion}</span></h1>      
        <h1 className='text-2xl text-center py-3'>Welcome to the <span className='textGradient'>daily</span> question about <span className='textGradient'>life</span>!</h1>
        <p className='text-center py-3'>Come back <span className='textGradient'>everyday</span> to answer a new question about <span className='textGradient'>life</span>,
        explore deeper <span className='textGradient'>meaning</span> and much more to have you reflecting on <span className='textGradient'>yourself</span> </p>
        <div className='grid grid-rows-2 p-4 gap-2'>
    <span className="grid grid-rows">
    <textarea value={answer} rows='5' onChange={(e) => {
          setAnswer(e.target.value)
        }} className="border border-solid border-slate-300 hover:border-slate-700 resize-none border rounded-lg" 
        maxLength="10000"  placeholder='Answer in 10000 characters or less '/>
        <button onClick={handleSubmit} className='border border-solid border-slate-300 mx-auto my-auto border-rounded rounded-xl
         p-2 hover:bg-slate-100 text-center' >{haveAnswered ? 'Update' : 'Save'}</button>
    </span>      
                  <div className={'p-2 text-indigo-500  text-center text-xl ' + abril_fatface.className}>
                  {haveAnswered && <h1 className='text-center textGradient text-2xl p-3'>The answer you have done today!</h1>}   
                  <div className="border border-solid border-fill border-slate-400">
                  <h1 className="p-2">{dailyQuestionDisplay}</h1>
                  <p className="p-2 text-sm"> {dailyAnswerDisplay}</p>
                  </div>                
                 </div>            
        </div>
    </div>
  )
}