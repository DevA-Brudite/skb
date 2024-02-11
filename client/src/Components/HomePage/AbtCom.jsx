import React from "react";
import Company from "../../Assets/tech company-rafiki.png";

const AbtCom = () => {
  return (
    <section className=" border-b" id="about">
      <div>
        <h2 className="text-3xl font-bold font-roboto text-center text-black mb-10">
          About Company
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row  justify-evenly items-center gap-10">
        <div className="lg:w-3/6 w-full">
          <h3 className=" text-[22px] m-4 font-roboto text-black tracking-normal">
            It all began with a group of people who dreamt of starting something
            completely new. Together, they established Brudite Private Limited,
            a company dedicated to exploring the unexplored areas of Software
            Development and its principles. Their services were designed to
            satisfy all of the customers, anytime, anywhere. They are committed
            to customer satisfaction as their top priority.
          </h3>
        </div>

        <div className="lg:w-2/6 w-full  ">
          <img src={Company} alt="" />
        </div>
      </div>
    </section>
  );
};

export default AbtCom;
