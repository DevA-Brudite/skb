import React, { useState } from 'react';
import Axios from 'axios';
import InputField from "../InputField";
import CustomBtn from "../CustomBtn";
import { useNavigate } from 'react-router-dom';

const Apply_for_Org = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    organisation: "",
    organisation_domain: "",
    organisation_size: "",
    badges_and_types: "",
   
  });
  
const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state

  const SuccessPopup = ({ onClose }) => (
    <div className="bg-green text-white">
      <p>Form submitted successfully!</p>
      
    </div>
  );

  const { organisation, organisation_domain, organisation_size, badges_and_types } = formData;

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
    const response = await Axios.patch(
      "http://127.0.0.1:8000/api/org/apply_for_org/",
      formData,
      config
    );
    console.log(response.data);
    alert("donw pls wait for verification");
    navigate("/user/profile")
    // setShowSuccessPopup(true);
  };

  return (
    <>
      <div className="bg-[#121212] flex items-center justify-center h-screen">
        <div className="bg-[#161616] p-8 rounded shadow-md w-3/4 lg:w-2/4">
          <h2 className="text-xl font-medium text-white text-center mb-4 font-roboto tracking-wider">
            Apply For Organisation
          </h2>
          <form onSubmit={onSubmitHandler} className="flex space-x-4 flex-wrap justify-center " enctype="multipart/form-data">
            <div className="mb-4 w-60 ">
              <InputField
                value={organisation}
                onChange={onChangeInput}
                label="Organisation Name"
                type="text"
                id="organisation"
                placeholder="Enter Organisation Name"
                name="organisation"
              />
            </div>

            <div class="mb-4 w-60 ">
              <InputField
              value={organisation_domain}
              onChange={onChangeInput}
                label="Organisation Domain"
                type="text"
                id="organisation_domain"
                placeholder="Enter Organisation Domain"
                name="organisation_domain"
              />
            </div>

            <div class="mb-4 w-60 ">
              <InputField
                value={organisation_size}
                onChange={onChangeInput}
                label="Organisation Size"
                type="number"
                id="organisation_size"
                placeholder="Enter Organisation Size"
                name="organisation_size"
              />
            </div>

            <div class="mb-4 w-60 ">
              <InputField
                value={badges_and_types}
                onChange={onChangeInput}
                label="Badges Type"
                type="text"
                id="badges_and_types"
                placeholder="Enter Badges Types"
                name="badges_and_types"
              />
            </div>
       

            <div className='mb-4 w-60 flex justify-center'>
              <CustomBtn type="submit" label="Submit" />
            </div>
          </form>
          {showSuccessPopup && <SuccessPopup onClose={() => setShowSuccessPopup(false)} />}
        </div>
      </div>
    </>
  );
};

export default Apply_for_Org;
