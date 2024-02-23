import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
interface NetworkMoreProps {
  id: string;
}
const NetworkMore: React.FC<NetworkMoreProps> = ({ id }) => {
    // Profile Api..............................
  const [userPost, setUserPost] = useState([])
  const [profilImg, setProfilImg] = useState([]);
  const [dataBackground, setDataBackground] = useState([])
  useEffect(()=>{
    const fetchProfil = async ()=>{
      try {
        const resposts = await axios.get(`/api/post/usergetpost/${id}`);
        const resprofil = await axios.get(`/api/userget/getprofileImage/${id}`)
        const resbackground = await axios.get(`/api/userget/getprofilebackimage/${id}`);
        // console.log(response.data)
        if (!resposts || !resprofil || !resbackground) {
          throw new Error('Failed to fetch data');
        }
        setUserPost(resposts.data.postes)
        setProfilImg(resprofil.data.profileimgs)
        setDataBackground(resbackground.data.backimgs)
      } catch (error) {
        console.log(error, 'Error')
      }
    }
    fetchProfil()
  }, [id])
  return (
    <div className='flex flex-wrap gap-3 p-2'>
      {
        userPost && userPost.map((exc: any)=>(
          <div key={exc} className="">
            <Image src={exc.imgposty} alt='Bird' className='bg-gray-200' width={70} height={70} />
          </div>
        ))
      }
      {
        profilImg && profilImg.map((excv: any)=>(
          <div key={excv} className="">
            <Image src={excv.profilImg} alt='Bird' className='bg-gray-200' width={70} height={70} />
          </div>
        ))
      }
      {
        dataBackground && dataBackground.map((excvr: any)=>(
          <div key={excvr} className="">
            <Image src={excvr.backImage} alt='Bird' className='bg-gray-200' width={70} height={70} />
          </div>
        ))
      }
    </div>
  )
}

export default NetworkMore
