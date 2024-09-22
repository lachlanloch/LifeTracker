import { Abril_Fatface, Poppins } from 'next/font/google';

import Calender from './Calender.js';

import CallToAction from './CallToAction.js';
import DailyQuestionData from './DailyQuestionData';


const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ['400']});
const poppins = Poppins({ subsets: ["latin"], weight: ['700']})



export default function Hero() {
  return (
    <div className='py-4 md:py-9 flex flex-col gap-5 sm:gap-8' >
      <h1 className={'text-5xl sm:text-6xl md:text-6xl text-center ' + abril_fatface.className}><span className='textGradient'>Life Tracker </span>
      helps you track your <span className='textGradient'>life </span>and well being.</h1>
      <p className='text-lg sm:text-xl md:text-3xl text-center w-full mx-auto max-w-[700px] '>Track your life <span className='font-medium'>statistics </span> 
      and see how you are <span className='font-medium'>progressing</span>.</p>
          
    <CallToAction/>
    <Calender demo/>
    </div>
  )
}


