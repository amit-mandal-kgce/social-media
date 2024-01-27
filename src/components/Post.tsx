import React, {useState, useEffect} from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios';
import cloudinaryConfig from '../../cloudinary.config'

const Post = ({isPost,handelPost}: any) => {

  const [image, setImage] = useState(null);
 const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async (e: any) => {
  e.preventDefault();

  try {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "social-media-next");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
        formData
      );
      const imageUrl = res.data.secure_url;

      console.log("Image URL:", imageUrl);
      return imageUrl;
    } else {
      console.error("No image selected");
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};

  const [name, setName] = useState({describe:''});

  const handelSubmit = async (e: any)=>{
    e.preventDefault()
    try {
      const imageUrl = await uploadImage(e);
      const postData = {
      userId: id,
      postImage: imageUrl,
      describe: name.describe,
    };
      const response = await axios.post('/api/post/userpost', postData);
            console.log('signup okey', response.data)
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to sign up user', error.message)
    }
  }

  const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])
  return (
    <div className='flex flex-col p-2 absolute bg-gray-100 shadow' style={{ display: isPost ? 'block' : 'none' }}>
      <div className="flex flex-row justify-between items-center w-full mb-2">
        <h1 className="font-bold text-xs md:text-base">Add Posts</h1>
        <button onClick={handelPost}><RxCross2/></button>
      </div>
      <form className="flex flex-col" onSubmit={handelSubmit}>
        <textarea name="text" id="" cols={10} rows={5} className='mb-2' value={name.describe} onChange={(e)=>setName({...name, describe: e.target.value})}/>
        <input type="file" className='mb-2' accept="image/*" onChange={handleImageChange}/>
        <button type='submit' className='text-sm font-bold px-3 mb-2 bg-blue-700 text-white'>Submit</button>
      </form>
    </div>
  )
}

export default Post
