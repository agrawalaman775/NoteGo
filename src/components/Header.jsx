import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";


function Header() {
  const {logOut} =useUserAuth();
  const navigate=useNavigate();
  const handleClick = async() => {
   try{
    await logOut();
   }
   catch (err){
    console.log(err);
   }
};



  return (
    <header>
    <div className="header-content">
    <h1>
        <HighlightIcon />
        NoteGo
      </h1>
      <button onClick={handleClick}>Sign out</button>
    </div>

    </header>
  );
}

export default Header;
