import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Education = () => {
  const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  const [educationSet, setEducaton] = useState({
    school: '',
    univercity: "",
    degree: '',
    fieldstudy: '',
    startdate: '',
    enddate: '',
  })

   const handelSubmitp = async (e: any)=>{
    e.preventDefault()
    try {
      const langData = {
      userId: id,
      school: educationSet.school,
      univercity: educationSet.univercity,
      degree: educationSet.degree,
      fieldstudy: educationSet.fieldstudy,
      startdate: educationSet.startdate,
      enddate: educationSet.enddate,
    };
      const response = await axios.post('/api/user/education', langData);
            console.log('signup okey', response.data)
            alert('Educations Add SuccessFully!')
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to Project Upgrade', error.message)
    }
  }
  return (
     <div className='flex flex-col p-2 bg-gray-100 shadow w-full'>
      <form className="flex flex-col" onSubmit={handelSubmitp}>
        <h1 className='text-sm mb-1'>School/College</h1>
        <input type="school" placeholder='Enter...' className='border px-2 outline-none mb-2' value={educationSet.school} onChange={(e)=> setEducaton({...educationSet, school: e.target.value})} />
        <h1 className='text-sm mb-1'>Univercity</h1>
        <input type="univercity" placeholder='Enter...' className='border px-2 outline-none mb-2' value={educationSet.univercity} onChange={(e)=> setEducaton({...educationSet, univercity: e.target.value})} />
        <h1 className='text-sm mb-1'>Degree</h1>
        <input type="degree" placeholder='Enter...' className='border px-2 outline-none mb-2' value={educationSet.degree} onChange={(e)=> setEducaton({...educationSet, degree: e.target.value})} />
        <h1 className='text-sm mb-1'>Field of study</h1>
        <input type="fieldstudy" placeholder='Enter...' className='border px-2 outline-none mb-2' value={educationSet.fieldstudy} onChange={(e)=> setEducaton({...educationSet, fieldstudy: e.target.value})} />
        <h1 className='text-sm mb-1'>Start Date</h1>
        <input type="startdate" placeholder='Enter...' className='border px-2 outline-none mb-2' value={educationSet.startdate} onChange={(e)=> setEducaton({...educationSet, startdate: e.target.value})} />
        <h1 className='text-sm mb-1'>End Date</h1>
        <input type="enddate" placeholder='Enter...' className='border px-2 outline-none mb-2' value={educationSet.enddate} onChange={(e)=> setEducaton({...educationSet, enddate: e.target.value})} />
        <div>
          <button type='submit' className='text-sm font-bold px-2 bg-blue-700 text-white'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Education;
