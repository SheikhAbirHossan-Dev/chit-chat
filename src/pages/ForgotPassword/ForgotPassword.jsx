import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [emailerr, setEmailerr] = useState('')

    
    const handleEmail = (e) =>{
        setEmail(e.target.value)
        setEmailerr('')
    }

    const handleSubmit = () =>{
        console.log('ok cool');
        if(!email){
            setEmailerr('Required your Email')
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
                setEmailerr('Invalid your Email')
            }
        }

        if(email &&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('okk')
                setEmail('')
                // toast.success('Check Your Email');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
            });
        
        }

    }
  return (
    <div className='h-screen w-full bg-[#999999] flex justify-center items-center'>
        <div className='bg-white w-1/3 p-5 rounded-lg'>
        <h2 className='font-sans font-bold text-[#03014C] text-[33px]'>Forgot Password</h2>
                <div className='relative mt-[40px]'>
                    <input onChange={handleEmail} value={email} className='w-96 border border-[#B8BACF] rounded-lg outline-none py-[26px] px-[52px]' type="email" />
                    <p className='absolute top-[-10px] left-[34px] px-[18px] font-nun font-semibold text-[#C5C6D9] text-[13px] tracking-[1px] bg-white'>Email Address</p>
                    <p className='font-nun font-semibold text-red-500'>{emailerr}</p>
                </div>
                <div>
                <button onClick={handleSubmit} className='bg-[#f44336] p-5 py-[10px] mt-[30px] rounded-lg'><p className='font-sans font-semibold text-[18px] text-white' href="">Reset Button</p></button>
                <button className='ml-[20px] bg-[#5ddf24] p-5 py-[10px] mt-[30px] rounded-lg'><p className='font-sans font-semibold text-[18px] text-white' href=""><Link to='/login'>Back to Login</Link></p></button>
                </div>
        </div>
    </div>
  )
}

export default ForgotPassword