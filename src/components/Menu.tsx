"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Profile from '@/components/Profile';
import { CiLogout } from "react-icons/ci";

const Menu = () => {
   const router = useRouter()
  const logOutHandel = async () =>{
    try {
      await axios.get('/api/user/logout');
      router.push('/auth');
    } catch (error: any) {
      console.log(error.message)
    }
  }
const [selectedButton, setSelectedButton] = useState(null);
  const handelButton = (button: any) => {
    if (selectedButton === button) {
      setSelectedButton(null);
    } else {
      setSelectedButton(button);
    }
  };
  const renderDetails = () => {
    if (selectedButton === 'post') {
      return <Profile/>;
    } else if (selectedButton === 'amit') {
      return (<div>Comming Soon..............</div>);
    } else if (selectedButton === 'mandal') {
      return (<div>Comming Soon..............</div>);
    }
    return <Profile/>;
  };
   const getButtonStyle = (button: any) => {
    return {
      color: selectedButton === button ? 'lightwhite' : 'white',
      backgroundColor: selectedButton === button ? 'lightblack' : 'black',
    };
  };
  return (
    <main className='flex flex-row w-full gap-4 h-screen'>
      <div className="flex flex-col p-2 border-4 fixed h-screen">
        <button onClick={()=> handelButton('profile')} style={getButtonStyle('profile')} className='px-4 font-bold py-1 text-xs md:text-sm mb-2'>Profile</button>
        <button onClick={()=> handelButton('amit')} style={getButtonStyle('amit')} className='px-4 font-bold py-1  text-xs md:text-sm mb-2'>Thems</button>
        <button onClick={()=> handelButton('mandal')} style={getButtonStyle('mandal')} className='px-4 font-bold py-1 text-xs md:text-sm mb-2'>Sattings</button>
        <button onClick={logOutHandel} className='px-4 py-1 font-bold bg-red-500 text-xs md:text-sm mb-2'><CiLogout/></button>
      </div>
      <div className="p-4 flex flex-col items-center w-full overflow-y-scroll">
        {renderDetails()}
      </div>
    </main>
  )
}

export default Menu
