import React, { useState } from 'react'
import Login from '../../assets/Login.png'
import google from '../../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import {RiEyeFill, RiEyeCloseFill} from 'react-icons/ri'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

const Registration = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailerr, setEmailerr] = useState('')
    const [passworderr, setPassworderr] = useState('')

    const [showPassword, setShowPassword] = useState('false')
    const [error, setError] = useState('')

    const handleEmail = (e) =>{
        setEmail(e.target.value)
        setEmailerr('')
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value)
        setPassworderr('')
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
        if(!password){
            setPassworderr('Required your Password')
        }

        if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
               toast.success('Login Successfully');
               setError('');
               setTimeout(() => {
                navigate('/')
               },3000)
            })
            .catch((error) => {
                const errorCode = error.code;
                // console.log(errorCode);
                if(errorCode.includes('auth/invalid-login-credentials')){
                    setError('Please give your correct Email and Password');
                }
            });
        }

        
        // else if(!/^(?=.*[a-z])/.test(password)){
        //     setPassworderr('The string must contain at least 1 lowercase alphabetical character')
        // }else if(!/^(?=.*[A-Z])/.test(password)){
        //     setPassworderr('The string must contain at least 1 uppercase alphabetical character')
        // }else if(!/^(?=.*[0-9])/.test(password)){
        //     setPassworderr('The string must contain at least 1 numeric character')
        // }else if(!/^(?=.*[!@#$%^&*])/.test(password)){
        //     setPassworderr('The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict')
        // }else if(!/^(?=.{8,})/.test(password)){
        //     setPassworderr('The string must be eight characters or longer') 
        // }
    }

    const handelGoogleSignIn = () =>{
        signInWithPopup(auth, provider)
        .then(() => {
            toast.success('Login Done')
            setTimeout(() => {
                navigate('/')
               },3000)
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
        });
     }

  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end mr-[69px]'>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <div className='pt-[225px]'>
                <h2 className='font-sans font-bold text-[#03014C] text-[33px]'>Login to your account!</h2>
                <img onClick={handelGoogleSignIn} className='mt-[25px]' src={google} alt="" />
                <p className='font-nun font-bold text-red-500 text-[20px]'>{error}</p>
                <div className='relative mt-[40px]'>
                 <input onChange={handleEmail} value={email} className='w-96 border-b border-[#B8BACF] outline-none py-[26px]' type="email" />
                 <p className='absolute top-[-10px] font-nun font-semibold text-[#C5C6D9] text-[13px] tracking-[1px]'>Email Address</p>
                 <p className='font-nun font-semibold text-red-500'>{emailerr}</p>
                </div>
                <div className='relative mt-[40px]'>
                 <input onChange={handlePassword} value={password} className='w-96 border-b border-[#B8BACF] outline-none py-[26px]' type={showPassword ? 'password' : 'text'}/>
                 <p className='absolute top-[-10px] font-nun font-semibold text-[#C5C6D9] text-[13px]  tracking-[1px]'>Password</p>
                 {
                        showPassword ?
                        <RiEyeCloseFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-[32px] right-[25px]'/>
                        :
                        <RiEyeFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-[32px] right-[25px]'/>

                    }
                    <p className='font-nun font-semibold text-red-500'>{passworderr}</p>
                </div>
                <p className='font-sans font-bold cursor-pointer text-[16px] text-[#EA6C00] mt-[30px]'><Link to='/forgotPassword'>Forgot Password</Link></p>
                <div onClick={handleSubmit}>
                    <button className='bg-primary w-96 py-[20px] mt-[30px] rounded-md'><p className='font-sans font-semibold text-[28px] text-white' href="">Login to Continue</p></button>
                </div>
                <div className='w-96 mt-[35px]'>
                    <p className='font-sans font-regular text-[13px] text-[#03014C]'>Don’t have an account ?      <span className='font-sans font-bold text-[13px] text-[#EA6C00]' href=""><Link to='/registration'>Sign Up</Link></span></p>

                </div>
            </div>
        </div>
        <div className='w-1/2'>
            <img className='h-screen w-full object-cover' src={Login} alt="" />
        </div>
    </div>
  )
}

export default Registration