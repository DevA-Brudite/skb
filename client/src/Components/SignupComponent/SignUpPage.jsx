import React, { useState } from "react";
import Axios from "axios";
import InputField from "../Utils/InputField";
import CustomBtn from "../Utils/CustomBtn";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    contact_info: "",
    confirm_password: "",
  });

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const { username, password, name, email, contact_info, confirm_password } =
    formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await Axios.post("http://43.205.138.47:8000/api/auth/signup/", formData, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "Successfully Registered.") {
          setIsSignedIn(true);
          navigate("/login", { replace: true });
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
        if (error.response.data.message == "Invalid Credentials") {
          if (error.response.data.error.hasOwnProperty("non_field_errors")) {
            setErrormsg(error.response.data.error.non_field_errors);
            return;
          } else {
            setErrormsg(error.response.data.error.username);
            return;
          }
        } else {
          setErrormsg(error.response.data.message);
          return;
        }
      });
  };

  return (
    <>
      <div className=" bg-[#121212] flex items-center justify-center h-max p-20 ">
        <div className="bg-[#161616] p-8 rounded shadow-md w-3/4 lg:w-2/4">
          <h2 class="text-xl  font-medium text-white text-center mb-4  font-roboto tracking-wider">
            CREATE ACCOUNT
          </h2>
          {isSignedIn ? (
            <p className="text-red-500 font-semibold text-center mb-2 text-sm tracking-wider text-md p-1">
              Registration Successful
            </p>
          ) : (
            <p className="text-red-500 font-semibold text-center mb-2 text-sm tracking-wider text-md p-1">
              {errormsg}
            </p>
          )}
          <form onSubmit={onSubmitHandler} className="flex  space-x-4 flex-wrap justify-center  ">
            <div class="mb-4 w-56 ml-4">
              <InputField
                value={name}
                onChange={onChangeInput}
                label="Name"
                type="text"
                id="name"
                placeholder="Rahul"
                name="name"
              />
            </div>

            <div class="mb-4 w-56">
              <InputField
                value={username}
                onChange={onChangeInput}
                label="Username"
                type="text"
                id="username"
                placeholder="rahul@917"
                name="username"
              />
            </div>

            <div class="mb-4 w-56 ">
              <InputField
                value={email}
                onChange={onChangeInput}
                label="Email"
                type="email"
                id="email"
                placeholder="rahulbharadia917@gmail.com"
                name="email"
              />
            </div>

            <div class="mb-4 w-56 ">
              <InputField
                value={contact_info}
                onChange={onChangeInput}
                label="Contact Number"
                type="phone-pad"
                id="contact_info"
                placeholder="+91-9876543210"
                name="contact_info"
              />
            </div>

            <div class="mb-4 w-56 ">
              <InputField
                value={password}
                onChange={onChangeInput}
                label="Password"
                type="password"
                id="password"
                name="password"
              />
            </div>

            <div class="mb-4 w-56 ">
              <InputField
                value={confirm_password}
                onChange={onChangeInput}
                label="Confirm Password"
                type="password"
                id="confirm_password"
                name="confirm_password"
              />
            </div>
            <div className="w-60 flex justify-center">
              <CustomBtn type="submit" label="Create Account" />
            </div>
          </form>
          <div className="flex flex-row mt-3 justify-center semibold font-roboto text-white gap-1">
            <p>Already a User ?</p>
            <span className="text-white mr-2">
              <a
                href="/"
                className="hover:text-teal-600 border-b-2   hover:border-teal-600"
              >
                Login
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
