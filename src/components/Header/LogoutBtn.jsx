import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
   const dispatch = useDispatch();

   const logOutHandler = () => {
      authservice
         .logout()
         .then(() => dispatch(logout()))
         .catch((e) => console.log("error in logout", e));
   };
   return (
      <button
         className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
         onClick={logOutHandler}
      >
         Logout
      </button>
   );
}

export default LogoutBtn;
