import React from 'react'

export default function Button(props) {
    
    const {text, dark, full, clickHandler} = props

    return (

    // if dark is true then have text as white if false color as indigo
    <button onClick={clickHandler}
     className={'rounded-full overflow-hidden border-2 border-solid border-slate-500 duration-200 hover:black-900 transition duration-300 hover:bg-slate-100 hover:opacity:60' 
    + (dark ? ''  : '' ) +
    (full ? 'grid place-items-center w-full ' :  ' ')}>
        <p className='px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3'>
            {text}  
        </p>
       
    </button>
  )
}
