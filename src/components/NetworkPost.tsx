import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {FaHeart, FaRegCommentAlt, FaRegHeart} from 'react-icons/fa'
import axios from 'axios';

interface NetworkPostProps {
  id: string;
}
interface ProfileTypes {
  _id:string;
  userId:string;
  profilImg:string;
}
interface PostesTypes {
  _id:string;
  userId:string;
  imgposty:string;
  description:string;
}
const NetworkPost: React.FC<NetworkPostProps> = ({ id }) =>{
  const [userall, setUserall] = useState([]);
  const [userprofiles, setUserprofiles] = useState<ProfileTypes[]>([]);
  const [userpostes, setUserpostes] = useState<PostesTypes[]>([]);


  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const resuser = await axios.get(`/api/home/user/${id}`);
        const resprofile = await axios.get(`/api/home/profilget`);
        const respostes = await axios.get(`/api/home/postesget/${id}`);
        if(!resuser || !resprofile || !respostes){
          console.log("Data Fetch Faild");
        }
        setUserall(resuser.data.users)
        setUserprofiles(resprofile.data.profileimages);
        setUserpostes(respostes.data.postes);

      } catch (error) {
        console.log(error, "Error")
      }
    }
    fetchUser()
  }, [id])
  const userAllFinal = userall.map((ele: any)=>{
    const userId = ele._id;
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    return {...ele,...userProfilesData,_id:ele._id}
  })
   const userPostesDet = userpostes.map((exc: any)=>{
    const userId = exc.userId;
    const userDet = userall.find((ed: any)=>(ed._id === userId)) || {};
    const userProfilesData =userprofiles.find((ele)=>(ele.userId === userId)) || {};
    return {...exc,...userProfilesData,...userDet, _id:exc._id}
  })
  
  return (
    <div>
     {userAllFinal && userAllFinal.map((ex)=>( 
     <div key={ex} className="flex flex-row justify-between border-b-4 p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <div className="flex flex-row gap-4 object-cover">
        <Image src={ex.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full object-cover bg-gray-200' />
        <h1 className="font-bold text-sm sm:text-base">{ex.username}</h1>
        </div>
      </div>))}
      {
        userPostesDet && userPostesDet.map((ele)=>(
      <div key={ele} className="">
      <div className="bg-gray-100 my-2 border shadow p-2 w-[300px] sm:w-[400px] md:w-[500px]">
        <div className=" flex flex-row items-center gap-4 mb-3 py-2 border-b-2">
          <Image src={ele.profilImg} alt="Bird" width={100} height={100} className='w-[30px] h-[30px] rounded-full' />
          <h1 className="font-bold text-sm md:text-base">{ele.username}</h1>
        </div>
        <div className="text-xs md:text-sm mb-3">{ele.description}</div>
        <div className="flex w-full justify-center">
          <Image src={ele.imgposty} alt="Bird" width={1000} height={1000} className='w-[90%] h-[400px]' />
        </div>
        <h1 className="flex flex-row items-center gap-2 p-2"><FaHeart className="text-red-600 md:text-xl"/><span className="text-xs md:text-base">123</span></h1>
        <div className="flex flex-row justify-around border-t-2 py-2">
          <button className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegHeart /></span>Like</button>
          <Link href={`/comment/${ele._id}`} className="text-sm md:text-base flex flex-row items-center gap-2"><span className="md:text-xl"><FaRegCommentAlt  /></span>Comment</Link>
        </div>
      </div>
      </div>
        ))
      }
    </div>
  )
}

export default NetworkPost
