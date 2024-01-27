import Link from 'next/link';
import { IoHome, IoBagHandleSharp, IoNotifications  } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='w-screen top-0 bg-white fixed flex justify-center items-center gap-6 sm:gap-10 md:gap-14 p-2 shadow'>
      <Link href={'/home'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoHome/></span><span className='text-xs hidden md:block'>Home</span></Link>
      <Link href={'/network'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><FaUserFriends/></span><span className='text-xs hidden md:block'>My Network</span></Link>
      <Link href={'/jobs'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoBagHandleSharp/></span><span className='text-xs hidden md:block'>Jobs</span></Link>
      <Link href={'/message'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><BiSolidMessageRoundedDetail/></span><span className='text-xs hidden md:block'>Messaging</span></Link>
      <Link href={'/notification'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoNotifications/></span><span className='text-xs hidden md:block'>Notifications</span></Link>
      <Link href={'/menu'} className={`flex flex-col items-center text-xl sm:text-1xl md:text-2xl`}><span><IoMdMenu/></span><span className='text-xs hidden md:block'>Menu</span></Link>
    </div>
  )
}

export default Navbar
