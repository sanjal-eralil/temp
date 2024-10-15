import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { Logout } from '../redux/AuthSlice'
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Home() {
  
  const email='t2@gmail.com';  // State for email
  const [file, setFile] = useState(null);  // State for file
    // Correctly calling useNavigate at the top level
    const navigate=useNavigate()
    const disptach=useDispatch()
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
    //alert("in") ;// Get the file from input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Corrected to include parentheses
    //alert("handleSubmit called");  

    // Ensure both email and file are provided
    if (!email || !file) {
      toast.error("Please provide an email and a file.");
      //alert("no email");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
      //alert("in");
      // Use axios to send a POST request with the form data
      const response = await axios.post('http://localhost:4001/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Important for file uploads
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        //alert("completed");
        navigate('/api/auth');  // Navigate to the home page after success
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      
      toast.error("Error uploading file. Please try again.");
    }
  }

  const user=useSelector((state)=>state.Auth.user)
  console.log(user)
  
  const gotoAdmin=()=>{
        navigate('/admin')
  }
  const handleLogout=async()=>{
    try {
      const request= await post('/api/auth/logout')
       const resspone= request.data
       if (request.status==200) {
           disptach(Logout())
          navigate('/login')
       }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>

     <div className='home-container'>
      <div className='user-card'>
        <h2> Welcome,{user && user.name}</h2>
       
        {user && user.role=='user' ? <div>
         <form action="" onSubmit={handleSubmit}>
               <div className='input-group'>
                <label htmlFor="username">Upload File</label>
                <input type="file"
                onChange={handleFileChange} name="" id="file" />
               </div> 
               <button style={{backgroundColor:'blue'}} type='submit'>Upload</button>
               </form> </div>:null}

       



        {user && user.role=='admin' ? <button className='admin-btn' onClick={gotoAdmin}>Go To admin</button> :''}
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </div>
     </div>



    </>
  )
}
