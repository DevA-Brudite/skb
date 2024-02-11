import React from "react";
import { useNavigate } from "react-router-dom";
// import './AllBadges.css';
import Axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import profileimage from "./images/profileimage.png";

const AllBadges = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8000/api/org/crud/",
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`, // Replace with your authentication token
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditBadge = async (badgeId) => {
    navigate(`/editbadge/${badgeId}`);
  };
  const handleSingleBadge = async (badgeId) => {
    navigate(`/singlebadgeorg/${badgeId}`);
  };
  const handleDeleteBadge = async (badgeId) => {
    try {
      await Axios.delete(
        `http://127.0.0.1:8000/api/org/crud/?badge_id=${badgeId}`,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/allbadges");
    } catch (error) {
      console.error("Error deleting badge:", error);
    }
  };

  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8000/api/recipient/alluser/",
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`, // Replace with your authentication token
            },
          }
        );

        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    UserData();
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  });

  return (
    <div className="contain m-auto  h-full flex justify-center max-lg:flex-wrap">
      <div
        className="leftrectangle  text-gray-300 bg-[#161616] w-1/4 m-1 rounded-md shadow-slate-600 max-lg:w-full"
        data-aos="slide-right"
      >
        <div className="profileimage w-2/5 mt-10 rounded-full  bg-slate-300 max-lg:w-3/4 m-auto">
          <img className="rounded-full" src={profileimage} alt="image" />
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

        <div className="line h-1 m-1 bg-gray-600"></div>

        <div className="options my-2 ">
          <div
            className="firstoption flex justify-center p-4 w-full hover:bg-sky-700 "
            onClick={() => navigate("/orgdash")}
          >
            <div className="icon mx-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect width="24" height="24" fill="None" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7ZM8 13C6.67392 13 5.40215 13.5268 4.46447 14.4645C3.52678 15.4021 3 16.6739 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 16.6739 20.4732 15.4021 19.5355 14.4645C18.5979 13.5268 17.3261 13 16 13H8Z"
                  fill="#F5EBEB"
                />
              </svg>
            </div>
            <div className="text ">User Profile</div>
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

      <div className="rightrectanglebadge  bg-[#161616] m-1 w-3/4 rounded-md  items-center max-lg:w-full">
        <div className="leftdisplay items-center">
          {userData.map((badge, index) => (
            <div
              key={index}
              className="firstbadge1 flex justify-between text-white  uppercase items-center h-9 w-3/4 bg-[#181818] rounded-md p-3 mt-32 ml-32  max-lg:flex-col max-lg:h-2/3 max-lg:w-1/2 max-lg:my-5"
            >
              <img
                className="badgeimage -mx-12 max-lg:w-3/4  p-2 max-lg:h-3/4"
                src={`http://127.0.0.1:8000/media${badge.image_url}`}
                alt={`badge_${index}`}
                width={"140px"}
                height={"160px"}
                data-aos="flip-right"
                onClick={() => handleSingleBadge(badge.id)}
              />

              <p>{badge.name}</p>
              <p>{badge.date_created}</p>

              <p>{badge.expiration_durations}</p>

              <div className="buttonedit flex justify-center ">
                <div className="logout flex justify-center  w-3/4">
                  <button
                    className="logoutbtn bg-teal-700 w-full  px-5  py-1  text-xl font-semibold tracking-wider rounded-md uppercase m-10 hover:bg-blue-400"
                    onClick={() => handleEditBadge(badge.id)}
                  >
                    EDIT
                  </button>
                </div>
                <div className="logout flex justify-center -mx-6">
                  <button
                    className="logoutbtn bg-red-500 w-full px-1 py-1 text-xl font-semibold tracking-wider rounded-md uppercase m-10 hover:bg-blue-400"
                    onClick={() => handleDeleteBadge(badge.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBadges;
