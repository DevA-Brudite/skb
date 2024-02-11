import React, { useState } from 'react';
import Axios from 'axios';
import InputField from './InputField';
import CustomBtn from './CustomBtn';
import { useEffect } from "react";
import profileimage from './images/profileimage.png';
import { useNavigate } from "react-router-dom";


const AssignBadge = () => {
    const navigate =useNavigate();
  const [formData, setFormData] = useState({
    badge_id: "",
    recipient:"",

    
  });

  const {  badge_id, recipient} = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${localStorage.getItem("token")}`
      },
    };
    const response = await Axios.post(
      "http://127.0.0.1:8000/api/org/badge-assign/",
      formData,
      config
    );
    console.log(response.data);
  };
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8000/api/recipient/alluser/",
          {
            headers: {
              Authorization: `token ${localStorage.getItem('token')}`, // Replace with your authentication token
            },
          }
        );

        setUserData(response.data.data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
     <div className="contain flex m-auto   w-full h-full justify-center max-lg:flex-wrap">
     <div
        className="leftrectangle w-1/2 h-full text-gray-300 bg-[#161616]  m-1 rounded-md shadow-slate-600 max-lg:w-full"
        data-aos="slide-right"
      >
        <div className="profileimage w-2/5 mt-10 rounded-full  bg-slate-300 max-lg:w-3/4 m-auto">
          <img className= "rounded-full " src={profileimage}  />
        </div>
        <div className="info text-center p-1 m-2">
          <div className="name mt-2 tracking-wider font-semibold">
            {userData.username}
            {/* <p>bhupendra</p> */}
          </div>
         
          <div className="contact mt-2 tracking-wider font-semibold">
            {userData.contact_info}
            {/* <p>+912302333290</p> */}
          </div>
          <div className="username mt-2 tracking-wider font-semibold">
            {userData.name}
            {/* <p>bhupendra vaishnav</p> */}
          </div>
          
          <div className="email  mt-2 tracking-wider font-semibold">
            {userData.email}
            {/* <p>bhupendravaishnav9@gmail.com</p> */}
          </div>
         
        </div>

        <div className="line h-1 m-1 bg-gray-600"></div>
        <div className="options my-2 ">
          <div className="manag uppercase flex justify-center mt-2 tracking-wider font-semibold text-xl">
            Manage Badge
          </div>
          <div className="firstoption flex justify-center p-4 w-full hover:bg-sky-700 " onClick={()=> navigate('/orgdash')}>
         <div className="icon mx-5">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<rect width="24" height="24" fill="None"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7ZM8 13C6.67392 13 5.40215 13.5268 4.46447 14.4645C3.52678 15.4021 3 16.6739 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 16.6739 20.4732 15.4021 19.5355 14.4645C18.5979 13.5268 17.3261 13 16 13H8Z" fill="#F5EBEB"/>
</svg>
         </div>
         <div className="text ">
           User Profile
         </div>
       </div>
      
       </div>
       <div className="logout flex justify-center mx-28">
            <button
              className="logoutbtn bg-teal-600 w-full  px-1 py-1 text-xl font-semibold tracking-wider rounded-md uppercase m-10 hover:bg-blue-400"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
          

          
         
        </div>
       
        <div className="rightrectangle w-full m-1  flex rounded-md max-lg:w-1/2"  >
      <div className="bg-[#121212] flex items-center justify-center h-screen">
        <div className="bg-[#161616] p-8 rounded shadow-md w-3/4 lg:w-2/4">
          <h2 className="text-xl font-medium text-white text-center mb-4 font-roboto tracking-wider">
            Badge Assignment
          </h2>
          <form onSubmit={onSubmitHandler} className="flex space-x-4 flex-wrap justify-center " enctype="multipart/form-data">

            <div class="mb-4 w-60 ">
              <InputField
                value={badge_id}
                onChange={onChangeInput}
                label="Badge ID"
                type="number"
                id="  badge_id"
                placeholder="Enter Badge ID"
                name="badge_id"
              />
            </div>
            <div class="mb-4 w-60 ">
              <InputField
                value={recipient}
                onChange={onChangeInput}
                label="Recipient ID "
                type="number"
                id="recipient"
                placeholder="Enter Recipient ID"
                name="recipient"
              />
            </div>
          <div className='mb-4 w-60 flex justify-center'>
              <CustomBtn type="submit" label="Submit" />
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default AssignBadge;
