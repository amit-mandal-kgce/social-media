"use client"
import { FaHeart, FaRegHeart, FaRegCommentAlt  } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import Post from "@/components/Post";

const Home = () => {
    const [isBoxPost, setIsBoxPost] = useState(false);
  const handelPost = ()=>{
    setIsBoxPost(!isBoxPost);
  }
  return (
    <div className='flex flex-col justify-center items-center '>
      <div className="w-[300px] sm:w-[400px] md:w-[500px]">
      <div className="flex flex-row justify-between border-b-4 p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <Link href={'/userprofile'} className="flex flex-row gap-4">
        <Image src="/amit.jpg" alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full' />
        <h1 className="font-bold text-sm sm:text-base">Amit Mandal</h1>
        </Link>
        <button onClick={handelPost} className="flex flex-row text-white font-bold items-center bg-blue-400 gap-1 md:gap-2 rounded-2xl px-3 md:py-1 text-xs md:text-sm"><IoMdAdd className="text-base md:text-2xl"/>{' '}Post</button>
      </div>
      {isBoxPost && <Post/>}
      {
        [1,2,3,4,5,6,7,8,9,10].map((ele)=>(
      <div key={ele} className="">
      <div className="bg-gray-100 my-2 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <div className=" flex flex-row items-center gap-4 mb-3 py-2 border-b-2">
          <Image src="/amit.jpg" alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full' />
          <h1 className="font-bold text-sm md:text-base">Amit Mandal</h1>
          <button className='font-light text-blue-500 text-sm md:text-base'>Follow</button>
        </div>
        <div className="text-xs md:text-sm mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia magnam sequi ratione velit porro perspiciatis iusto eius beatae nesciunt recusandae?</div>
        <div className="flex w-full justify-center">
          <Image src="/dsc.jpg" alt="Bird" width={1000} height={1000} className='w-[90%] h-[400px]' />
        </div>
        <h1 className="flex flex-row items-center gap-2 p-2"><FaHeart className="text-red-600 md:text-xl"/><span className="text-xs md:text-base">123</span></h1>
        <div className="flex flex-row justify-around border-t-2 py-2">
          <button className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegHeart /></span>Like</button>
          <Link href={'/comment'} className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegCommentAlt  /></span>Comment</Link>
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
