"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import NetworkPost from '@/components/NetworkPost';
import NetworkAbout from '@/components/NetworkAbout';
import NetworkMore from '@/components/NetworkMore';

interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}

interface ProfDetTypes {
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

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // .................
  const [userall, setUserall] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);
  const [userprofBack, setUserprofBack] = useState([]);
  const [userprofDet, setUserprofDet] = useState<ProfDetTypes[]>([]);

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const resuser = await axios.get(`/api/home/user/${id}`);
        const resprofile = await axios.get(`/api/home/profilget`);
        const resprofileBack = await axios.get(`/api/home/backprofget`);
        const resprofDet = await axios.get(`/api/home/profdetget/${id}`);
        if(!resuser || !resprofile || !resprofileBack || !resprofDet){
          console.log("Data Fetch Faild");
        }
        setUserall(resuser.data.users)
        setUserprofiles(resprofile.data.profileimages);
        setUserprofBack(resprofileBack.data.backimgs);
        setUserprofDet(resprofDet.data.profiles);

      } catch (error) {
        console.log(error, "Error")
      }
    }
    fetchUser()
  }, [id])
  const userAllFinal = userall.map((ele: any)=>{
    const userId = ele._id;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    const userProfBackData =userprofBack.find((ele: any)=>(ele.userId === userId)) || {};
    const userProfDetail =userprofDet.find((ele)=>(ele.userId === userId)) || {};
    return {...ele,...userProfilesData,...userProfBackData,...userProfDetail,_id:ele._id}
  })
 
  // ..............................................................
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
      return <NetworkPost id={id}/>;
    } else if (selectedButton === 'about') {
      return <NetworkAbout userId={id}/>;
    } else if (selectedButton === 'more') {
      return <NetworkMore id={id}/>;
    }
    return <NetworkPost id={id}/>;
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
  return (
    <div className='flex flex-col items-center'>
        <div className="p-2 w-[310px] sm:w-[410px] md:w-[510px] mb-2 border inline-block ">
          {
            userAllFinal && userAllFinal.map((exe: any)=>(
              <div key={exe}>
                <div className="w-[300px] md:w-[480px] h-[200px] md:h-[300px] overflow-hidden">
          <Image src={exe.backImage} alt="Bird" className='object-cover full bg-gray-300' width={1000} height={1000}/>
          </div>
          <div className="border-4 border-white absolute -mt-20 md:-mt-28 flex overflow-hidden justify-center items-center rounded-full w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
            <Image src={exe.profilImg} alt="Bird" className='bg-gray-200' width={500} height={500}/>
          </div>
            
          <div className="mt-12">
            <h1 className="font-bold text-sm md:text-base">{exe.username}</h1>
            <h1 className="font-light text-xs md:text-sm">3K Connections</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.heading}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.industry}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.education}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.region}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.city}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.phone}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.email}</h1>
            <h1 className="font-light text-xs md:text-sm mb-2">{exe.address}</h1>
          </div>
              </div>
            ))
          }
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

export default Page;
