import React, { useEffect, useState } from "react";
import Badge from "../../Assets/Python.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyDetails from "../HomePage/CompanyDetails";

const VerifyBadge = () => {
  const unique_code = useParams();
  const [Data, setData] = useState({
    verified: false,
    assignment_data: "",
    badge_data: "",
    user_data: "",
    org_data: "",
    msg: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(unique_code.id);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/org/verify/?uvc=${unique_code.id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [unique_code]);

  console.log(Data);
  return (
    <>
      <div className=" bg-[#121212] flex justify-center p-8">
        <div className="bg-[#161616] p-8 rounded flex flex-col lg:flex-row shadow-md  gap-2  lg:w-3/5">
          <div className="lg:w-1/2 flex justify-center items-center lg:border-r-2">
            <div className=" w-5/12 ">
              <img src={Badge} alt="Badge-Check" />
            </div>
          </div>

          <div className=" ml-2  text-center lg:text-left lg:w-1/2">
            <div className="text-white">
              <h2 className=" lg:text-3xl mb-3 ml-0 font-semibold tracking-wider">
                {Data.badge_data.name}
              </h2>
              <p className="text-sm mb-2 tracking-wider">
                Issued by
                <span className="text-green-600 "> {Data.org_data.name}</span>
              </p>
              <p className="mb-2 text-sm tracking-wider">
                {Data.badge_data.description}
              </p>
              <p className="mb-2 font-roboto tracking-wider text-sm">
                Date Created : {Data.badge_data.date_created}
              </p>
              <p className="mb-2 font-roboto tracking-wider text-sm">
                Validity : {Data.badge_data.expiration_durations} Days
              </p>
              <div className="flex flex-col tracking-wider md:flex-row gap-5 mb-3">
                <button className="bg-teal-600 px-3 rounded-full py-1 text-sm">
                  Python
                </button>
                <button className="bg-teal-600 px-3 rounded-full py-1 text-sm">
                  Django
                </button>
                <button className="bg-teal-600 px-3 rounded-full py-1 text-sm">
                  AWS
                </button>
              </div>

              <p className="mb-2  font-roboto tracking-wider text-sm">
                Issued to{" "}
                <span className="text-green-600 ">{Data.user_data.name}</span>
              </p>
              <p className="mb-2 font-roboto tracking-wider text-sm">
                Username : {Data.user_data.username}
              </p>
              <p className="mb-2 font-roboto tracking-wider text-sm">
                Email Id : {Data.user_data.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CompanyDetails/>
    </>
  );
};

export default VerifyBadge;
