"use client"
import Link from 'next/link'
import { FaHeart, FaRegHeart, FaRegCommentAlt  } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Post from './Post';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const UserPost = () => {
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
  
  // Profile Api..............................
  const [userPost, setUserPost] = useState([])
  const [profilImg, setProfilImg] = useState([]);
  useEffect(()=>{
    const fetchProfil = async ()=>{
      try {
        const resposts = await axios.get(`/api/post/usergetpost/${userId}`);
        const resprofil = await axios.get(`/api/userget/getprofileImage/${userId}`)
        // console.log(response.data)
        if (!resposts || !resprofil) {
          throw new Error('Failed to fetch data');
        }
        setUserPost(resposts.data.postes)
        setProfilImg(resprofil.data.profileimgs)
      } catch (error) {
        console.log(error, 'Error')
      }
    }
    fetchProfil()
  }, [userId])
  return (
    <div>
      <div className="flex flex-row justify-between border-b-4 p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        {
         profilImg && profilImg.map((ex: any)=>(
        <div key={ex} className="flex flex-row gap-4 object-cover">
        <Image src={ex.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full object-cover' />
        <h1 className="font-bold text-sm sm:text-base">{username}</h1>
        </div>
          ))
        }
        <button onClick={handelPost} className="flex flex-row items-center bg-blue-400 gap-3 rounded-2xl px-3 py-1 text-xs md:text-sm"><IoMdAdd/>{' '}Post</button>
      </div>
      <div className="">
        {isBoxPost && <Post/>}
      </div>
      {
       userPost && userPost.map((ele: any)=>(
      <div key={ele} className="">
      <div className="bg-gray-100 my-2 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <div className=" flex flex-row items-center gap-4 mb-3 py-2 border-b-2">
          {
         profilImg && profilImg.map((ex: any)=>(
        <div key={ex} className="flex flex-row items-center justify-between w-full ">
          <div className="flex flex-row gap-4">
            <Image src={ex.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full object-cover' />
            <h1 className="font-bold text-sm sm:text-base">{username}</h1>
          </div>
          <button onClick={()=>console.log('Delet')}>
            <BsThreeDotsVertical/>
          </button>
        </div>
          ))
        }
        </div>
        <div className="text-xs md:text-sm mb-3">{ele.description}</div>
        <div className="flex w-full justify-center">
          <Image src={ele.imgposty} alt="Bird" width={1000} height={1000} className='w-[90%] h-[400px]' />
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
  )
}

export default UserPost
