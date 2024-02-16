import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Langauge = () => {
  const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  const [langauesSet, setLangauge] = useState({
    langauge: ''
  })
  const handelSubmit = async (e: any)=>{
    e.preventDefault()
    try {
      const langData = {
      userId: id,
      langauge: langauesSet.langauge,
    };
      const response = await axios.post('/api/user/langauge', langData);
            console.log('signup okey', response.data)
            alert('Profile Add SuccessFully!')
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to Profile Upgrade', error.message)
    }
  }
  return (
    <div className='flex flex-col p-2 w-full bg-gray-100 shadow' >
      <form className="flex flex-col" onSubmit={(e)=>handelSubmit(e)}>
        <input type="text" className='border outline-none mb-2' value={langauesSet.langauge} onChange={(e)=> setLangauge({...langauesSet, langauge: e.target.value})}/>
        <div>
          <button type='submit' className='px-2 text-xs md:text-sm font-bold text-white bg-blue-500'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Langauge
