import React, { useState } from "react";
import Axios from "axios";
import InputField from "./InputField";
import CustomBtn from "./CustomBtn";
import { useEffect } from "react";
import profileimage from './images/profileimage.png';
import { useNavigate } from "react-router-dom";

const CreateBadge = () => {
    const navigate =useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    criteria: "",
    description: "",
    image_url: null,
    expiration_durations: 0,
  });

  const [isCreateBadge, setIsCreateBadge] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const { name, criteria, description, expiration_durations } = formData;

  const onChangeInput = (e) => {
    if (e.target.name === "image_url") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `token ${localStorage.getItem('token')}`,
      },
    };
     try {
      const response = await Axios.post("http://43.205.138.47:8000/api/org/crud/", formData, config);
      console.log(response);
      setIsCreateBadge(true);
    } catch (error) {
      setErrormsg("Error creating badge");
      console.error(error);
    }
  };
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(
          "http://43.205.138.47:8000/api/recipient/alluser/",
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
  }, []); // Empty dependency array ensures this effect runs once when the component mounts
 

  return (
    <>
    <div className="contain flex m-auto   w-full h-full justify-center max-lg:flex-wrap">
        
       <div className="leftrectangle  text-gray-300 bg-[#161616] w-1/4 m-1 rounded-md shadow-slate-600 max-lg:w-full" data-aos="slide-right" >
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

    
    <div className="rightrectangle w-3/4 m-1  flex rounded-md max-lg:w-1/2"  >


    <div className="bg-[#161616] flex w-full h-full ">
      <div className="bg-[#121212] m-8 p-20 rounded shadow-md w-full lg:w-full my-2">
        <h2 className="text-xl font-medium text-white text-center mb-4 font-roboto tracking-wider">
          CREATE Badge
        </h2>
        <form
          className="flex space-x-4 flex-wrap justify-center"
          onSubmit={onSubmitHandler}
        >
          {isCreateBadge ? (
            <p className="text-green-500 text-center">Create Badge Successful</p>
          ) : (
            <p className="text-red-500 text-center">{errormsg}</p>
          )}
          <div className="mb-4 w-80">
            <InputField
              label="Name"
              type="text"
              id="name"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={onChangeInput}
              />
          </div>

          <div className="mb-4 w-80">
            <InputField
              label="Description"
              type="textarea"
              id="description"
              placeholder="Enter description"
              name="description"
              value={description}
              onChange={onChangeInput}
              />
          </div>

          <div className="mb-4 w-80">
            <InputField
              label="Criteria"
              type="text"
              id="criteria"
              placeholder="Enter criteria"
              name="criteria"
              value={criteria}
              onChange={onChangeInput}
              />
          </div>

          <div className="mb-4 w-80">
            <InputField
              label="Upload Badge Image"
              type="file"
              id="image_url"
              name="image_url"
              accept=".png"
              required
              onChange={onChangeInput}
              />
          </div>

          <div className="mb-4 w-64">
            <InputField
              label="Expiration Durations"
              type="number"
              id="expiration_durations"
              name="expiration_durations"
              value={expiration_durations}
              onChange={onChangeInput}
              required
              />
          </div>

          <div className="w-full flex  m-10 justify-center">
            <CustomBtn type="submit" label="Create Badge" />
          </div>
        </form>
      </div>
    </div>
              </div>
              </div>
    </>
  );
};

export default CreateBadge;
