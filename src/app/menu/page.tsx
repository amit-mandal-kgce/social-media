"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {
  const router = useRouter()
  const logOutHandel = async () =>{
    try {
      await axios.get('/api/user/logout');
      router.push('/');
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const [id, setId] = useState('')

  const getUserDetails = async ()=>{
    const res = await axios.get('/api/user/me');
    console.log(res.data);
    setId(res.data.data._id);
  }
  return (
    <div className='py-14 flex flex-col'>
      <Link href={'/userprofile'}>User Profile</Link>
      <h1>{id}ggg</h1>
      <button onClick={logOutHandel} className='p-2 bg-red-900 text-white'>Log Out</button>
      <button onClick={getUserDetails} className='p-2 bg-red-900 text-white'>details</button>
      <Link href={`/message/${id}`}>{id}kkk</Link>
    </div>
  )
}

export default Page
