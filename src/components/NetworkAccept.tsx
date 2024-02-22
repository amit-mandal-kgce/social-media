import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
interface RequestTypes {
  userId:string;
  connectId:string;
}
const NetworkAccept = () => {
    const [me, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  // connection post....................
  const handelClick = async (_id: string, userId: string) =>{
    try {
      const connectData = {
      userId: me,
      connectId: userId,
    };
        await axios.post(`/api/network/post`, connectData);
        await axios.delete(`/api/network/requestaccept/${_id}`);
        alert('Request Accept successfully')
        window.location.reload();
    } catch (error: any) {
      console.log('Failed to Connections', error.message)
    }
  }
  // users all profiles................
  const [userall, setUserall] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);
  const [requestSet, setRequest] = useState<RequestTypes[]>([]);

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const resrequest = await axios.get(`/api/network/requestget/${me}`);
        const resuser = await axios.get('/api/userget/userallget');
        const resprofile = await axios.get(`/api/home/profilget`);
        if(!resrequest || !resuser || !resprofile){
          console.log("Data Fetch Faild");
        }
        setUserall(resuser.data.users)
        setUserprofiles(resprofile.data.profileimages);
        setRequest(resrequest.data.requests);

      } catch (error) {
        console.log(error, "Error")
      }
    }
    fetchUser()
  }, [me])

  const requestAllFinal = requestSet.map((ele: any)=>{
    const _id = ele.userId;
    const allUsers = userall.find((ed: any)=>(ed._id === _id)) || {};
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === _id)) || {};
    return {...ele,...userProfilesData,...allUsers,userId: ele.userId,_id: ele._id}
  })

  console.log(requestSet, 'AA')
  console.log(requestAllFinal, 'xx')
  return (
    <div>
        {
            requestAllFinal && requestAllFinal.map((exp: any)=>(
                <div key={exp} className="border p-2 gap-4 flex flex-row items-center bg-teal-300 shadow-2xl mb-2">
                    <Image src={exp.profilImg} alt='Bird' className='bg-gray-200' width={70} height={70} />
                    <div className="flex flex-col">
                      <h1>{exp._id}Id Main</h1>
                      <h1>{exp.userId}UserId</h1>
                        <Link href={`/networkprofile/${exp.userId}`} className='text-xs font-light mb-1'>12 Connections</Link>
                        <Link href={`/networkprofile/${exp.userId}`} className="text-xs md:text-sm font-bold mb-2">{exp.username}</Link>
                        <Link href={`/networkprofile/${exp.userId}`} className="text-xs md:text-sm font-bold mb-2">{exp.email}</Link>
                        <button onClick={()=> handelClick(exp._id, exp.userId)} className='border border-blue-500 px-2 rounded-lg text-white bg-blue-500 shadow'>Follow Back</button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default NetworkAccept
