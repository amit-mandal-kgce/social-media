"use client"
import Link from 'next/link';
import Image from 'next/image';
import React, {useState, useEffect} from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import axios from 'axios';
import { FaHeart, FaRegHeart, FaRegCommentAlt  } from "react-icons/fa";

interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
const Page = ({ params }:{ params: { id: string } }) => {
  const id = params.id;
  // userId........................
  const [userId, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  // comment get..............
  const [postData, setPostData] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);
  const [postComment, setPostComment] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try {
      const resposts = await axios.get(`/api/post/getcomment/${id}`);
      const resuser = await axios.get('/api/userget/userallget');
      const resprofile = await axios.get(`/api/home/profilget`);
      const rescomment = await axios.get(`/api/comment/commentget/${id}`);
      if(!resposts || !rescomment){
        console.log('Fetch Data Handel Error')
      }
      setPostData(resposts.data.postes)
      setUserName(resuser.data.users);
      setUserprofiles(resprofile.data.profileimages);
      setPostComment(rescomment.data.comments)
    } catch (error) {
      console.log(error, 'Error')
    }
    }
    fetchData()
  }, [id])
  const dataFinalCom = postData.map((ele:any)=>{
    const userId = ele.userId;
    const userDetails = userName.find((ele:any)=>(ele._id === userId)) || {};
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    return {...ele,...userDetails,...userProfilesData,_id:ele._id}
  })
  console.log(dataFinalCom, 'dataFinalCom :>>')
  const postCommentFinal = postComment.map((ety: any)=>{
    const userId = ety.userId;
    const userDetails = userName.find((eles:any)=>(eles._id === userId)) || {};
    const userProfilesData =userprofiles.find((elex)=>(elex.userId === userId)) || {};
    return {...ety,...userDetails,...userProfilesData,_id:ety._id}
  })
  console.log(postCommentFinal, 'postCommentFinal :>>')
  // Comment Posts.........................
  const [commentdata, setCommentData] = useState({
    comment: ''
  })
  const handelSubmit = async (e: any)=>{
    e.preventDefault();
    try {
      const commentDatas = {
      id: id,
      userId: userId,
      comment: commentdata.comment,
    };
      const response = await axios.post('/api/comment/commentpost', commentDatas);
            console.log('signup okey', response.data)
            alert('Abouts Add SuccessFully!')
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to Abouts Upgrade', error.message)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div className="p-2 w-full shadow bg-white fixed">
            <Link href={'/'}><FaArrowLeft/></Link>
      </div>
      {dataFinalCom && dataFinalCom.map((ert: any)=>(
      <div key={ert} className="bg-gray-100 mt-10 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <div className=" flex flex-row items-center gap-4 mb-3 py-2 border-b-2">
          <Image src={ert.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full' />
          <h1 className="font-bold text-sm md:text-base">{ert.username}</h1>
        </div>
        <div className="text-xs md:text-sm mb-3">{ert.description}</div>
        <div className="flex w-full justify-center">
          <Image src={ert.imgposty} alt="Bird" width={1000} height={1000} className='w-[90%] h-[400px]' />
        </div>
        <h1 className="flex flex-row items-center gap-2 p-2"><FaHeart className="text-red-600 md:text-xl"/><span className="text-xs md:text-base">123</span></h1>
        <div className="flex flex-row justify-around border-t-2 py-2">
          <button className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegHeart /></span>Like</button>
          <Link href={`/comment/${id}`} className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegCommentAlt  /></span>Comment</Link>
        </div>
      </div>))}
      <div className="my-2 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <form className="p-2 flex flex-row gap-4" onSubmit={handelSubmit}>
          <input type="text" className='outline-none border px-2 shadow w-full' value={commentdata.comment} onChange={(ea)=> setCommentData({...commentdata, comment: ea.target.value})}/>
          <button type='submit'><IoIosSend className='text-xl md:text-2xl shadow rounded-full'/></button>
        </form>
      <h1 className="font-light text-xs md:text-sm mb-4">Comments</h1>
      {
        postCommentFinal.map((el: any)=>(
        <div key={el} className="flex flex-row gap-2 mb-2">
          <Image src={el.profilImg} alt='Bird' width={100} height={100} className='w-[30px] h-[30px] rounded-full'/>
          <div className="bg-gray-100 p-2">
            <h1 className="font-bold text-xs md:text-base mb-1">{el.username}</h1>
            <h2 className="font-lignt text-xs md:text-sm">{el.comment}</h2>
          </div>
        </div>
        ))
      }
      </div>
    </div>
  )
}

export default Page
