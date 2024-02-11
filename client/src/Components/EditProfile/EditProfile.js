
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
// import './EditProfile.css';
import { useNavigate } from 'react-router-dom';
import profileimage from './images/profileimage.png'


const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    contact_info: '',
    email: '',
    organisation:'',
    organisation_domain:'',
  });

  const onChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePatchAPI = async () => {
    try {
      const response = await Axios.patch(
        "http://127.0.0.1:8000/api/recipient/update-user/",
        {
          name: userData.name,
          contact_info: userData.contact_info,
          organisation:userData.organisation,
          organisation_domain:userData.organisation_domain,
        },
        {
          headers: {
            Authorization: `token ${localStorage.getItem('token')}`, 
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      
      navigate('/user'); 
    } catch (error) {
      console.error('Error updating user profile:', error);
   
    }
  };

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

        setUserData({
          name: response.data.data.name,
          contact_info: response.data.data.contact_info,
          username: response.data.data.username,
          email: response.data.data.email,
          organisation:response.data.data.organisation,
          organisation_domain:response.data.data.organisation_domain,
          

        });
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts
 
  

  return (
    <>
   <div className="contain flex m-auto   w-full h-full justify-center max-lg:flex-wrap">
    
  
     <div className="leftrectangle  text-gray-300 bg-[#161616] w-1/4 m-1 rounded-md shadow-slate-600 max-lg:w-4/5" data-aos="slide-right" >
      <div className="profileimage w-2/5 mt-10 rounded-full  bg-slate-300 max-lg:w-3/4 m-auto">
        <img className= "rounded-full" src={profileimage} alt="image"/>
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
     
        
       <div className="line h-1 m-1 bg-gray-600">
        
       </div>
       <div className="options my-10 ">

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

    <div className="rightrectangle w-3/4  m-1  flex rounded-md max-lg:w-4/5"  >
        

      <form className = "form1  bg-[#161616]  w-full p-10 h-full rounded-md text-white max-lg:w-full max-lg:p-3" onSubmit={(e) => { e.preventDefault(); handlePatchAPI(); }}>
        
        <div className="ff flex-col w-full h-3/4 bg-[#121212] p-10 rounded-md justify-between max-lg:flex-col max-lg:p-3">
          <div className="left1 w-full flex-col p-1 mx-1 py-10 text-white max-lg:w-full">
            {/* <label className= "name -mx-4"htmlFor="name2">Name</label> */}
            <input className='name  border-b-2 w-1/2 mx-1   focus:outline-none bg-transparent'
              onChange={onChangeInput}
              value={userData.name}
              type="text"
              placeholder="Enter Name"
              name="name"
              required
              />
      
            {/* <label className= "email -mx-4" htmlFor="email2 item-left">Email</label> */}
            <input className='email  border-b-2 w-1/3  focus:outline-none bg-transparent'
              value={userData.email}
              type="email"
              placeholder="Enter Email"
              id="email"
              name="email"
              readOnly // Prevent editing
              />


              <input className='contact  border-b-2 w-1/4  mx-1 focus:outline-none bg-transparent'
              value={userData.organisation}
              onChange={onChangeInput}
              type="text"
              placeholder="Enter Organisation Info"
              id="organisation"
              name="organisation"
              required
              />
          </div>
          <div className="right1 w-full flex-col text-white max-lg:w-full">
            {/* <label className= "username -mx-4"htmlFor="username">Username</label> */}
            <input className='username  border-b-2 w-1/2 mx-1 focus:outline-none bg-transparent'
              value={userData.username}
              type="text"
              placeholder="Enter Username"
              id="username"
              name="username"
              readOnly // Prevent editing
              />
            {/* <label className= "contact -mx-4"htmlFor="contact_info">Contact Info</label> */}
            <input className='contact  border-b-2 w-1/3 focus:outline-none bg-transparent'
              value={userData.contact_info}
              onChange={onChangeInput}
              type="text"
              placeholder="Enter Contact Info"
              id="contact_info"
              name="contact_info"
              required
              />


              
              <input className='contact  border-b-2 w-1/4 mx-1 focus:outline-none bg-transparent'
              value={userData.organisation_domain}
              onChange={onChangeInput}
              type="text"
              placeholder="Enter Domain Info"
              id="organisation_domain"
              name="organisation_domain"
              required
              />
          </div>
        </div>
      <div className='update '>
        
        <button  type="submit" className='updatebtn uppercase bg-teal-600 rounded-md w-full py-3 text-xl hover:bg-blue-200 my-5 '>Update Profile </button>
      </div>
        <a className="signin bg-green-700 align-center m-1 mt-4 p-4 max-lg:p-1"href="/login">Already Registered? Sign-In</a>
     
      </form>
     

              </div>
              </div>


      



     
    </>
  );
};

export default EditProfile;