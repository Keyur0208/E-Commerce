"use client"
import React, { useState } from 'react';
// import axios from 'axios';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    fristname: '',
    middlename: '',
    lastname: '',
    email: '',
    home_no: '',
    soc: '',
    near: '',
    area: '',
    city: '',
    distric: '',
    pincode: '',
    country: '',
    stream: '',
    sem: '',
    course: '',
    password: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:3000/api/imageuplad" 
      , formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Upload Form</h2>
      <form onSubmit={handleSubmit}  className='p-5' >
        <input type="text" name="fristname" placeholder="First Name" onChange={handleInputChange} />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;