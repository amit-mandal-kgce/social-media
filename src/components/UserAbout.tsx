import React, {useState} from 'react';
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import About from './About';
import Education from './Education';
import Projects from './Projects';
import Link from 'next/link';
import Langauge from './Langauge';
import Image from 'next/image';

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
  return (
    <div className='flex flex-col justify-center items-center'>
      {/* Abouts...... */}
      <div className="flex flex-row justify-between items-center w-full py-2">
        <h1 className='font-bold text-sm md:text-base'>About</h1>
        <button onClick={handelbutton} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><MdOutlineEdit/></button>
        <About isVisible={isBoxVisible} handelbutton={handelbutton} />
      </div>
        <h1 className='w-full p-2 text-xs md:text-sm mb-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, doloremque cumque. Repellendus aut eius voluptate incidunt praesentium optio dicta accusantium.</h1>
        {/* Educations..... */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Education</h1>
          <button onClick={handelbuttonEducation} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><IoMdAdd/></button>
          <Education isVisibleEdu={isVisiableEducation} handelbuttonEducation={handelbuttonEducation} />
        </div>
        {
          [1,2,3].map((ele)=>(
        <div key={ele} className="flex flex-row gap-3 mb-2 border-t-2">
          <Image src="/school.jpeg" alt="Bird" className='w-14' width={100} height={100} />
          <div className="">
            <h1 className="font-bold text-sm md:text-base">Kalyani government engineering college</h1>
            <h1 className="text-sm md:text-base">Bachelar of techonology: MAKAUt</h1>
            <h1 className="text-sm md:text-base">Aug 2018 - Jul 2021</h1>
            <h1 className="text-sm md:text-base">Skills: Engineering</h1>
          </div>
        </div>
          ))
        }
        {/* Projects..... */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Projects</h1>
          <button onClick={handelProj} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><IoMdAdd/></button>
          <Projects isProject={isVisiableProj} handelProj={handelProj} />
        </div>
        {
          [1,2,3,4].map((ke)=>(
            <div key={ke} className="flex flex-col p-2 mb-2 border-t-2 w-full">
              <h1 className="font-bold text-sm md:text-base">Agency</h1>
              <h1 className="text-sm md:text-base mb-2">Nov-2023 Present</h1>
              <div className="flex flex-row items-center gap-4">
              <Link href={'/'} className="text-sm md:text-base"><FaExternalLinkAlt/></Link>
              <h1 className="text-sm md:text-base">React Js</h1>
              </div>
            </div>
          ))
        }
        {/* Langauge.. */}
        <div className="flex flex-row justify-between items-center w-full py-2 border-t-2">
          <h1 className='font-bold text-sm md:text-base'>Langauge</h1>
          <button onClick={handelLangauge} className="bg-gray-300 text-white font-bold text-center text-lg rounded-full p-2 shadow"><IoMdAdd/></button>
          <Langauge isLangauge={isVisiableLang} handelLangauge={handelLangauge} />
        </div>
        <h1 className="text-sm md:text-base font-bold uppercase border-t-2 w-full py-3">English, hindi, Bengali</h1>
    </div>
  )
}

export default UserAbout;
