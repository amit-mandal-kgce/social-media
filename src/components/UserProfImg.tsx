import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios';

const UserProfImg = ({isImageShow, handelClick}: any) => {
  const [profile, setProfile] = useState({
    heading: '',
    industry: '',
    education: '',
    region: '',
    city: '',
    phone: '',
    address: ''
  })
  const handelSubmit = async (e: any)=>{
    e.preventDefault()
    try {
      const postData = {
      userId: id,
      heading: profile.heading,
      industry: profile.industry,
      education: profile.education,
      region: profile.region,
      city: profile.city,
      phone: profile.phone,
      address: profile.address
    };
      const response = await axios.post('/api/user/profile', postData);
            console.log('signup okey', response.data)
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to sign up user', error.message)
    }
  }

  const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  return (
    <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isImageShow ? 'block' : 'none' }}>
      <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Add Profile</h1>
        <button onClick={handelClick}><RxCross2/></button>
      </div>
      <form className="flex flex-col gap-1" onSubmit={handelSubmit}>
        <h1 className='text-sm mb-1'>Heading</h1>
        <input type="heading" placeholder='Enter...' className='border px-2 outline-none mb-1' value={profile.heading} onChange={(e)=> setProfile({...profile, heading: e.target.value})} />
        <h1 className='text-sm mb-1'>Industry</h1>
        <input type="industry" placeholder='Enter...' className='border px-2 outline-none mb-1' value={profile.industry} onChange={(e)=> setProfile({...profile, industry: e.target.value})} />
        <h1 className='text-sm mb-1'>Education</h1>
        <input type="education" placeholder='Enter...' className='border px-2 outline-none mb-1' value={profile.education} onChange={(e)=> setProfile({...profile, education: e.target.value})} />
        <h1 className='text-sm mb-1'>Country/Region</h1>
        <input type="region" placeholder='Enter...' className='border px-2 outline-none mb12' value={profile.region} onChange={(e)=> setProfile({...profile, region: e.target.value})} />
        <h1 className='text-sm mb-1'>City</h1>
        <input type="city" placeholder='Enter...' className='border px-2 outline-none mb-1' value={profile.city} onChange={(e)=> setProfile({...profile, city: e.target.value})} />
        <h1 className='text-sm mb-1'>Phone number</h1>
        <input type="phone" placeholder='Enter...' className='border px-2 outline-none mb-1' value={profile.phone} onChange={(e)=> setProfile({...profile, phone: e.target.value})} />
        <h1 className='text-sm mb-1'>Address</h1>
        <textarea name='address' cols={5} rows={5} placeholder='Enter...' className='border px-1 outline-none mb-2' value={profile.address} onChange={(e)=> setProfile({...profile, address: e.target.value})} />
        <button type='submit' className='px-2 text-xs md:text-sm font-bold text-white bg-blue-500'>Save</button>
      </form>
    </div>
  )
}

export default UserProfImg
