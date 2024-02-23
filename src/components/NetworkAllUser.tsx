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
            <div key={lel} className="border p-2 bg-teal-200 shadow mb-2">
              <div className="gap-4 flex mb-3 flex-row items-center">
              <div className="w-12 h-12 overflow-hidden rounded-full">
                <Image src={lel.profilImg} alt='Bird' className='bg-gray-200' width={100} height={100} />
              </div>
              <div className="flex flex-col">
              <Link href={`/networkprofile/${lel._id}`} className="text-xs md:text-sm font-bold">{lel.username}</Link>
              <Link href={`/networkprofile/${lel._id}`} className="text-xs md:text-sm font-light">{lel.email}</Link>
              </div>
              </div>
              <div>
                <button onClick={()=> handelClick(lel._id)} className='w-full py-2 bg-blue-500 text-white text-xs rounded-md shadow mt-2 font-bold'>Follow</button>
              </div>
            </div>
        ))
      }
    </div>
  )
}

export default NewConnection
