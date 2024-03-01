"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHome, IoBagHandleSharp, IoNotifications  } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className='w-screen top-0 z-50 bg-pink-500 text-white fixed flex justify-between md:justify-center items-center gap-6 sm:gap-10 md:gap-14 p-2 shadow'>
      <Link href={'/'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl link ${pathname === '/' ? 'active' : ''}`}><span><IoHome/></span><span className='text-xs hidden md:block'>Home</span></Link>
      <Link href={'/network'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl link ${pathname === '/network' ? 'active' : ''}`}><span><FaUserFriends/></span><span className='text-xs hidden md:block'>My Network</span></Link>
      <Link href={'/jobs'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl link ${pathname === '/jobs' ? 'active' : ''}`}><span><IoBagHandleSharp/></span><span className='text-xs hidden md:block'>Jobs</span></Link>
      <Link href={'/messaging'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl link ${pathname === '/messaging' ? 'active' : ''}`}><span><BiSolidMessageRoundedDetail/></span><span className='text-xs hidden md:block'>Messaging</span></Link>
      <Link href={'/notification'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl link ${pathname === '/notification' ? 'active' : ''}`}><span><IoNotifications/></span><span className='text-xs hidden md:block'>Notifications</span></Link>
      <Link href={'/menu'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl link ${pathname === '/menu' ? 'active' : ''}`}><span><IoMdMenu/></span><span className='text-xs hidden md:block'>Menu</span></Link>
    </div>
  )
}

export default Navbar
