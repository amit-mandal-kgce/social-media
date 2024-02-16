import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Projects = () => {
  const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  const [projectSet, setProject] = useState({
    projeName: '',
    monthyear: "",
    linkes: '',
    techonogy: ''
  })

   const handelSubmitp = async (e: any)=>{
    e.preventDefault()
    try {
      const langData = {
      userId: id,
      projeName: projectSet.projeName,
      monthyear: projectSet.monthyear,
      linkes: projectSet.linkes,
      techonogy: projectSet.techonogy,
    };
      const response = await axios.post('/api/user/project', langData);
            console.log('signup okey', response.data)
            alert('Project Add SuccessFully!')
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to Project Upgrade', error.message)
    }
  }
  return (
    <div className='flex flex-col p-2 w-full bg-gray-100 shadow'>
      <form className="flex flex-col" onSubmit={handelSubmitp}>
        <h1 className='text-sm mb-1'>Name</h1>
        <input type="school" placeholder='Enter...' className='border px-2 outline-none mb-2' value={projectSet.projeName} onChange={(e)=> setProject({...projectSet, projeName: e.target.value})} />
        <h1 className='text-sm mb-1'>Month-Year</h1>
        <input type="degree" placeholder='Enter...' className='border px-2 outline-none mb-2' value={projectSet.monthyear} onChange={(e)=> setProject({...projectSet, monthyear: e.target.value})} />
        <h1 className='text-sm mb-1'>Links</h1>
        <input type="fieldstudy" placeholder='Enter...' className='border px-2 outline-none mb-2' value={projectSet.linkes} onChange={(e)=> setProject({...projectSet, linkes: e.target.value})} />
        <h1 className='text-sm mb-1'>Uses techonology</h1>
        <input type="startdate" placeholder='Enter...' className='border px-2 outline-none mb-2' value={projectSet.techonogy} onChange={(e)=> setProject({...projectSet, techonogy: e.target.value})} />
        <div>
          <button type='submit' className='text-sm font-bold px-2 bg-blue-700 text-white'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Projects
