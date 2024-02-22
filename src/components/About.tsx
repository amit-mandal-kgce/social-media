import axios from 'axios'
import React, { useEffect, useState } from 'react'

const About = () => {
  const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  // post................................
  const [aboutSet, setAbout] = useState({
    about: '',
  })

   const handelSubmitp = async (e: any)=>{
    e.preventDefault()
    try {
      const langData = {
      userId: id,
      about: aboutSet.about,
    };
      const response = await axios.post('/api/user/aboutuser', langData);
            console.log('signup okey', response.data)
            alert('Abouts Add SuccessFully!')
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to Abouts Upgrade', error.message)
    }
  }
  return (
    <div className='flex flex-col p-2 bg-gray-100 w-full shadow'>
      <form className="flex flex-col" onSubmit={handelSubmitp}>
      <textarea name="text" id="about" cols={2} rows={2} className='border' value={aboutSet.about} onChange={(e)=> setAbout({...aboutSet, about: e.target.value})}/>
      <div>
        <button type='submit' className='text-sm font-bold px-2 bg-blue-700 text-white'>Save</button>
      </div>
      </form>
    </div>
  )
}

export default About
