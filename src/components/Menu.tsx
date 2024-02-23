"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Profile from '@/components/Profile';
import { CiLogout } from "react-icons/ci";
import ProfileBackImage from './ProfileBackImage';
import ProfileImage from './ProfileImage';
import { FaImage } from "react-icons/fa6";
import { MdDetails } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

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
      return (<div><div><h1>Profile Background</h1><ProfileBackImage/></div><div className='mt-4'><h1>Profile Image</h1><ProfileImage/></div></div>);
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
      <div className="flex sm:flex-col bottom-0 sm:top-10 md:top-14 justify-between sm:justify-normal items-center bg-yellow-500 p-2 w-full sm:w-16 sm:border-4 fixed">
        <button onClick={()=> handelButton('profile')} style={getButtonStyle('profile')} className='px-4 font-bold py-1 text-xs md:text-sm sm:mb-2'><MdDetails/></button>
        <button onClick={()=> handelButton('amit')} style={getButtonStyle('amit')} className='px-4 font-bold py-1  text-xs md:text-sm sm:mb-2'><FaImage/></button>
        <button onClick={()=> handelButton('mandal')} style={getButtonStyle('mandal')} className='px-4 font-bold py-1 text-xs md:text-sm sm:mb-2'><IoMdSettings/></button>
        <button onClick={logOutHandel} className='px-4 py-1 font-bold bg-red-500 text-xs md:text-sm sm:mb-2'><CiLogout/></button>
      </div>
      <div className="p-4 flex flex-col items-center w-full">
        {renderDetails()}
      </div>
    </main>
  )
}

export default Menu
