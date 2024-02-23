'use client'
import UserAbout from './UserAbout';
import UserMore from './UserMore';
import UserPost from './UserPost';
import Image from 'next/image';
import React, {useState, useEffect} from 'react'
import { RiFileEditFill } from "react-icons/ri";
import axios from 'axios';
import UserProfilDetail from '@/components/UserProfilDetail'

interface ProfileTypes {
  _id:string;
  userId:string;
  heading:string;
  industry:string;
  education:string;
  region:string;
  city:string;
  phone:number;
  address:string;
}
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
  const [userId, setId] = useState('')
  const [userName, setName] = useState('')
  const [userEmail, setEmail] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      setId(res.data.data._id);
      setName(res.data.data.username);
      setEmail(res.data.data.email);
    }
    getUserDetails();
  }, [])
  // Profile Api..............................
  const [dataBackground, setDataBackground] = useState([])
  const [profilImg, setProfilImg] = useState([]);
  const [profilDetail, setProfilDetail] = useState<ProfileTypes[]>([]);
  useEffect(()=>{
    const fetchProfil = async ()=>{
      try {
        const resbackground = await axios.get(`/api/userget/getprofilebackimage/${userId}`);
        const resprofile = await axios.get(`/api/userget/getprofileImage/${userId}`)
        const resprofiledet = await axios.get(`/api/userget/getprofile/${userId}`)
        if (!resbackground || !resprofile || !resprofiledet) {
          throw new Error('Failed to fetch data');
        }
      setDataBackground(resbackground.data.backimgs);
      setProfilImg(resprofile.data.profileimgs)
      setProfilDetail(resprofiledet.data.profiles)
      } catch (error) {
        console.log(error, 'Error')
      }
    }
    fetchProfil()
  }, [userId])
  
  return (
    <div className='flex flex-col items-center'>
        <div className="p-2 w-[310px] sm:w-[410px] md:w-[510px] mb-2 border">
          {
           dataBackground && dataBackground.map((ele: any)=>(
          <div key={ele} className="w-[300px] md:w-[480px] h-[200px] md:h-[300px] overflow-hidden">
          <Image src={ele.backImage} alt="Bird" className='object-cover full bg-gray-300' width={1000} height={1000}/>
          </div>
            ))
          }
          {
           profilImg && profilImg.map((e: any)=>(
          <div key={e} className="-mt-40 md:-mt-54 flex overflow-hidden justify-center items-center rounded-full w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
            <Image src={e.profilImg} alt="Bird" className='bg-gray-200' width={500} height={500}/>
          </div>
            ))
          }
          <div className="w-full flex justify-end p-2">
            <button onClick={toggleDownItems} className='text-2xl' ><RiFileEditFill/></button>
          </div>
            {showDownItems ? <UserProfilDetail/>:
          <div className="">
            <h1 className="font-bold text-sm md:text-base">{userName}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">3K Connections</h1>
            {
              profilDetail && profilDetail.map((erw: any)=>(
            <div key={erw}>
            <h1 className="font-light text-xs md:text-sm mb-2">{erw.heading}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{erw.industry}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{erw.education}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{erw.region}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{erw.city}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{erw.phone}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{userEmail}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{erw.address}</h1>
            </div>
              ))
            }
            {/* <h1 className="font-semibold text-xs md:text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, ab!</h1> */}
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
