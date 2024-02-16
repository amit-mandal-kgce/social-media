import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {
    const [userDet, setUserDet] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handelSubmit = async (e: any)=>{
      e.preventDefault()
        try {
            const response = await axios.post('/api/user/register', userDet);
            console.log('signup okey', response.data)
            alert('Register Successfully!')
            window.location.reload();
        } catch (error: any) {
            console.log('Failed to sign up user', error.message)
        }
    }
  return (
    <div>
      <div className="flex flex-col items-center">
        <form onSubmit={(e)=>handelSubmit(e)}>
           <div className="mb-4" >
            <h1 className='text-sm md:text-base'>Username</h1>
             <input className='border text-sm p-2' placeholder='Enter...' name='username' type='text' value={userDet.username} onChange={(e)=> setUserDet({...userDet, username: e.target.value})} />
           </div>
           <div className="mb-4">
            <h1 className='text-sm md:text-base'>Email</h1>
             <input className='border text-sm p-2' placeholder='Enter...' name='email' type='email' value={userDet.email} onChange={(e)=> setUserDet({...userDet, email: e.target.value})} />
           </div>
           <div className="mb-4">
            <h1 className='text-sm md:text-base'>Password</h1>
             <input className='border text-sm p-2' placeholder='Enter...' name='password' type='password' value={userDet.password} onChange={(e)=> setUserDet({...userDet, password: e.target.value})} />
           </div>
           <button className='text-sx md:text-sm font-bold bg-blue-700 text-white px-4 py-1 uppercase' type='submit'>sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Register
