'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
const Notifications = () => {
  // userId........................
  const [userId, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])

  const [dataPost, setDataPost] = useState([])
  const [userName, setUserName] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);
  const [noticeGet, setNotices] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const respost = await axios.get(`/api/post/usergetpost/${userId}`);
        const resuser = await axios.get('/api/userget/userallget');
        const resprofile = await axios.get(`/api/home/profilget`);
        const resnotifications = await axios.get(`/api/notifications/getnotice`)

        if (!respost || !resnotifications || !resuser || !resprofile) {
          throw new Error('Failed to fetch data');
        }
        setDataPost(respost.data.postes);
        setUserName(resuser.data.users);
        setUserprofiles(resprofile.data.profileimages);
        setNotices(resnotifications.data.comments)

      } catch (error) {
        console.log('Error Fetch Data', error);
      }
    }
    fetchData();
  }, [userId]);
  
  const notifications = noticeGet.map((exe: any)=>{
    const comtId = exe.id;
    const userIds = exe.userId;
    const userDetails = dataPost.find((ele:any)=>(ele._id === comtId)) || {};
    const userNamesAll = userName.find((ele:any)=>(ele._id === userIds)) || {};
    const userProfiles = userprofiles.find((ele:any)=>(ele._id === userIds)) || {};
    return{...exe,_id:exe._id,...userDetails,...userNamesAll,...userProfiles}
  })
  return (
    <div className='mt-2'>
      {
        notifications.map((lel: any)=>(
            <Link href={`/comment/${lel.id}`} key={lel} className="border bg-teal-400 p-2 gap-4 flex flex-row items-center shadow mb-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-700 bg-slate-500">
                <Image src={lel.imgposty} alt='Bird' width={100} height={100} />
              </div>
              <div className="flex flex-row gap-4">
              <span className="text-xs md:text-sm font-bold">{lel.username}</span>
              <span className='text-xs md:text-sm text-green-700 font-semibold'>comment on you</span>
              <span className='text-xs md:text-sm text-white font-semibold'>{lel.comment}</span>
              </div>
            </Link>
        ))
      }
    </div>
  )
}

export default Notifications

