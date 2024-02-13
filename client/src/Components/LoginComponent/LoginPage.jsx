import React, { useState } from "react";
import Axios from "axios";
import InputField from "../Utils/InputField";
import CustomBtn from "../Utils/CustomBtn";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const { username, password } = formData;

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
    const response = await Axios.post(
      "http://43.205.138.47:8000/api/auth/login/",
      formData,
      config
    );
    console.log(response.data);
    if (response.data.message == "Login successful") {
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token);
      if(response.data.is_org == true){
        navigate("/orgdash", { replace: true });
      }else{
        navigate("/user/profile", { replace: true });
      }
    } else {
      setErrormsg(response.data.message);
    }
  };
  return (
    <>
      <div className=" bg-[#121212] flex items-center justify-center h-max p-32">
        <div className="bg-[#161616] p-8 rounded shadow-md w-96 mb-[6px]">
          <h2 class="text-2xl font-semibold text-white text-center mb-2  font-roboto tracking-wider">
            LOGIN
          </h2>
          {isLoggedIn ? (
            <p className="text-red-500 font-semibold text-center mb-2 text-sm tracking-wider text-md p-1">
              Login Successful
            </p>
          ) : (
            <p className="text-red-500 font-semibold text-center mb-2 text-sm tracking-wider text-md p-1">
              {errormsg}
            </p>
          )}

          <form onSubmit={onSubmitHandler}>
            <div class="mb-4">
              <InputField
                onChange={onChangeInput}
                value={username}
                label="Username"
                name="username"
                id="username"
                type="text"
              />
            </div>
            <div class="mb-4">
              <InputField
                label="Password"
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={onChangeInput}
              />
            </div>
            <div className="flex justify-center">
              <CustomBtn type="submit" label="Login" />
            </div>
          </form>
          <div className="flex flex-row justify-center mt-3 semibold font-roboto text-white gap-1">
            <p>Not a User ?</p>
            <span className="text-white mr-2">
              <a
                href="/"
                className="hover:text-teal-600 border-b-2   hover:border-teal-600"
              >
                Create Account
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
