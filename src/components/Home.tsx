"use client"
import { FaHeart, FaRegHeart, FaRegCommentAlt  } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import Post from "@/components/Post";
import axios from "axios";

interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
const Home = () => {
    const [isBoxPost, setIsBoxPost] = useState(false);
  const handelPost = ()=>{
    setIsBoxPost(!isBoxPost);
  }
  // user id.....................
  const [userId, setId] = useState('')
  const [username, setname] = useState('')

  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      const resname = await axios.get('/api/user/me');
      setId(res.data.data._id);
      setname(resname.data.data.username);
    }
    getUserDetails();
  }, [])
  const [profilImg, setProfilImg] = useState([]);
  const [dataPost, setDataPost] = useState([])
  const [userName, setUserName] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const respost = await axios.get('/api/post/getpost');
        const resuser = await axios.get('/api/userget/userallget');
        const resprofile = await axios.get(`/api/home/profilget`);
        const resprofil = await axios.get(`/api/userget/getprofileImage/${userId}`)

        if (!respost || !resuser || !resprofile || !resprofil) {
          throw new Error('Failed to fetch data');
        }
        setDataPost(respost.data.posts);
        setUserName(resuser.data.users);
        setUserprofiles(resprofile.data.profileimages);
        setProfilImg(resprofil.data.profileimgs)

      } catch (error) {
        console.log('Error Fetch Data', error);
      }
    }
    fetchData();
  }, [userId]);
  const dataFinal = dataPost.map((ele:any)=>{
    const userId = ele.userId;
    const userDetails = userName.find((ele:any)=>(ele._id === userId)) || {};
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    return {...ele,...userDetails,...userProfilesData,_id:ele._id}
  })
  return (
    <div className='flex flex-col justify-center items-center bg-gray-300'>
      <div className="w-[300px] sm:w-[400px] md:w-[500px]">
      <div className="flex flex-row border shadow justify-between p-2 w-[300px] sm:w-[400px] md:w-[500px] bg-emerald-500">
        <Link href={'/userprofile'} className="flex flex-row gap-4">
          {
           profilImg && profilImg.map((ed: any)=>(
              <div key={ed}>
                <Image src={ed.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full bg-gray-200' />
              </div>
            ))
          }
        <h1 className="font-bold text-sm sm:text-base">{username}</h1>
        </Link>
        <button onClick={handelPost} className="text-white shadow bg-green-700 rounded-full p-2 text-xs md:text-sm"><IoMdAdd className="text-base md:text-2xl"/></button>
      </div>
      {isBoxPost && <Post/>}

      {
       dataFinal && dataFinal.map((ele: any)=>(
      <div key={ele} className="">
      <div className="bg-gray-100 my-2 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <Link href={`/networkprofile/${ele.userId}`} className=" flex flex-row items-center gap-4 mb-3 py-2 border-b-2">
          <Image src={ele.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full bg-gray-200' />
          <h1 className="font-bold text-sm md:text-base">{ele.username}</h1>
        </Link>
        <div className="text-xs md:text-sm mb-3">{ele.description}</div>
        <div className="flex w-full justify-center">
          <Image src={ele.imgposty} alt="Bird" width={1000} height={1000} className='w-[90%] h-[400px] bg-gray-300' />
        </div>
        <h1 className="flex flex-row items-center gap-2 p-2"><FaHeart className="text-red-600 md:text-xl"/><span className="text-xs md:text-base">123</span></h1>
        <div className="flex flex-row justify-around border-t-2 py-2">
          <button className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegHeart /></span>Like</button>
          <Link href={`/comment/${ele._id}`} className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegCommentAlt  /></span>Comment</Link>
        </div>
      </div>
      </div>
        ))
      }
      </div>
    </div>
  )
}

export default Home
