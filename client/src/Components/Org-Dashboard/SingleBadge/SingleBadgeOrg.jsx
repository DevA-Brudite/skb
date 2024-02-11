import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import profileimage from '../images/profileimage.png';
import { useNavigate } from 'react-router-dom';

const SingleBadgeOrg = () => {
  const badge_id = useParams();
  const navigate = useNavigate();
    

  const [userDataData, setuserData] = useState({
    id:"",
    name:"",
    description:"",
    criteria:"",
    image_url:"",
    date_created:"",
    expiration_durations:0,
    assigned_users:[],
  });

  useEffect(() => {
    const fetchuserDataData = async (badgeId) => {
      try {
        const response = await Axios.get(`http://127.0.0.1:8000/api/org/crud/?badge_id=${badge_id.id}`, {
          headers: {
            Authorization: `token ${localStorage.getItem('token')}`, // Replace with your authentication token
          },
        });
        console.log(response.data.data.assigned_users);
        setuserData(response.data.data);
      } catch (error) {
        console.error('Error fetching userData data:', error);
      }
    };

    // Call the function to fetch userData data
    fetchuserDataData();
  }, []);


  const [user, setUser] = useState({
    email: '',
    username: '',
  });
  useEffect(() => {
    
    const UserData = async () => {
      try {
        const response = await Axios.get("http://127.0.0.1:8000/api/recipient/alluser/", {
          headers: {
            Authorization: `token ${localStorage.getItem('token')}`, // Replace with your authentication token
          },
        });
        
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    UserData();
    
}, []);

const handleLogout = () =>{
  localStorage.removeItem("token");
  navigate("/login");
}

  return (
    <>
     <div className="contain m-auto  h-full flex justify-center max-lg:flex-wrap">
     <div className="leftrectangle  text-gray-300 bg-[#161616] w-1/4 m-1 rounded-md shadow-slate-600 max-lg:w-full" data-aos="slide-right" >
      <div className="profileimage w-2/5 mt-10 rounded-full  bg-slate-300 max-lg:w-3/4 m-auto">
        <img className= "rounded-full" src={profileimage} />
       </div>
       <div className="info text-center p-1 m-2">
          <div className="name mt-2 tracking-wider font-semibold">
            {user.username}
            {/* <p>bhupendra</p> */}
          </div>
         
          <div className="contact mt-2 tracking-wider font-semibold">
            {user.contact_info}
            {/* <p>+912302333290</p> */}
          </div>
          <div className="username mt-2 tracking-wider font-semibold">
            {user.name}
            {/* <p>bhupendra vaishnav</p> */}
          </div>
          
          <div className="email  mt-2 tracking-wider font-semibold">
            {user.email}
            {/* <p>bhupendravaishnav9@gmail.com</p> */}
          </div>
         
        </div>
        
       <div className="line h-1 m-1 bg-gray-600">
        
       </div>
       
       <div className="options my-2 ">

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
      


       <div className="logout flex justify-center mx-28">
            <button
              className="logoutbtn bg-teal-600 w-full  px-1 py-1 text-xl font-semibold tracking-wider rounded-md uppercase m-10 hover:bg-blue-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
       </div>
      
       
    </div>

   
      <div className="h-[100px] bg-slate-200"></div>
      <div className="bg-[#121212] flex-col justify-center lg:h-3/6 md:p-28 lg:p-16">
        <div className="bg-[#161616] p-8 rounded flex flex-col lg:flex-row shadow-md gap-2 lg:w-4/5">
          <div className="lg:w-1/2 flex justify-center items-center lg:border-r-2">
            <div className="w-5/12">
              <img src={`http://127.0.0.1:8000/media${userDataData.image_url}`}  alt="Badge-Check" />
            </div>
          </div>

          <div className="ml-2 text-center lg:text-left lg:w-1/2">
            <div className="text-white">
              <h2 className="lg:text-3xl mb-3 font-semibold tracking-wider">
                Badge Details
              </h2>
              
                
                  <p className="mb-2 font-roboto tracking-wider text-sm">
                    ID: {userDataData.id}
                  </p>
                  <p className="mb-2 font-roboto tracking-wider text-sm">
                    Name: {userDataData.name}
                  </p>
                  <p className="mb-2 font-roboto tracking-wider text-sm">
                    Description: {userDataData.description}
                  </p>
                  <p className="mb-2 font-roboto tracking-wider text-sm">
                    Criteria: {userDataData.criteria}
                  </p>
                  <p className="mb-2 font-roboto tracking-wider text-sm">
                    Date Created: {userDataData.date_created}
                  </p>
                  <p className="mb-2 font-roboto tracking-wider text-sm">
                    Expiration Durations: {userDataData.expiration_durations}
                  </p>
            </div>
          </div>
        </div>
        <div className="assigned text-white  flex-col justify-center">
          Assigned Users
          {userDataData.assigned_users.map((recipient)=>(
            <div>
              <p>Name : {recipient.name}</p>
              <p>Usernme : {recipient.name}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default SingleBadgeOrg;