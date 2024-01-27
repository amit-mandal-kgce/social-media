import React from 'react'
import { RxCross2 } from "react-icons/rx";

const Projects = ({isProject, handelProj}: any) => {
  return (
    <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isProject ? 'block' : 'none' }}>
      <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Add Projects</h1>
        <button onClick={handelProj}><RxCross2/></button>
      </div>
      <form className="flex flex-col">
        <h1 className='text-sm mb-1'>Name</h1>
        <input type="school" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>Month-Year</h1>
        <input type="degree" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>Links</h1>
        <input type="fieldstudy" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>Uses techonology</h1>
        <input type="startdate" placeholder='Enter...' className='border px-2 outline-none mb-2' />
      <button type='submit' className='text-sm font-bold px-2 bg-blue-700 text-white'>Save</button>
      </form>
    </div>
  )
}

export default Projects
