'use client'
import UserAbout from '@/components/UserAbout';
import UserMore from '@/components/UserMore';
import UserPost from '@/components/UserPost';
import UserProfImg from '@/components/UserProfImg';
import Link from 'next/link';
import Image from 'next/image';
import React, {useState, useEffect} from 'react'
import { FaArrowLeft, FaCirclePlus } from "react-icons/fa6";
import axios from 'axios';
import ProfileBackImage from '@/components/ProfileBackImage';
import BackImgs from '@/models/userProfileBackImgModels';
import ProfileImage from '@/components/ProfileImage';

const Page = () => {
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
      return <UserPost/>;
    } else if (selectedButton === 'about') {
      return <UserAbout/>;
    } else if (selectedButton === 'more') {
      return <UserMore/>;
    }
    return <UserPost/>;
  };
   const getButtonStyle = (button: any) => {
    return {
      color: selectedButton === button ? 'lightblue' : 'black',
    };
  };
  const [userEdit, setUserEdit] = useState(false)
  const handelClick = ()=> {
    setUserEdit(!userEdit);
  }
  const [bgImage, setbgImage] = useState(false);
  const handelBgImage = () =>{
    setbgImage(!bgImage)
  }
  const [profileImage, setprofileImage] = useState(false);
  const handelProfImage = () =>{
    setprofileImage(!profileImage)
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
    <div className='flex flex-col items-center w-full'>
        <div className="p-2 w-full bg-red-300 fixed z-50 flex flex-row justify-between">
            <Link href={`/home/${id}`}><FaArrowLeft/></Link>
            <h1 >Amit Mandal</h1>
            <button onClick={handelClick} className='px-2 text-white bg-blue-700'>Edit</button>
            <UserProfImg isImageShow={userEdit} handelClick={handelClick}/>
        </div>
        <div className="p-2 w-[300px] sm:w-[400px] md:w-[500px] mt-10 mb-2 border inline-block">
          <button onClick={handelBgImage} className="text-gray-200 font-bold text-4xl flex justify-end absolute">
            <FaCirclePlus/>
          </button>
          <ProfileBackImage isVisible={bgImage} handelBgImage={handelBgImage}/>
          <div className="w-[300px] md:w-[480px] h-[200px] md:h-[300px] overflow-hidden">
          <Image src="/dsc.jpg" alt="Bird" className='object-cover full' width={1000} height={1000}/>
          </div>
          <div className="border-4 border-white absolute -mt-20 md:-mt-28 flex overflow-hidden justify-center items-center rounded-full w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
            <Image src="/amit.jpg" alt="Bird" className='' width={500} height={500}/>
          </div>
          <button onClick={handelProfImage} className="text-gray-200 font-bold ml-10 md:ml-24 text-2xl md:text-4xl flex justify-end absolute">
            <FaCirclePlus/>
          </button>
          <ProfileImage isprofil={profileImage} handelProfImage={handelProfImage}/>
          <div className="py-6 md:py-10">
            <h1 className="font-bold text-sm md:text-base">Amit Mandal</h1>
            <h1 className="font-light text-xs md:text-sm">3K Connections</h1>
            <h1 className="font-semibold text-xs md:text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, ab!</h1>
          </div>
          <div className="flex flex-row justify-around items-center p-2 border-y-4">
            <button onClick={()=> handelButton('post')} style={getButtonStyle('post')} className=' text-xs md:text-sm'>Post</button>
            <button onClick={()=> handelButton('about')} style={getButtonStyle('about')} className=' text-xs md:text-sm'>About</button>
            <button onClick={()=> handelButton('more')} style={getButtonStyle('more')} className=' text-xs md:text-sm'>More</button>
          </div>
          {renderDetails()}
        </div>
    </div>
  )
}

export default Page
