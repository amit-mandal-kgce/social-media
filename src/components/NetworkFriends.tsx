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
const Connections = () => {
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
  const finalConnection = connectSet.map((exe: any)=>{
    const userId = exe.connectId;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    const userUserall =userall.find((ele: any)=>(ele._id === userId)) || {};
    return{...exe,...userProfilesData,...userUserall,_id: exe._id}
  })
  const finalConnectionOther = otherConnectSet.map((exe: any)=>{
    const userId = exe.userId;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    const userUserall =userall.find((ele: any)=>(ele._id === userId)) || {};
    return{...exe,...userProfilesData,...userUserall,_id: exe._id}
  })
  // console.log('hhh', finalConnectionOther)
  // Remove connections.................................
  const handelClickRemove = async (_id: any) =>{
    try {
      const response = await axios.delete(`/api/network/delet/${_id}`);
      alert('UnFriends SuccessFully!')
            window.location.reload();
    } catch (error) {
      console.log("Error Unfriends", error)
    }
  }
  
  return (
    <div>
      {
        finalConnection && finalConnection.map((lel: any)=>(
            <div key={lel} className="border p-2 gap-4 flex flex-row items-center bg-teal-200 shadow mb-2">
              <Image src={lel.profilImg} alt='Bird' className='bg-gray-200' width={70} height={70} />
              <div className="flex flex-col">
              <h1 className='text-xs font-light mb-2'>12 Connections</h1>
              <h1 className="text-xs md:text-sm font-bold">{lel.username}</h1>
              <h1 className="text-xs md:text-sm font-bold">{lel.email}</h1>
              <h1 className="text-xs md:text-sm font-bold">{lel._id}</h1>
              <div className="flex flex-row gap-3">
                <Link href={`/message/${lel.connectId}`} className='px-3 py-2 text-xs bg-blue-500 text-white shadow mt-2 font-bold'>Message</Link>
                <button onClick={()=> handelClickRemove(lel._id)} className='px-3 py-2 bg-blue-500 text-white text-xs shadow mt-2 font-bold'>Unfollow</button>
              </div>
              </div>
            </div>
        ))
      }
      {
        finalConnectionOther && finalConnectionOther.map((loal: any)=>(
            <div key={loal} className="border p-2 gap-4 flex flex-row items-center bg-teal-200 shadow mb-2">
              <Image src={loal.profilImg} alt='Bird' className='bg-gray-200' width={70} height={70} />
              <div className="flex flex-col">
              <h1 className='text-xs font-light mb-2'>12 Connections</h1>
              <h1 className="text-xs md:text-sm font-bold">{loal.username}</h1>
              <h1 className="text-xs md:text-sm font-bold">{loal.email}</h1>
              <h1 className="text-xs md:text-sm font-bold">{loal._id}</h1>
              <div className="flex flex-row gap-3">
                <Link href={`/message/${loal.connectId}`} className='px-3 py-2 text-xs bg-blue-500 text-white shadow mt-2 font-bold'>Message</Link>
                <button onClick={()=> handelClickRemove(loal._id)} className='px-3 py-2 bg-blue-500 text-white text-xs shadow mt-2 font-bold'>Unfollow</button>
              </div>
              </div>
            </div>
        ))
      }
    </div>
  )
}

export default Connections

