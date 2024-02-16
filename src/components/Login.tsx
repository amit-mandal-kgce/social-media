import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Login = () => {
    const router = useRouter();
    const [userDet, setUserDet] = useState({
        email: '',
        password: ''
    })

    // login.........................
    const handelSubmit = async (e: any) => {
      e.preventDefault();
        try {
            const response = await axios.post('/api/user/login', userDet)
            const user = response.data;
            console.log('Login Successfully', user.message);
              router.push('/');
        } catch (error: any) {
            console.log('Login Failed', error.message)
        }
    }
  return (
    <div>
      <div className="flex flex-col items-center">
        <form onSubmit={(e)=>handelSubmit(e)}>
           <div className="mb-4">
            <h1 className='text-sm md:text-base'>Email</h1>
             <input className='border text-sm p-2' placeholder='Enter...' name='email' type='email' value={userDet.email} onChange={(e)=> setUserDet({...userDet, email: e.target.value})} />
           </div>
           <div className="mb-4">
            <h1 className='text-sm md:text-base'>Password</h1>
             <input className='border text-sm p-2' placeholder='Enter...' name='password' type='password' value={userDet.password} onChange={(e)=> setUserDet({...userDet, password: e.target.value})} />
           </div>
           <button className='text-sx md:text-sm font-bold bg-blue-700 text-white px-4 py-1 uppercase' type='submit'>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Login
