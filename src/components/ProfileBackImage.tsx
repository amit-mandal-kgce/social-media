import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cloudinaryConfig from '../../cloudinary.config'
import { RxCross2 } from 'react-icons/rx'


const ProfileBackImage = ({isVisible,handelBgImage}: any) => {
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
  const [imageBack, setImageBack] = useState(null);
 const handleImageChange = (e: any) => {
    setImageBack(e.target.files[0]);
  };

  const uploadImageBg = async (e: any) => {
  e.preventDefault();

  try {
    if (imageBack) {
      const formData = new FormData();
      formData.append("file", imageBack);
      formData.append("upload_preset", "social-media-next");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/imageBack/upload`,
        formData
      );
      const imageUrlBack = res.data.secure_url;

      console.log("Image URL:", imageUrlBack);
      return imageUrlBack;
    } else {
      console.error("No image selected");
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};
const handelSubmit = async (e: any)=>{
    e.preventDefault()
    try {
      const imageUrlBack = await uploadImageBg(e);
      const postData = {
      userId: id,
      backImage: imageUrlBack,
    };
      const response = await axios.post('/api/user/profilebackimage', postData);
            console.log('signup okey', response.data)
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to sign up user', error.message)
    }
}
  return (
    <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Add Background Image</h1>
        <button onClick={handelBgImage}><RxCross2/></button>
      </div>
      <form className="flex flex-col" onSubmit={handelSubmit}>
        <input type="file" className='mb-2' accept="image/*" onChange={handleImageChange}/>
        <button type='submit' className='text-sm font-bold px-3 mb-2 bg-blue-700 text-white'>Submit</button>
      </form>
    </div>
  )
}

export default ProfileBackImage
