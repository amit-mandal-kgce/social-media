'use client'
import UserAbout from './UserAbout';
import UserMore from './UserMore';
import UserPost from './UserPost';
import UserProfImg from './UserProfilDetail';
import Link from 'next/link';
import Image from 'next/image';
import { RiImageAddFill } from "react-icons/ri";
import React, {useState, useEffect} from 'react'
import { FaArrowLeft, FaCirclePlus } from "react-icons/fa6";
import { RiFileEditFill } from "react-icons/ri";
import axios from 'axios';
import ProfileBackImage from './ProfileBackImage'
import ProfileImage from './ProfileImage';
import UserProfilDetail from '@/components/UserProfilDetail'
const Profile = () => {
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
  const [showDownItems, setShowDownItems] = useState(false);
  const toggleDownItems = () => {
    setShowDownItems(!showDownItems);
  };
  const [bgImage, setbgImage] = useState(false);
  const handelBgImage = () =>{
    setbgImage(!bgImage)
  }
  const [profileImage, setprofileImage] = useState(false);
  const handelProfImage = () =>{
    setprofileImage(!profileImage)
  }
  const [userId, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])

  
  // const [profile, setProfile] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch(`/api/userget/getprofile?userId=${userId}`);

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch profile');
  //       }

  //       const data = await response.json();
  //       setProfile(data.userProfile);
  //     } catch (error: any) {
  //       setError(error.message);
  //     }
  //   };

  //   fetchProfile();
  // }, [userId]);
  // console.log('profile :>>', profile)
  // console.log('error :>>', error)
  return (
    <div className='flex flex-col items-center'>
        <div className="p-2 w-[310px] sm:w-[410px] md:w-[510px] mb-2 border inline-block ">
          <button onClick={handelBgImage} className="text-gray-200 font-bold text-4xl flex justify-end absolute">
            <RiImageAddFill/>
          </button>
          <div className="w-[300px] md:w-[480px] h-[200px] md:h-[300px] overflow-hidden">
          <Image src="/dsc.jpg" alt="Bird" className='object-cover full' width={1000} height={1000}/>
          </div>
          <div className="border-4 border-white absolute -mt-20 md:-mt-28 flex overflow-hidden justify-center items-center rounded-full w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
            <Image src="/amit.jpg" alt="Bird" className='' width={500} height={500}/>
          </div>
          <button onClick={handelProfImage} className="text-gray-200 font-bold ml-10 md:ml-24 text-2xl md:text-4xl flex justify-end absolute">
            <RiImageAddFill/>
          </button>
          {bgImage && <ProfileBackImage/>}
          {profileImage && <ProfileImage/>}
          <div className="w-full flex justify-end mt-7 p-2">
            <button onClick={toggleDownItems} className='text-2xl' ><RiFileEditFill/></button>
          </div>
            {showDownItems ? <UserProfilDetail/>:
          <div className="">
            <h1 className="font-bold text-sm md:text-base">Amit Mandal</h1>
            <h1 className="font-light text-xs md:text-sm">3K Connections</h1>
            <h1 className="font-semibold text-xs md:text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, ab!</h1>
          </div>}
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

export default Profile
