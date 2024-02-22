'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';

interface ConnectTypes {
  userId:string;
  connectId:string;
}
interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
const MessageBox = () => {
  const [me, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  // fetch Connections...............
  const [connectSet, setConnect] = useState<ConnectTypes[]>([]);
  const [otherConnectSet, setotherConnect] = useState<ConnectTypes[]>([]);
  const [userall, setUserall] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);
  useEffect(()=>{
    const fetchConnection = async ()=>{
      try {
        const resconnect = await axios.get(`/api/network/get/${me}`);
        const resconnectother = await axios.get(`/api/network/getother/${me}`);
        const resuser = await axios.get('/api/userget/userallget');
        const resprofile = await axios.get(`/api/home/profilget`);
        if(!resconnect || !resuser || !resprofile || resconnectother){
          console.log("Data Fetch Faild");
        }
        setConnect(resconnect.data.connections);
        setUserall(resuser.data.users)
        setUserprofiles(resprofile.data.profileimages);
        setotherConnect(resconnectother.data.connectionsother)
      } catch (error) {
        console.log('connection data Fetch Faild!', error);
      }
    }
    fetchConnection();
  }, [me])
  const finalConnectionOther = otherConnectSet.map((exe: any)=>{
    const userId = exe.userId;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    const userUserall =userall.find((ele: any)=>(ele._id === userId)) || {};
    return{...exe,...userProfilesData,...userUserall,_id: exe._id}
  })
  const finalConnectionConnect = connectSet.map((exe: any)=>{
    const userId = exe.connectId;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    const userUserall =userall.find((ele: any)=>(ele._id === userId)) || {};
    return{...exe,...userProfilesData,...userUserall,_id: exe._id}
  })
  console.log('message',finalConnectionOther)
  return (
    <div className='mt-2'>
      {
        finalConnectionOther.map((lel: any)=>(
            <Link href={`/message/${lel.userId}`} key={lel} className="border p-2 bg-teal-200 gap-4 flex flex-row items-center shadow mb-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-600">
                <Image src={lel.profilImg} alt='Bird' width={100} height={100} className='rounded-full'/>
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold text-white mb-2">{lel.username}</span>
                <span className="text-xs md:text-sm font-bold text-white">{lel.email}</span>
              </div>
            </Link>
        ))
      }
      {
        finalConnectionConnect.map((lel: any)=>(
            <Link href={`/message/${lel.connectId}`} key={lel} className="border p-2 gap-4 flex flex-row items-center shadow mb-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-600">
                <Image src={lel.profilImg} alt='Bird' width={100} height={100} className='rounded-full'/>
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold mb-2">{lel.username}</span>
                <span className="text-xs md:text-sm font-bold">{lel.email}</span>
              </div>
            </Link>
        ))
      }
    </div>
  )
}

export default MessageBox
