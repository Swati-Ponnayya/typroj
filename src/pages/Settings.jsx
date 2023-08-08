import React, { useState, useEffect } from "react";
import { getAuth, updateEmail, onAuthStateChanged, deleteUser, reauthenticateWithCredential, pr, updatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./Settings.css"
import { Link } from "react-router-dom";
import { Signout } from '../Components/Signout';
function Settings() {
    const [loginInfo, setLoginInfo] = useState({ username: "", pass: "" });
    const [authUser, setAuthUser] = useState(null);
    const handleChangeLogin = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInfo((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        });
    }

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);
    // console.log(loginInfo.username)
    // to delete account 
    const deleteUsername = async () => {
        await deleteUser(auth.currentUser).then(() => {
            // User deleted.
            alert("The account has been Deleted.")
        }).catch((error) => {
            // An error ocurred
        });
    }
    
    // to update 
    const updateUsername = async () => {
        await updateEmail(auth.currentUser, loginInfo.username).then(() => {
            // Email updated!
            alert("Username updated")
            // ...
        }).catch((error) => {
            // An error occurred
        });
    }
    const Updatepassword = async () => {
        updatePassword(auth.currentUser, loginInfo.pass).then(() => {
            // Password Update successful.
            alert("Password updated")
        }).catch((error) => {
            // An error ocurred
        });
    }

    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <div className="Settings">
                <h1>Account Settings</h1>
                {authUser ? (<>
                    <h3>To change the User name of the Account</h3>
                    <input type="text" name="username" onChange={handleChangeLogin} pattern={/^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/i} placeholder="Change Username"></input>
                    <input type="submit" value="Change Username" onClick={updateUsername}></input>

                    <h3>To change the password of the Account</h3>
                    <input type="password" name="pass" onChange={handleChangeLogin} pattern={/^[a-z0-9]/i} placeholder="Change Password"></input>
                    <input type="submit" value="Change Password" onClick={Updatepassword}></input>

                    <h3>To delete the Account permanently</h3>
                    <input type="submit" value="Delete Account" onClick={deleteUsername}></input>

                    <h3>To Logout </h3>
                    <Link to='/signout'> <input type="submit" value="Log out "></input>
                    </Link>

                </>) : (<h3>To change the account setting You must <Link to='/login'>Login</Link>  First</h3>)}
            </div>
        </>
    )
}
export default Settings;