import React from "react";
import BannerCom from "./BannerCom";
import AbtCom from "./AbtCom";
import BrandName from "./BrandName";
import CompanyDetails from "./CompanyDetails";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-bg">
      <BannerCom />
      <AbtCom />
      {/* <BrandName /> */}
      <CompanyDetails />
    </div>
  );
};

export default HomePage;
