import React, {useEffect, useState} from 'react';
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import About from './About';
import Education from './Education';
import Projects from './Projects';
import Link from 'next/link';
import Langauge from './Langauge';
import Image from 'next/image';
import axios from 'axios';

const UserAbout = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const handelbutton = () =>{
    setIsBoxVisible(!isBoxVisible)
  }
  const [isVisiableEducation, setIsVisiableEducation] = useState(false);
  const handelbuttonEducation = () =>{
    setIsVisiableEducation(!isVisiableEducation)
  }
  const [isVisiableProj, setIsVisiableProj] = useState(false);
  const handelProj = () =>{
    setIsVisiableProj(!isVisiableProj)
  }
  const [isVisiableLang, setIsVisiableLang] = useState(false);
  const handelLangauge = () =>{
    setIsVisiableLang(!isVisiableLang)
  }
  // user Id..............
   const [userId, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])

  // User Api.....................
  const [userAbout, setUserAbout] = useState([]);
  const [useEducation, setUseEducation] = useState([]);
  const [useProject, setUseProject] = useState([]);
  const [useLangauge, setUseLangauge] = useState([]);
  useEffect(()=>{
    const fetchEducation = async ()=>{
      try {
        const resabout = await axios.get(`/api/userget/getabout/${userId}`);
        const reseducation = await axios.get(`/api/userget/geteducation/${userId}`);
        const resproject = await axios.get(`/api/userget/getproject/${userId}`);
        const reslangauge = await axios.get(`/api/userget/getlangauge/${userId}`);
        // console.log(response.data)
        if (!resabout || !reseducation || !resproject || !reslangauge) {
          throw new Error('Failed to fetch data');
        }
        setUserAbout(resabout.data.abouts)
        setUseEducation(reseducation.data.educations)
        setUseProject(resproject.data.projects)
        setUseLangauge(reslangauge.data.langauges)
      } catch (error) {
        console.log(error, 'Error')
      }
    }
    fetchEducation()
  }, [userId])
  // console.log(useProject, 'Abouts')
  return (
    <div className='flex flex-col justify-center items-center'>
      {/* Abouts...... */}
      <div className="flex flex-row justify-between items-center w-full py-2">
        <h1 className='font-bold text-sm md:text-base'>About</h1>
        <button onClick={handelbutton} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><MdOutlineEdit/></button>
      </div>
        {isBoxVisible ? <About/> : 
        <div>{userAbout.map((ev: any)=>(
        <div key={ev}>
          <h1 className='w-full p-2 text-xs md:text-sm mb-3'>{ev.about}</h1>
        </div>
        ))}
        </div>}
        
        {/* Educations..... */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Education</h1>
          <button onClick={handelbuttonEducation} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><IoMdAdd/></button>
        </div>
        {isVisiableEducation ? <Education/>:
        <div>
        {useEducation && useEducation.map((ele: any)=>(
        <div key={ele} className="flex flex-row gap-3 mb-2 border-t-2">
          <Image src="/school.jpeg" alt="Bird" className='w-14' width={100} height={100} />
          <div className="">
            <h1 className="font-bold text-sm md:text-base">{ele.school}</h1>
            <h1 className="text-sm md:text-base">{ele.univercity}</h1>
            <h1 className="text-sm md:text-base">{ele.degree}</h1>
            <h1 className="text-sm md:text-base">{ele.startdate} - {ele.enddate}</h1>
            <h1 className="text-sm md:text-base">{ele.fieldstudy}</h1>
          </div>
        </div>
          ))
        }
        </div>}
        {/* Projects..... */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Projects</h1>
          <button onClick={handelProj} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><IoMdAdd/></button>
        </div>
        {isVisiableProj ? <Projects/>:<div className='w-full'>
        {
         useProject && useProject.map((ke: any)=>(
            <div key={ke} className="flex flex-col p-2 mb-2 border-t-2 w-full">
              <h1 className="font-bold text-sm md:text-base">{ke.projeName}</h1>
              <h1 className="text-sm md:text-base mb-2">{ke.monthyear} Present</h1>
              <div className="flex flex-row items-center gap-4">
              <Link href={ke.linkes} className="text-sm md:text-base"><FaExternalLinkAlt/></Link>
              <h1 className="text-sm md:text-base">{ke.techonogy}</h1>
              </div>
            </div>
          ))
        }
        </div>}
        {/* Langauge.. */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Langauge</h1>
          <button onClick={handelLangauge} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><MdOutlineEdit/></button>
        </div>
        {isVisiableLang ? <Langauge/>: 
        <div>
          {useLangauge && useLangauge.map((evd: any)=>(
            <div key={evd}>
              <h1 className="text-sm md:text-base font-bold uppercase border-t-2 w-full py-3">{evd.langauge}</h1>
            </div>
          ))}
        </div>}
    </div>
  )
}

export default UserAbout;
