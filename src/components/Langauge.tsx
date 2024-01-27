import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const Langauge = ({isLangauge, handelLangauge}: any) => {
  return (
    <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isLangauge ? 'block' : 'none' }}>
        <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Add Langauge</h1>
        <button onClick={handelLangauge}><RxCross2/></button>
      </div>
      <form className="flex flex-col">
        <input type="text" className='border outline-none mb-2'/>
        <button type='submit' className='px-2 text-xs md:text-sm font-bold text-white bg-blue-500'>Save</button>
      </form>
    </div>
  )
}

export default Langauge
