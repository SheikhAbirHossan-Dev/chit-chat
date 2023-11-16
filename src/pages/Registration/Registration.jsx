import React, { useState } from 'react'
import Register from '../../assets/Register.png'
import {RiEyeFill, RiEyeCloseFill} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

const Registration = () => {
    const auth = getAuth();
    // const navigete = useNavigate()
    
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

    const [emailerr, setEmailerr] = useState('')
    const [fullnameerr, setFullNameerr] = useState('')
    const [passworderr, setPassworderr] = useState('')

    const [showPassword, setShowPassword] = useState('false')
    const [ success, setSuccess] = useState('')

    const handleEmail = (e) =>{
        setEmail(e.target.value)
        setEmailerr('')
    }
    const handleFullName = (e) =>{
        setFullName(e.target.value)
        setFullNameerr('')
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

        if(!fullName){
            setFullNameerr('Required your Full Name')
        }
        if(!password){
            setPassworderr('Required your Password')
        }

        if(email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){

            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    toast.success('Registration Done & verify your Email');
                    setEmail('');
                    setFullName('');
                    setPassword('');
                });
               
                // navigete('/login');
            })
            .catch((error) => {
                const errorCode = error.code;
                if(errorCode.includes('auth/email-already-in-use')){
                    setEmailerr('This Email is already Exist');
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
                <h2 className='font-nun font-bold text-[#11175D] text-[34px]'>Get started with easily register</h2>
                <p className='font-nun font-regular text-[#7F7F7F] text-[20px]'>Free register <samp className='font-nun font-regular text-[#CFCFCF] text-[20px]'>and</samp> you can enjoy it</p>
                <div className='relative mt-[40px]'>
                    <input onChange={handleEmail} value={email} className='w-96 border border-[#B8BACF] rounded-lg outline-none py-[26px] px-[52px]' type="email" />
                    <p className='absolute top-[-10px] left-[34px] px-[18px] font-nun font-semibold text-[#C5C6D9] text-[13px] tracking-[1px] bg-white'>Email Address</p>
                    <p className='font-nun font-semibold text-red-500'>{emailerr}</p>
                </div>
                <div className='relative mt-[40px]'>
                    <input onChange={handleFullName} value={fullName} className='w-96 border border-[#B8BACF] rounded-lg outline-none py-[26px] px-[52px]' type="text" />
                    <p className='absolute top-[-10px] left-[34px] px-[18px] font-nun font-semibold text-[#C5C6D9] text-[13px] tracking-[1px] bg-white'>Full name</p>
                    <p className='font-nun font-semibold text-red-500'>{fullnameerr}</p>
                </div>
                <div className='relative mt-[40px]'>
                    <input onChange={handlePassword} value={password} className='w-96 border border-[#B8BACF] rounded-lg outline-none py-[26px] px-[52px]' type={showPassword ? 'password' : 'text'} />
                    <p className='absolute top-[-10px] left-[34px] px-[18px] font-nun font-semibold text-[#C5C6D9] text-[13px] tracking-[1px] bg-white'>Password</p>
                    {
                        showPassword ?
                        <RiEyeCloseFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-[32px] right-[133px]'/>
                        :
                        <RiEyeFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-[32px] right-[133px]'/>

                    }
                    <p className='font-nun font-semibold text-red-500'>{passworderr}</p>
                </div>
                <div onClick={handleSubmit}>
                    <button className='bg-primary w-96 py-[20px] mt-[50px] rounded-full cursor-pointer font-nun font-semibold text-[20px] text-white'>Sign up</button>
                </div>
                <div className='w-96 text-center mt-[35px]'>
                    <p className='font-sans font-regular text-[13px] text-[#03014C]'>Already  have an account ? <span className='font-sans font-bold text-[13px] text-[#EA6C00]' href=""><Link to='/login'>Sign In</Link></span></p>
                </div>
            </div>
        </div>
        <div className='w-1/2'>
            <img className='h-screen w-full object-cover' src={Register} alt="" />
        </div>
    </div>
  )
}

export default Registration