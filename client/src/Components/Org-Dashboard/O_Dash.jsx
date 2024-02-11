import React, { useState, useEffect } from "react";
// import './O_Dash.css';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AOS from "aos";
import profileimage from "./images/profileimage.png";
import teach from "./images/teach.png";
import business from "./images/business.png";

import "aos/dist/aos.css";

function O_Dash() {
  const navigate = useNavigate();

  const[access,setAccess] = useState(false)

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
          "http://127.0.0.1:8000/api/org/crud/",
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`, // Replace with your authentication token
            },
          }
        );

        if(response.data){
          setAccess(true);
        }
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
          "http://127.0.0.1:8000/api/recipient/alluser/",
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`, // Replace with your authentication token
            },
          }
        );

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []); 

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
    <div className="contain flex w-full  h-full max-lg:flex-wrap">
      <div
        className="leftrectangle w-1/2 h-full text-gray-300 bg-[#161616]  m-1 rounded-md shadow-slate-600 max-lg:w-full"
        data-aos="slide-right"
      >
        <div className="profileimage w-2/5 mt-10 rounded-full  bg-slate-300 max-lg:w-3/4 m-auto">
          <img className="rounded-full " src={profileimage} alt="image" />
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
          <div
            className="firstoption flex justify-center p-2 w-full hover:bg-sky-700 "
            onClick={() => navigate("/createbadge")}
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
            <div className="text ">Create Badge</div>
          </div>
          <div
            className="secondoption flex justify-center p-2  hover:bg-sky-700"
            onClick={() => navigate("/allbadges")}
          >
            <div className="icon mx-6 ml-1">
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
            <div className="text">All Badges</div>
          </div>
          <div
            className="thirdoption flex justify-center p-2  hover:bg-sky-700"
            onClick={() => navigate("/assignbadge")}
          >
            <div className="icon mx-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <rect width="25" height="25" fill="#080808" />
                <path
                  d="M24.5483 21.0938L20.6665 24.9634L19.5679 23.8647L21.5576 21.875H14.0625V20.3125H21.5576L19.5679 18.3228L20.6665 17.2241L24.5483 21.0938ZM16.9312 23.4375L18.4937 25H3.125V3.125H9.375C9.375 2.69368 9.45638 2.29085 9.61914 1.9165C9.7819 1.54215 10.0057 1.2085 10.2905 0.915527C10.5754 0.622559 10.9049 0.398763 11.2793 0.244141C11.6536 0.0895182 12.0605 0.00813802 12.5 0C12.9313 0 13.3341 0.0813802 13.7085 0.244141C14.0828 0.406901 14.4165 0.630697 14.7095 0.915527C15.0024 1.20036 15.2262 1.52995 15.3809 1.9043C15.5355 2.27865 15.6169 2.68555 15.625 3.125H21.875V16.2231L20.3125 14.6606V4.6875H18.75V7.8125H6.25V4.6875H4.6875V23.4375H16.9312ZM7.8125 4.6875V6.25H17.1875V4.6875H14.0625V3.125C14.0625 2.90527 14.0218 2.70182 13.9404 2.51465C13.859 2.32747 13.7492 2.16471 13.6108 2.02637C13.4725 1.88802 13.3057 1.77409 13.1104 1.68457C12.915 1.59505 12.7116 1.55436 12.5 1.5625C12.2803 1.5625 12.0768 1.60319 11.8896 1.68457C11.7025 1.76595 11.5397 1.87581 11.4014 2.01416C11.263 2.15251 11.1491 2.31934 11.0596 2.51465C10.9701 2.70996 10.9294 2.91341 10.9375 3.125V4.6875H7.8125Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text">Assign Badge</div>
          </div>
          <div
            className="fourthoption flex justify-center p-2 hover:bg-sky-700"
            onClick={() => navigate("/editprofile")}
          >
            <div className="icon mx-2">
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
            <div className="text mx-4">Edit Profile</div>
          </div>

          <div className="logout mx-40">
            <button
              className="logoutbtn bg-teal-600 w-3/4  px-2 py-1 text-xl font-semibold tracking-wider rounded-md uppercase m-10 hover:bg-blue-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="rightrectangle  m-1  h-full w-full flex-col rounded-md max-lg:w-4/5">
        <div className="upper  flex  rounded-md text-gray-300 bg-[#161616] justify-between  px-10 items-center h-1/2 max-lg:flex-col ">
          <div className="totalbadges text-white font-bold w-1/5 h-1/4 my-16 rounded-md text-center flex-col  items-center max-lg:my-1">
            <img
              className="first items-center"
              src={teach}
              alt=""
              width={"140px"}
            />
          </div>
          <div
            className="totalbadges text-white font-bold w-1/5 h-full my-16 bg-teal-600 rounded-md text-center flex-col  items-center max-lg:my-2"
            data-aos="zoom-in"
          >
            <p className="number text-6xl my-2 max-lg:my-0 max-lg:text-2xl ">
              {badgedata.length}
            </p>
            <p className="textbadge mt-4">Total Number of Badges</p>
          </div>

          <div className="totalbadges text-white font-bold w-1/5 h-3/4 my-16 rounded-md  text-center flex-col  items-center max-lg:my-1">
            <img src={business} alt="" width={"140px"} />
          </div>
        </div>
        <div className="lower  bg-[#161616] h-1/2 uppercase rounded-md ">
          <div className="texte pt-2 mt-4 bg-[#161616]  rounded-lg">
            <h2 class="text-center mt-3 font-bold text-white bg-[#161616] ">
              Badges
            </h2>
          </div>
          <div className="badges flex h-3/4 mt-12  max-lg:flex-col mx-60 max-lg:items-center max-lg:my-1">
            {badgedata.slice(0, 4).map((badge, index) => (
              <div
                key={index}
                className="firstbadge1  flex my-4 w-1/2 h-3/4 justify-center rounded-md m-2"
              >
                <img
                  className="object-fit  h-38 w-38 my-4"
                  src={`http://127.0.0.1:8000/media${badge.image_url}`}
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

export default O_Dash;
