"use client"
import Connections from '@/components/NetworkFriends'
import NetworkAccept from '@/components/NetworkAccept';
import NewConnection from '@/components/NetworkAllUser'
import React, { useState } from 'react'

const Network = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const handelButton = (button: any) => {
    if (selectedButton === button) {
      setSelectedButton(null);
    } else {
      setSelectedButton(button);
    }
  };
  const renderDetails = () => {
    if (selectedButton === 'friends') {
      return <Connections/>;
    } else if (selectedButton === 'request') {
      return <NetworkAccept/>;
    } else if (selectedButton === 'allusers') {
      return <NewConnection/>;
    }
    return <Connections/>;
  };
  return (
    <div className="flex flex-col justify-center items-center">
    <div className='border flex flex-row justify-center p-2 gap-3 items-center w-full bg-blue-400'>
       <button onClick={()=> handelButton('friends')} className={`bg-white text-xs md:text-sm border px-2 py-1 text-gray-600 shadow`}>Friends</button>
       <button onClick={()=> handelButton('request')} className={`bg-white text-xs md:text-sm border px-2 py-1 text-gray-600 shadow`}>Requests</button>
      <button onClick={()=> handelButton('allusers')} className={`bg-white text-xs md:text-sm border px-2 py-1 text-gray-600 shadow`}>All Users</button>
    </div>
    <div className="p-2">
      {renderDetails()}
    </div>
    </div>
  )
}

export default Network
