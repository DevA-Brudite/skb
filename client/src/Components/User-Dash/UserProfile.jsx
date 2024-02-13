import React, { useState, useEffect } from "react";
// import './UserProfile.css';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AOS from "aos";
import profileimage from "./images/profileimage.png";
import "aos/dist/aos.css";


function UserProfile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    contact_info: "",
  });

  const l = 0;
  const [badgedata, setbadgedata] = useState([]);
  useEffect(() => {
    const fetchBadgeData = async () => {
      try {
        const response = await Axios.get(
          "http://43.205.138.47:8000/api/recipient/allbadges/",
          {
            headers: {
              Authorization: `token ${localStorage.getItem('token')}` , // Replace with your authentication token
            },
          }
        );

        setbadgedata(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchBadgeData();
    // console.log(badgedata);
    // console.log(badgedata.image_url);
  }, []);

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
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  },[]); 

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 700,
      easing: "ease-in-sine",
      delay: 100,
    });
  });
  return (
    <div className="contain flex m-auto  w-full h-full justify-center max-lg:flex-wrap">
      <div
        className="leftrectangle w-1/2 h-full text-gray-300 bg-[#161616]  m-1 rounded-md shadow-slate-600 max-lg:w-4/5"
        data-aos="slide-right"
      >
        <div className="profileimage w-2/5 mt-10 rounded-full  bg-slate-300 max-lg:w-3/4 m-auto">
          <img className= "rounded-full " src={profileimage} alt="image" />
        </div>
        <div className="info text-center p-1 m-2">
          <div className="name mt-2 tracking-wider font-semibold">
            {userData.username}
            {/* <p>bhupendra</p> */}
          </div>
          <div className="email  mt-2 tracking-wider font-semibold">
            {userData.email}
            {/* <p>bhupendravaishnav9@gmail.com</p> */}
          </div>
         
        </div>

        <div className="line h-1 m-1 bg-gray-600"></div>
        <div className="options my-10 ">
          <div
            className="firstoption flex justify-center p-4 w-full hover:bg-sky-700 "
            onClick={() => navigate("/user/editprofile")}
          >
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
            <div className="text ">Edit Profile</div>
          </div>
          <div
            className="secondoption flex justify-center p-4  hover:bg-sky-700"
            onClick={() => navigate("/user/allbadges")}
          >
            <div className="icon mx-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <rect width="25" height="24" fill="None" />
                <path
                  d="M21.875 11C21.875 16.55 17.875 21.74 12.5 23C7.125 21.74 3.125 16.55 3.125 11V5L12.5 1L21.875 5V11ZM12.5 21C16.4062 20 19.7917 15.54 19.7917 11.22V6.3L12.5 3.18L5.20833 6.3V11.22C5.20833 15.54 8.59375 20 12.5 21ZM15.6771 16L12.4688 14.15L9.27083 16L10.1146 12.5L7.29167 10.16L11.0208 9.85L12.4688 6.55L13.9271 9.84L17.6562 10.15L14.8229 12.5L15.6771 16Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text">All Badge</div>
          </div>
          <div className="logout mr-20">
            <button
              className="logoutbtn bg-teal-600 w-full px-2 py-3 text-xl font-semibold tracking-wider rounded-md uppercase m-10 hover:bg-blue-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
       
      </div>

      <div className="rightrectangle  m-1  h-2/3 w-full flex-col rounded-md max-lg:w-4/5">
        <div className="upper  flex  rounded-md  text-gray-300 bg-[#161616] justify-between items-center h-11/50 max-lg:flex-col ">
        
          <div className="username m-10 mt-2 tracking-wider font-semibold">
            {userData.name}
            {/* <p>bhupendra vaishnav</p> */}
          </div>
          <div className="contact m-10 mt-2 tracking-wider font-semibold">
            {userData.contact_info}
            {/* <p>+912302333290</p> */}
          </div>
          <div className="totalbadges text-gray-700 font-bold w-1/5 h-1/2 my-20 bg-slate-400 rounded-md m-3 text-center flex flex-col items-center max-lg:my-2">
              <p className="number text-6xl my-3 max-lg:my-0 max-lg:text-2xl">{badgedata.length}</p>
              <p className="textbadge mt-4">Total Number of Badges</p>
            </div>
          
         
        </div>
        <div className="lower m2-3 bg-[#161616] h-3/5 uppercase rounded-md my-4 ">
          <div className="texte pt-2 mt-2 bg-[#161616]  rounded-lg">
            <h2 class="text-center font-bold text-white bg-[#161616] ">Badges</h2>
          </div>
          <div className="badges flex h-3/4 my-4 max-lg:flex-col max-lg:items-center max-lg:my-1">
            {badgedata.slice(0, 2).map((badge, index) => (
              <div
                key={index}
                className="firstbadge1  flex my-4 w-1/2 h-3/4 justify-center rounded-md m-2"
              >
                <img
                  className="object-fit  h-38 w-38 my-4"
                  src={`http://43.205.138.47:8000/media${badge.image_url}`}
                  alt={`badge_${index}`}
                  width={"180px"}
                  height={"180px"}
                  data-aos="flip-right"
                />
              </div>
            ))}
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
