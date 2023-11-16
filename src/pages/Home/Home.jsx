import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from '../../Components/Sidebar/Sidebar';

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const data = useSelector(state=> state.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false)


  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])

  onAuthStateChanged(auth, (user) => {
    console.log(user, 'useeer')
    if(user.emailVerified){
      setVerify(true)
    }
  });
  
  return (
    <div>
      {
        verify ? 
         <div className='flex'>
          <div className='w-[186px]'>
            <Sidebar/>
          </div>
          <div className='w-[427px]'>adfgjhsdf</div>
          <div className='w-[344px]'>adfgjhsdf</div>
          <div className='w-[344px]'>adfgjhsdf</div>
         </div>
        :
        <div className='h-screen w-full bg-[#999999] flex justify-center items-center'>
          <div className='bg-white w-1/3 p-5 rounded-lg'>
            <h2 className='font-sans font-bold text-[#03014C] text-[33px]'>Please Verify Your Email</h2>
            <div>
            <button className='ml-[20px] bg-[#5ddf24] p-5 py-[10px] mt-[30px] rounded-lg'><p className='font-sans font-semibold text-[18px] text-white'><Link to= '/login'>Back to Login</Link></p></button>
            </div>
          </div>
       </div>
      }
    </div>
  )
}

export default Home