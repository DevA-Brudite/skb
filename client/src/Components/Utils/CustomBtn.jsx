import React from "react";

const CustomBtn = (props) => {
  return (
    <>
      <button
        type={props.type}
        className="hover:bg-teal-600 tracking-wider font-medium delay-100 duration-200 px-3 py-2 p-1 rounded-lg bg-teal-400 font-roboto hover:text-white"
      >
        {props.label}
      </button>
    </>
  );
};

export default CustomBtn;
