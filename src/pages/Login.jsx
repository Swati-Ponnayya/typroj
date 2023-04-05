import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "./Login.css";


const Login = () => {
    const navigate = useNavigate();
    // Login Information store
    const [loginInfo, setLoginInfo] = useState({ username: "", pass: "" });
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
    // forget password
    const handleForgottenPassword = async () => {
        await sendPasswordResetEmail(auth, loginInfo.username)
            .then(function () {
                alert('Please check your email')
            }).catch(function (e) {
                console.log(e)
            })

    }

    // Login form validation
    const [loginFormErrors, setLoginFormError] = useState({});
    const [authorizationError, setauthorizationError] = useState("");
    // const [isLoginSubmit, setisLoginSubmit] = useState(false);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setLoginFormError(validateLogin(loginInfo));
        // setauthorizationError((loginInfo));
        // const res = await signIn(loginInfo);
        // if (res.error) seterror(res.error);
        signInWithEmailAndPassword(auth, loginInfo.username, loginInfo.pass)
            .then(() => {
                //   console.log(userCredential);
                setLoginInfo("")
                navigate("/")
            })
            .catch((error) => {
                setauthorizationError("")
                // console.log(error.message);
                if (error.code === "auth/wrong-password")
                    setauthorizationError("Wrong Password");
                if (error.code === "auth/user-not-found")
                    setauthorizationError("Wrong Email")
                if (error.code === "auth/invalid-email")
                    setauthorizationError("Invalid Email")
                // alert(authorizationError);
            });
    }

    const validateLogin = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required";
        }

        if (!values.pass) {
            errors.pass = "Password is required";
        }
        return errors;
    }

    return (
        <div className="login">
            <form>
                <h1>Log In</h1>
                <div>
                    <input type="email" placeholder="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" name="username" onChange={handleChangeLogin} value={loginInfo.username} />
                    {loginFormErrors.username?<p>{loginFormErrors.username}</p>  :<p>&nbsp; </p>}
                </div>
                <div>
                    <input type="password" placeholder="Password" maxLength="10" name="pass" onChange={handleChangeLogin} value={loginInfo.pass} />
                    {loginFormErrors.pass? <p>{loginFormErrors.pass}</p>:<p>&nbsp; </p>}
                </div>
                <h5 onClick={handleForgottenPassword}>Forget Password </h5>
                <p className="error">{loginFormErrors.username?"":authorizationError}</p>
                <input type="submit" value="Login" onClick={handleSubmitLogin} />
           
            </form>
            <div>
                {/* {Object.keys(loginFormErrors).length === 0 && isLoginSubmit ? ("g") : ("")} */}
                <h6>Don't have an account <Link to="/signup" >Sign In</Link></h6>
            </div>
        </div>
    );
}
export default Login;