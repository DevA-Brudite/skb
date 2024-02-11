import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './UserAllBadges.css';
import Axios  from 'axios';
import { useState ,useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import profileimage from './images/profileimage.png'


const UserAllBadges = () => {
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState([]); // Initialize as an empty array
    useEffect(() => {
        
      const fetchUserData = async () => {
        try {
          const response = await Axios.get("http://127.0.0.1:8000/api/recipient/allbadges/", {
            headers: {
              Authorization: `token ${localStorage.getItem('token')}`, // Replace with your authentication token
            },
          });
          
          setUserData(response.data);
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
      console.log(userData);
      console.log(userData.image_url);
      
      
      
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
const handleSingleBadge = async (badgeId) => {
  navigate(`/singlebadge/${badgeId}`);
  
};

const handleLogout = () =>{
  localStorage.removeItem("token");
  navigate("/login");
}

useEffect(()=>{
  AOS.init({
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
  });
})

  return (
    
    <div className="container m-auto  my-1 flex justify-center max-lg:flex-wrap">
    
    <div className="leftrectangle  text-gray-300 bg-[#121212] w-1/4 m-1 rounded-md shadow-slate-600 max-lg:w-4/5" data-aos="slide-right" >
      <div className="profileimage w-2/5 mt-10 rounded-full  bg-slate-300 max-lg:w-3/4 m-auto">
        <img className= "rounded-full" src={profileimage} alt="image"/>
       </div>
       <div className="info text-center p-1 m-2">

       <div className="name mt-2 tracking-wider font-semibold">
        {user.username}
        {/* <p>bhupendra</p> */}
       </div>
       <div className="email  mt-2 tracking-wider font-semibold">
            {user.email}
            {/* <p>bhupendravaishnav9@gmail.com</p> */}
          </div>
      
       </div>
     
        
       <div className="line h-1 m-1 bg-gray-600">
        
       </div>
       <div className="options my-10 ">

       <div className="firstoption flex justify-center p-4 w-full hover:bg-sky-700 " onClick={()=> navigate('/user/profile')}>
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
       <div className="secondoption flex justify-center p-4  hover:bg-sky-700" onClick={()=>navigate('/user/editprofile')}>
       <div className="icon mx-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 22 23"
                fill="none"
              >
                <rect width="22" height="23" fill="None" />
                <path
                  d="M12.8883 8.64417L13.7317 9.52583L5.42667 18.2083H4.58333V17.3267L12.8883 8.64417ZM16.1883 2.875C15.9592 2.875 15.7208 2.97083 15.5467 3.15292L13.8692 4.90667L17.3067 8.50042L18.9842 6.74667C19.0691 6.65801 19.1366 6.5527 19.1826 6.43676C19.2286 6.32083 19.2522 6.19655 19.2522 6.07104C19.2522 5.94553 19.2286 5.82125 19.1826 5.70532C19.1366 5.58939 19.0691 5.48408 18.9842 5.39542L16.8392 3.15292C16.6558 2.96125 16.4267 2.875 16.1883 2.875ZM12.8883 5.93208L2.75 16.5312V20.125H6.1875L16.3258 9.52583L12.8883 5.93208Z"
                  fill="#FFFDFD"
                />
              </svg>
            </div>
         <div className="text mx-2">
           Edit Profile
         </div>
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

       <div className='rightrectanglebadge  bg-[#121212] m-1 w-3/4 rounded-md  items-center max-lg:w-4/5'>
        <div className='leftdisplay '>
          
        {userData.map((badge, index) => (
          <div key={index} className='firstbadge1 flex justify-between text-white m-1 uppercase items-center h-10 w-3/4 bg-[#181818] rounded-md p-3 mt-32 ml-20  max-lg:flex-col max-lg:h-2/3 max-lg:w-1/2 max-lg:my-5' onClick={() => handleSingleBadge(badge.id)} >
             <img className= "badgeimage -mx-12 max-lg:w-3/4  p-2 max-lg:h-3/4"src={`http://127.0.0.1:8000/media${badge.image_url}`} alt={`badge_${index}`} width={'160px'} height={'160px'}   data-aos= "flip-right"/>
             
           <p>{badge.name}</p>
            <p>{badge.date_created}</p>
            {/* <p>{badge.description}</p> */}
            <p>{badge.expiration_durations}</p>
          </div>
        ))}
      
        </div>
       
        
    </div>
      
    </div>
  )
}

export default UserAllBadges