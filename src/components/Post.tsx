import React, {useState, useEffect} from 'react'
import axios from 'axios';
import cloudinaryConfig from '../../cloudinary.config'

const Post = () => {
  const [id, setId] = useState('')
  useEffect(()=>{
    const getUserDetails = async ()=>{
      const res = await axios.get('/api/user/me');
      console.log(res.data);
      setId(res.data.data._id);
    }
    getUserDetails();
  }, [])

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
      formData.append("upload_preset", "socialpost");

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
  const [comment, setComment] = useState({describe:''});
  const handelSubmit = async (e: any)=>{
    e.preventDefault()
    try {
      const imageUrl = await uploadImage(e);
      const postData = {
      userId: id,
      imgposty: imageUrl,
      description: comment.describe,
    };
      const response = await axios.post('/api/post/userpost', postData);
            console.log('signup okey', response.data)
            alert("Post Upladed! Soccessfully!")
            window.location.reload();
    } catch (error: any) {
      console.log('Failed to sign up user', error.message)
    }
  }

  return (
    <div className='flex flex-col p-2 w-full bg-gray-100 shadow'>
      <form className="flex flex-col" onSubmit={handelSubmit}>
        <textarea name="describe" cols={5} rows={2} className='mb-2' value={comment.describe} onChange={(e)=>setComment({...comment, describe: e.target.value})}/>
        <input type="file" className='mb-2' accept="image/*" onChange={handleImageChange}/>
        <div>
        <button type='submit' className='text-sm font-bold px-3 rounded mb-2 bg-blue-700 text-white'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Post
