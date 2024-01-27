import React from 'react'
import { RxCross2 } from "react-icons/rx";

const About = ({isVisible, handelbutton}: any) => {
  return (
    <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Edit about</h1>
        <button onClick={handelbutton}><RxCross2/></button>
      </div>
      <div className="">
      <textarea name="text" id="about" cols={30} rows={10} className='border'/>
      </div>
      <button className='text-sm font-bold px-2 bg-blue-700 text-white'>Save</button>
    </div>
  )
}

export default About
