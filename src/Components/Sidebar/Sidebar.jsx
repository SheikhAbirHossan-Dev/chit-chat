import React from 'react'
import profile from '../../assets/profile.png'
import { AiOutlineHome, AiFillMessage} from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { IoLogOutSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className='bg-primary h-screen rounded-2xl pt-[40px]'>
      <img src={profile} alt="" className='mx-auto' />
      <div className='relative mt-[78px] py-[20px] after:absolute after:content-[""] after:top-0 after:left-[25px] after:bg-white after:w-full after:h-full after:z-[-1] z-[1] after:rounded-l-lg overflow-hidden before:absolute before:content-[""] before:top-0 before:right-0 before:w-[8px] before:h-full before:bg-primary before:rounded-l-lg'>
        <AiOutlineHome className='text-6xl mx-auto text-primary font-bold'/>
      </div>
      <div className='mt-[78px]'>
        <AiFillMessage className='text-6xl mx-auto text-[#BAD1FF] font-bold'/>
      </div>
      <div className='mt-[78px]'>
        <MdNotificationsNone className='text-6xl mx-auto text-white'/>
      </div>
      <div className='mt-[78px]'>
        <FiSettings className='text-6xl mx-auto text-white'/>
      </div>
      <div className='mt-[100px]'>
        <IoLogOutSharp className='text-6xl mx-auto text-white'/>
      </div>
    </div>
  )
}

export default Sidebar