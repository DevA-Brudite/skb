import React from "react";
import CodeType from "../../Assets/Code typing-pana.png";

const BannerCom = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly border-b bg-black items-center lg:gap-10 ">
        <div className="lg:w-3/6 w-full px-4 ">
          <img src={CodeType} alt="bannner" />
        </div>
        <div className="w-full lg:w-2/6 sm:text-center mb-8 px-4 ">
          <h1 className=" font-roboto text-2xl text-white">
            "Simplify recognition and honor achievements
          </h1>
          <h1 className=" font-roboto text-2xl text-white">
            effortlessly with our Badge Allotment platform
          </h1>
          <h1 className=" font-roboto text-2xl text-white">
            {" "}
            Badge Allotment platform
          </h1>
        </div>
      </div>
    </>
  );
};

export default BannerCom;
