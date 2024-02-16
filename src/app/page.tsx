"use client"
import { IoHome, IoBagHandleSharp, IoNotifications  } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import Home from "@/routers/Home";
import Network from "@/routers/Network";
import Message from "@/routers/Message";
import Jobs from "@/routers/Jobs";
import Notification from "@/routers/Notification";
import Menu from "@/routers/Menu";

export default function Page() {
const [selectedButton, setSelectedButton] = useState(null);
  const handelButton = (button: any) => {
    if (selectedButton === button) {
      setSelectedButton(null);
    } else {
      setSelectedButton(button);
    }
  };
  const renderDetails = () => {
    if (selectedButton === 'home') {
      return <Home/>;
    } else if (selectedButton === 'network') {
      return <Network/>;
    } else if (selectedButton === 'message') {
      return <Message/>;
    }else if (selectedButton === 'jobs') {
      return <Jobs/>;
    }else if (selectedButton === 'notification') {
      return <Notification/>;
    }else if (selectedButton === 'menu') {
      return <Menu/>;
    }
    return <Home/>;
  };
   const getButtonStyle = (button: any) => {
    return {
      color: selectedButton === button ? 'blue' : 'black',
    };
  };
  return (
   <main>
    <div className='w-screen top-0 z-50 bg-white fixed flex justify-center items-center gap-6 sm:gap-10 md:gap-14 p-2 shadow'>
      <button onClick={()=> handelButton('home')} style={getButtonStyle('home')} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoHome/></span><span className='text-xs hidden md:block'>Home</span></button>
      <button onClick={()=> handelButton('network')} style={getButtonStyle('network')} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><FaUserFriends/></span><span className='text-xs hidden md:block'>My Network</span></button>
      <button onClick={()=> handelButton('message')} style={getButtonStyle('message')} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoBagHandleSharp/></span><span className='text-xs hidden md:block'>Jobs</span></button>
      <button onClick={()=> handelButton('jobs')} style={getButtonStyle('jobs')} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><BiSolidMessageRoundedDetail/></span><span className='text-xs hidden md:block'>Messaging</span></button>
      <button onClick={()=> handelButton('notification')} style={getButtonStyle('notification')} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoNotifications/></span><span className='text-xs hidden md:block'>Notifications</span></button>
      <button onClick={()=> handelButton('menu')} style={getButtonStyle('menu')} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoMdMenu/></span><span className='text-xs hidden md:block'>Menu</span></button>
    </div>
    <div className="mt-9 md:mt-14">
      {renderDetails()}
    </div>
   </main>
  );
}
