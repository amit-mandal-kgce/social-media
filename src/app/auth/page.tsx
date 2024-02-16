"use client"
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useState } from "react";

const page = () => {
    const [selectedButton, setSelectedButton] = useState(null);
  const handelButton = (button: any) => {
    if (selectedButton === button) {
      setSelectedButton(null);
    } else {
      setSelectedButton(button);
    }
  };
  const renderDetails = () => {
    if (selectedButton === 'login') {
      return <Login/>;
    } else if (selectedButton === 'register') {
      return <Register/>;
    }
    return <Login/>;
  };
   const getButtonStyle = (button: any) => {
    return {
      color: selectedButton === button ? 'white' : 'black',
    };
  };
  return (
    <main className="flex flex-col  justify-center items-center bg-slate-400 h-screen">
      <div className="p-5 bg-red-300">
          <div className="flex flex-row justify-around w-full items-center bg-blue-200 gap-5 p-2 mb-4">
            <button onClick={()=> handelButton('login')} style={getButtonStyle('login')} className=' text-base md:text-2xl font-bold'>Login</button>
            <button onClick={()=> handelButton('register')} style={getButtonStyle('register')} className=' text-base md:text-2xl font-bold'>Register</button>
          </div>
          <div className="p-4 bg-gray-200 rounded shadow-transparent">
            {renderDetails()}
          </div>

      </div>
    </main>
  )
}

export default page
