import Logo from "../img/account_circle.png"
import "./Navheader.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './Sidebar';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Navheader() {
    // const { user, logout } = UserAuth();
    const [sidebar, setSidebar] = useState(false);
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



    const showSidebar = () => setSidebar(!sidebar);
    return (<>
        <div className="Navheader">
            {/* <IconContext.Provider value={{ color: '#ff' }}>  sidebar  */}
            <div className='navbar'>
                <button className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </button>

            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                {sidebar ? <style>{`
                    .Display, .main hr , sel-ing{
                        position:static;
                    }`}
                </style> : ""}
                
                {/* sidebar  */}
                <ul className='nav-menu-items' onClick={showSidebar} >
                    <li className='navbar-toggle'>
                        <button to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </button>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav> <a href="/"><h2 className="h2">Cook Now</h2></a>
            {/* user name and login & signup page */}
            <div className="User_info">
                {authUser ? (
                    <p>{authUser.email.replace(/@[^@]+$/, '')}</p>
                ) : (
                    <p>Log Out</p>
                )}
                {authUser ? <Link to="/signOut">
                    <img src={Logo} alt="account_circle.png" />
                </Link> : <Link to="/login">
                    <img src={Logo} alt="account_circle.png" />
                </Link>}
            </div></div>
    </>
    )
}
export default Navheader;