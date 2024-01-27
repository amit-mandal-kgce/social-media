import React from 'react'
import { RxCross2 } from "react-icons/rx";


const Education = ({isVisibleEdu, handelbuttonEducation}: any) => {
  return (
     <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isVisibleEdu ? 'block' : 'none' }}>
      <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Add Education</h1>
        <button onClick={handelbuttonEducation}><RxCross2/></button>
      </div>
      <form className="flex flex-col">
        <h1 className='text-sm mb-1'>School/College/University</h1>
        <input type="school" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>Degree</h1>
        <input type="degree" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>Field of study</h1>
        <input type="fieldstudy" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>Start Date</h1>
        <input type="startdate" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>End Date</h1>
        <input type="enddate" placeholder='Enter...' className='border px-2 outline-none mb-2' />
        <h1 className='text-sm mb-1'>Grade</h1>
        <input type="grade" placeholder='Enter...' className='border px-2 outline-none mb-2' />
      <button type='submit' className='text-sm font-bold px-2 bg-blue-700 text-white'>Save</button>
      </form>
    </div>
  )
}

export default Education;
