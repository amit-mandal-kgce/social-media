// components/ImageUploadForm.tsx
import { useState } from 'react';
import axios from 'axios';

const ImageUploadForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
      console.log('xxx')
    try {
      const formData = new FormData();
      formData.append('file', image as File);
      formData.append('upload_preset', 'socialmedia');
      console.log('Before Cloudinary API Request');
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dn2tlzn9b/image/upload',
        formData
      );

      console.log('Cloudinary API Response:', response);

      console.log('Image uploaded successfully:', response.data);
      const imageUrl = response.data.secure_url;
      console.log("Image URL:", imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={(e)=>handleFormSubmit(e)}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit" className='bg-red-500 p-2'>Upload Image</button>
    </form>
  );
};

export default ImageUploadForm;
