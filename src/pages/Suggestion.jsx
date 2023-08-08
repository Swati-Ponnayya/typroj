import React, { useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import "./Suggestion.css";

function Suggestion() {
    const form = useRef();
    const navigate = useNavigate();
    const [sugg, setsugg] = useState("");
    const [FormsErrors, setFormsErrors] = useState({ sugg: "" });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setsugg((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        });
    }

    const sendEmail = async (event) => {
        event.preventDefault();
        setFormsErrors(validate(sugg));
        if (sugg.message.length > 1) {
            const text = sugg.message.replaceAll(" ", "");
            console.log(text.length)
            if (sugg !== "" && text.length > 0) {

                await emailjs.sendForm('service_wv5adxd', 'template_uo5g3dg', form.current, 'nJRZV4gYir0iIzzKq')
                    .then((result) => {
                        alert("Thanks for submitting the suggestion")
                        navigate("/")
                        // show the user a success message
                    }, (error) => {
                        // show the user an error
                    });
                setFormsErrors("")
                // console.log("in")
            }
        }
    };
    const validate = (values) => {
        const errors = {};

        if (!values.message) {
            errors.sugg = "Cannot be Empty.";
        }
        else if (values.message.length > 1) {
            const text = values.message.replaceAll(" ", "");
            console.log("vaild", text.length)
            if (text.length == 0)
                errors.sugg = "Cannot be Empty.";
        }

        return errors;
    }

    const [authUser, setAuthUser] = useState(null);

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

    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <div className="Suggestion">
                <form ref={form}>
                    <h1>Suggestion</h1>

                    {authUser ? (
                        <div>

                            <input type='email' value={authUser.email} readOnly name="from_name"></input>
                            <textarea placeholder="Write Suggestion" name="message" maxLength={1000} onChange={handleChange} value={setsugg.message}></textarea>
                            <p>{FormsErrors.sugg ? (FormsErrors.sugg) : ""}</p>
                            <input type='submit' value="Submit" onClick={(event) => sendEmail(event)}></input>
                        </div>
                    ) : (
                        <h3> You have to <Link to='/login'>Login</Link> to write suggestion</h3>
                    )}

                </form>
            </div>
        </>
    );
}

export default Suggestion;