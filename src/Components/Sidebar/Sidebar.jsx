import React, { useState, createRef } from 'react'
import profile from '../../assets/profile.png'
import { AiOutlineHome, AiFillMessage } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { ImUpload } from "react-icons/im";
import { FiSettings } from "react-icons/fi";
import { IoLogOutSharp } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
//img cropping
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const Sidebar = () => {
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const [profilephoto, setProfilePhoto] = useState('')
  // cropping

  const [profileModal, setProfileModal] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('doneeeeee')
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }).catch((error) => {
      console.log(error.codde)
    });
  }

  const handelProfileModal = () => {
    setProfileModal(true)
  }

  // img crop
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, 'some-child');
      const message4 = (cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          // setProfilePhoto(downloadURL);
          console.log(downloadURL, 'downloadURL')
        });
      });
    }
  };

  return (
    <>
      {profileModal

        ?
        <div className='w-full h-screen bg-slate-300 absolute flex justify-center items-center'>
          <div className='w-[600px] p-[20px] bg-white rounded-3xl text-center'>
            <h2 className='text-3xl font-bold font-nun mt-5'>Upload Your Profile Pictures</h2>
            <input onChange={onChange} type="file" className=' mt-5 block mx-auto mb-5' />
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden mx-auto mb-4'>
              <div
                className="img-preview"
                style={{ width: "100%", float: "left", height: "300px" }}
              />
            </div>
            <div className='w-[400px] h-[400px] overflow-hidden mb-5'>
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            </div>
            <button onClick={getCropData} className=' bg-green-500 p-[15px] text-white text-xl rounded-xl font-nun font-semibold'>Upload</button>
            <button onClick={() => setProfileModal(false)} className=' bg-red-500 p-[15px] text-white text-xl rounded-xl font-nun font-semibold ml-20'>Cancel</button>
          </div>
        </div>
        :
        <div className='bg-primary h-screen rounded-2xl pt-[40px]'>
          <div className='w-[96px] h-[96px] mx-auto rounded-full relative overflow-hidden group'>
            <img src={profilephoto} alt="" className='w-full h-full' />

            <div onClick={handelProfileModal} className=' w-0 h-full absolute top-0 left-0 group-hover:w-full bg-[rgb(0,0,0,.4)] flex justify-center items-center'>
              <ImUpload className='text-white text-2xl' />

            </div>
          </div>
          <div className='relative mt-[78px] py-[20px] after:absolute after:content-[""] after:top-0 after:left-[25px] after:bg-white after:w-full after:h-full after:z-[-1] z-[1] after:rounded-l-lg overflow-hidden before:absolute before:content-[""] before:top-0 before:right-0 before:w-[8px] before:h-full before:bg-primary before:rounded-l-lg'>
            <AiOutlineHome className='text-6xl mx-auto text-primary font-bold' />
          </div>
          <div className='mt-[78px]'>
            <AiFillMessage className='text-6xl mx-auto text-[#BAD1FF] font-bold' />
          </div>
          <div className='mt-[78px]'>
            <MdNotificationsNone className='text-6xl mx-auto text-white' />
          </div>
          <div className='mt-[78px]'>
            <FiSettings className='text-6xl mx-auto text-white' />
          </div>
          <div className='mt-[100px]'>
            <IoLogOutSharp onClick={handleSignOut} className='text-6xl mx-auto text-white' />
          </div>
        </div>
      }

    </>

  )
}

export default Sidebar