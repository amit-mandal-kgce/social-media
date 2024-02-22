import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {FaExternalLinkAlt} from 'react-icons/fa'
import axios from 'axios';

interface NetworkAboutProps {
  userId: string;
}
const NetworkAbout: React.FC<NetworkAboutProps> = ({ userId }) => {
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
  console.log(useEducation, 'Abouts')
  return (
    <div className='flex flex-col justify-center items-center'>
      {/* Abouts...... */}
      <div className="flex flex-row justify-between items-center w-full py-2">
        <h1 className='font-bold text-sm md:text-base'>About</h1>
      </div>
      {
        userAbout && userAbout.map((el: any)=>(
          <h1 key={el} className='w-full p-2 text-xs md:text-sm mb-3'>{el.about}</h1>
        ))
      }
        {/* Educations..... */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Education</h1>
        </div>
        <div>
        {
          useEducation && useEducation.map((ele: any)=>(
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
        </div>
        {/* Projects..... */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Projects</h1>
        </div>
        <div className='w-full'>
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
        </div>
        {/* Langauge.. */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Langauge</h1>
        </div>
        {
          useLangauge && useLangauge.map((ex: any)=> (
            <h1 key={ex} className="text-sm md:text-base font-bold uppercase border-t-2 w-full py-3">{ex.langauge}</h1>
          ))
        }
    </div>
  )
}

export default NetworkAbout
