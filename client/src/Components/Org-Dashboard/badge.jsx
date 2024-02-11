import React, { useState } from 'react';
import Axios from 'axios';
import InputField from "../InputField";
import CustomBtn from "../CustomBtn";

const Badge = () => {
  const [formData, setFormData] = useState({
    badge_id: "",
    recipient_id:"",

    
  });

  const {  badge_id, recipient_id} = formData;

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
      "http://127.0.0.1:8000/api/org/badge-assign/",
      formData,
      config
    );
    console.log(response.data);
  };

  return (
    <>
      <div className="bg-[#121212] flex items-center justify-center h-screen">
        <div className="bg-[#161616] p-8 rounded shadow-md w-3/4 lg:w-2/4">
          <h2 className="text-xl font-medium text-white text-center mb-4 font-roboto tracking-wider">
            Apply For Organisation
          </h2>
          <form onSubmit={onSubmitHandler} className="flex space-x-4 flex-wrap justify-center " enctype="multipart/form-data">

            <div class="mb-4 w-60 ">
              <InputField
                value={badge_id}
                onChange={onChangeInput}
                label="Badge ID"
                type="number"
                id="  badge_id"
                placeholder="Enter Badge ID"
                name="badge_id"
              />
            </div>
            <div class="mb-4 w-60 ">
              <InputField
                value={recipient_id}
                onChange={onChangeInput}
                label="Recipient ID "
                type="number"
                id="recipient_id"
                placeholder="Enter Recipient ID"
                name="recipient_id"
              />
            </div>
          <div className='mb-4 w-60 flex justify-center'>
              <CustomBtn type="submit" label="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Badge;