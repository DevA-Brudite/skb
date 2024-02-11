import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginComponent/LoginPage";
// import UserPage from "./Components/UserDetail/UserPage";

import AOS from "aos";
import EditBadge from "./Components/Org-Dashboard/EditBadge";

//organisation 
import AssignBadge from "./Components/Org-Dashboard/AssignBadge";
import SingleBadgeOrg from "./Components/Org-Dashboard/SingleBadge/SingleBadgeOrg";

import VerifyBadge from "./Components/Org-Dashboard/VerifyBadge";
import O_Dash from "./Components/Org-Dashboard/O_Dash";
import EditProfile from "./Components/EditProfile/EditProfile";
import AllBadges from "./Components/AllBadges/AllBadges";
import EditDetails from "./Components/Org_Apply/EditOrgDetails"; 
import Apply_for_Org from "./Components/Org_Apply/Apply_for_Org";
// user
import UserEditProfile from "./Components/User-Dash/UserEditProfile";
import UserProfile from "./Components/User-Dash/UserProfile";
import UserAllBadges from "./Components/User-Dash/UserAllBadges";
import CreateBadge from "./Components/Org-Dashboard/CreateBadge";
import SignUpPage from "./Components/SignupComponent/SignUpPage";

import { useEffect } from "react";

import "aos/dist/aos.css";
import EditOrgDetails from "./Components/Org_Apply/EditOrgDetails";


function App() {
  useEffect(()=>{
    AOS.init();
  })
  return (

    
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage/>} />

        <Route path="/editprofile" element={<EditOrgDetails/>} />
        <Route path="/allbadges" element={<AllBadges/>} />
        <Route path="/orgdash" element={<O_Dash/>} />
        <Route path="/createbadge" element={<CreateBadge/>} />
        <Route path="/assignbadge" element={<AssignBadge/>} />
        <Route path="/Apply_for_Org" element={<Apply_for_Org />} />
        


        <Route path="/editbadge/:id" element={<EditBadge/>} />
         


        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/editprofile" element={<UserEditProfile/>} />
        <Route path="/user/allbadges" element={<UserAllBadges/>} />

        
        
       
        <Route path="/singlebadgeorg/:id" element={<SingleBadgeOrg/>}/>
        <Route path="/verify-badge/:id" element={<VerifyBadge/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;



















