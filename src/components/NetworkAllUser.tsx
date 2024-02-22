import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';

interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
const NewConnection = () => {
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
  const handelClick = async (id: any) =>{
    try {
      const connectData = {
      userId: me,
      connectId: id,
    };
      const response = await axios.post(`/api/network/requestpost`, connectData);
            alert('Connections SuccessFully!')
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to Connections', error.message)
    }
  }
  // users all profiles................
  const [userall, setUserall] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const resuser = await axios.get('/api/userget/userallget');
        const resprofile = await axios.get(`/api/home/profilget`);
        if(!resuser || !resprofile){
          console.log("Data Fetch Faild");
        }
        setUserall(resuser.data.users)
        setUserprofiles(resprofile.data.profileimages);

      } catch (error) {
        console.log(error, "Error")
      }
    }
    fetchUser()
  }, [])
  const userAllFinal = userall.map((ele: any)=>{
    const userId = ele._id;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    return {...ele,...userProfilesData,_id:ele._id}
  })
  return (
    <div>
      {
        userAllFinal && userAllFinal.map((lel: any)=>(
            <div key={lel} className="border p-2 gap-4 flex flex-row items-center bg-emerald-300 shadow mb-2">
              <Image src={lel.profilImg} alt='Bird' className='bg-gray-200' width={70} height={70} />
              <div className="flex flex-col">
                <h1 className="">{lel._id}</h1>
              <Link href={`/networkprofile/${lel._id}`} className='text-xs font-light mb-1'>12 Connections</Link>
              <Link href={`/networkprofile/${lel._id}`} className="text-xs md:text-sm font-bold mb-2">{lel.username}</Link>
              <button onClick={()=> handelClick(lel._id)} className='border border-blue-500 rounded-lg text-white bg-blue-500 shadow'>Follow</button>
              </div>
            </div>
        ))
      }
    </div>
  )
}

export default NewConnection
