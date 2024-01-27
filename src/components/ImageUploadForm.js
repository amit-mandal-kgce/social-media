// components/ImageUploadForm.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import cloudinaryConfig from "../../cloudinary.config";

const ImageUploadForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "social-media-next");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
        formData
      );

      // Access the image URL from the Cloudinary response
      const imageUrl = res.data.secure_url;

      // Handle the rest of the form submission (e.g., send to server or display data)
      console.log("Name:", name);
      console.log("Image URL:", imageUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageUploadForm;
