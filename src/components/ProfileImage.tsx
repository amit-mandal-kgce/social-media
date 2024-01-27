import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cloudinaryConfig from '../../cloudinary.config'
import { RxCross2 } from 'react-icons/rx'


const ProfileImage = ({isprofil,handelProfImage}: any) => {
    // UserId Pass...................
    const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  const [imageProfile, setImageProfile] = useState(null);
 const handleImageChange = (e: any) => {
    setImageProfile(e.target.files[0]);
  };

  const uploadImageProfil = async (e: any) => {
  e.preventDefault();

  try {
    if (imageProfile) {
      const formData = new FormData();
      formData.append("file", imageProfile);
      formData.append("upload_preset", "social-media-next");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/imageProfile/upload`,
        formData
      );
      const imageUrlProfile = res.data.secure_url;

      console.log("Image URL:", imageUrlProfile);
      return imageUrlProfile;
    } else {
      console.error("No image selected");
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
}
const handelSubmit = async (e: any)=>{
    e.preventDefault()
    try {
      const imageUrlProfile = await uploadImageProfil(e);
      const postData = {
      userId: id,
      profilImg: imageUrlProfile,
    };
      const response = await axios.post('/api/user/profileImage', postData);
            console.log('signup okey', response.data)
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to sign up user', error.message)
    }
}
  return (
    <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isprofil ? 'block' : 'none' }}>
      <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Add Profile Image</h1>
        <button onClick={handelProfImage}><RxCross2/></button>
      </div>
      <form className="flex flex-col" onSubmit={handelSubmit}>
        <input type="file" className='mb-2' accept="image/*" onChange={handleImageChange}/>
        <button type='submit' className='text-sm font-bold px-3 mb-2 bg-blue-700 text-white'>Submit</button>
      </form>
    </div>
  )
}

export default ProfileImage
