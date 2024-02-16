import Link from 'next/link';
import Image from 'next/image';
import React, {useState, useEffect} from 'react'
import { FaArrowLeft, FaCirclePlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import axios from 'axios';
import ProfileBackImage from '@/components/ProfileBackImage';
import ProfileImage from '@/components/ProfileImage';
import { FaHeart, FaRegHeart, FaRegCommentAlt  } from "react-icons/fa";



const page = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className="p-2 w-full shadow bg-white fixed">
            <Link href={'/'}><FaArrowLeft/></Link>
      </div>
      <div className="bg-gray-100 mt-10 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
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
      <div className="my-2 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <form className="p-2 flex flex-row gap-4">
          <input type="text" className='outline-none border px-2 shadow w-full'/>
          <button type='submit'><IoIosSend className='text-xl md:text-2xl shadow rounded-full'/></button>
        </form>
      <h1 className="font-light text-xs md:text-sm mb-4">Comments</h1>
      {
        [1,2,3,4,5,6].map((ele)=>(
        <div key={ele} className="flex flex-row gap-2 mb-2">
          <Image src={"/amit.jpg"} alt='Bird' width={100} height={100} className='w-[30px] h-[30px] rounded-full'/>
          <div className="bg-gray-100 p-2">
            <h1 className="font-bold text-xs md:text-base mb-1">Amit Mandal</h1>
            <h2 className="font-lignt text-xs md:text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, animi.</h2>
          </div>
        </div>
        ))
      }
      </div>
    </div>
  )
}

export default page
