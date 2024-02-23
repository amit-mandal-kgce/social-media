'use client'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
interface messageTypes {
  userId:string;
  msgId:string;
  textmsg:string;
}
const Page = ({ params }:{ params: { id: string } }) => {
  const id = params.id;
   // User me.....................
  const [me, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  // users all profiles................
  const [userall, setUserall] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);
  const [messageSetMe, setMessageMe] = useState<messageTypes[]>([]);
  const [messageSetConnect, setMessageConnect] = useState<messageTypes[]>([]);

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const resuser = await axios.get(`/api/message/userget/${id}`);
        const resprofile = await axios.get(`/api/home/profilget`);
        const meresmessage = await axios.get(`/api/message/getmsg/${me}`)
        const connectresmessage = await axios.get(`/api/message/getmsg/${id}`)
        if(!resuser || !resprofile || !meresmessage){
          console.log("Data Fetch Faild");
        }
        setUserall(resuser.data.userConnections);
        setUserprofiles(resprofile.data.profileimages);
        setMessageMe(meresmessage.data.userMessages);
        setMessageConnect(connectresmessage.data.userMessages);

      } catch (error) {
        console.log(error, "Error")
      }
    }
    fetchUser()
  }, [id, me])
  const userAllFinal = userall.map((ele: any)=>{
    const userId = ele._id;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    return {...ele,...userProfilesData,_id:ele._id}
  })
  console.log('hhh', messageSetMe)
 
  // Message send api calll..................
  const [sendMsg, setSendMsg] = useState({
    textmsg: '',
  });
  const handelClick = async (connectId: any)=>{
    try {
      const messData = {
        userId: me,
        connectId: connectId,
        textmsg: sendMsg.textmsg
      }
      const response = await axios.post(`/api/message/msgpost`, messData);
      console.log(response.data)

    } catch (error) {
      console.log('message sending Failed!', error)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center '>
      {
            userAllFinal && userAllFinal.map((esx: any)=>(
              <div key={esx}>
          <div className="flex flex-row justify-between items-center border p-2 w-[300px] sm:w-[400px] md:w-[500px]">
            <Link href={'/messaging'} className=""><FaArrowLeft/></Link>
            <h1>{id}</h1>
            <div className="flex flex-row gap-2">
              <Image src={esx.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full bg-gray-200' />
              <h1 className="font-bold text-sm sm:text-base">{esx.username}</h1>
            </div>
          </div>
          <div className="border shadow p-3 w-[300px] sm:w-[400px] md:w-[500px] h-[650px] overflow-y-scroll">
            {
              messageSetConnect && messageSetConnect.map((ax: any)=>(
                <div key={ax} className="border p-2">
                  <h1 className='text-teal-600'>{ax.textmsg}</h1>
                </div>
              ))
            }
            {
              messageSetMe && messageSetMe.map((ele: any)=>(
                <div key={ele} className="border text-right p-2">
                  <h1 className='text-blue-300'>{ele.textmsg}</h1>
                </div>
              ))
            }
          </div>
          <div className="border shadow p-1 w-[300px] sm:w-[400px] md:w-[500px] flex flex-row gap-4 px-2">
            <input type="text" className='border shadow w-full rounded-full outline-none px-3' value={sendMsg.textmsg} onChange={(e)=> setSendMsg({...sendMsg, textmsg: e.target.value})}/>
            <button onClick={()=> handelClick(esx._id)} className='shadow rounded-full p-2'><IoIosSend/></button>
          </div>
          </div>
        ))
      }
    </div>
  )
}

export default Page
