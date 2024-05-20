import React, { useEffect, useState } from 'react'

export type AlertProps = {
    text:string,
    duration:number,
    position:String,
    backgroundColor:string
}

function Alert(props:AlertProps) {
  const [position,setPosition] = useState(props.position);
  useEffect(
    ()=>{
      setPosition(props.position)
      setTimeout(()=>{setPosition("-left-full")},props.duration)
    },[props]
  )
  return (
    <div 
      className={`absolute bottom-5 transition-all duration-500 text-white w-fit px-5 py-2 border-t-4 border-white ${position} ${props.backgroundColor} `}
    >
        {props.text} 
    </div>
  )
}

export default Alert