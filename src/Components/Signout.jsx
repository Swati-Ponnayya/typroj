
import { signOut } from "firebase/auth";
// import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast} from 'react-toastify';

const Signout = () => {
    const navigate = useNavigate();
    signOut(auth)
        .then(() => {
            // console.log("sign out successful");
            navigate("/")
            toast.info("Sign out successfully" ,{ autoClose: 2000 })
        })
        .catch((error) => console.log(error));
};
export default Signout;