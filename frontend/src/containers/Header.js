import React, {  useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BellIcon  from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'
import LeftSidebar from "./LeftSidebar";
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import PageContent from "./PageContent";


function Header(){

    const dispatch = useDispatch()
    const {noOfNotifications, pageTitle} = useSelector(state => state.header)

    const handleClicked = () => {
        const element = document.activeElement;
        if (element instanceof HTMLElement) {
            element.blur();
        }
    }
    const handleParentClicked = (e) => {
        e.target.parentElement.classList.toggle("active");

    }

    // add click event listener to li element that in dropdown menu
    useEffect(() => {
        const liElements = document.querySelectorAll(".dropdown-content li");
        liElements.forEach((li) => {
            li.addEventListener("click", handleClicked);
        });

    }, []);



    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(openRightDrawer({header : "Notifications", bodyType : RIGHT_DRAWER_TYPES.NOTIFICATION}))
    }

    function logoutUser(){
        localStorage.clear();
        window.location.href = '/'
    }

    return(
        <>
            <div className="navbar flex justify-between bg-base-100  z-10 shadow-md ">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-primary">
                        <Bars3Icon className="h-5 inline-block w-5"/>
                    </div>
                    <LeftSidebar />
                </div>
                <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>

                <div className="order-last">

                    {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection,
                    also includes corporate and retro themes in tailwind.config file */}

                    {/* <select className="select select-sm mr-4" data-choose-theme>
                        <option disabled selected>Theme</option>
                        <option value="light">Default</option>
                        <option value="dark">Dark</option>
                        <option value="corporate">Corporate</option>
                        <option value="retro">Retro</option>
                    </select> */}


                {/* Light and dark theme selection toogle **/}
                <label className="swap swap-rotate">
                    <input type="checkbox" className="theme-controller" value="dark-theme"/>
                    <SunIcon className={"swap-off fill-current w-6 h-6 "}/>
                    <MoonIcon className={"swap-on fill-current w-6 h-6 "} />
                </label>


                    {/* Notification icon */}
                    <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
                        <div className="indicator">
                            <BellIcon className="h-6 w-6"/>
                            {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null }
                        </div>
                    </button>


                    {/* Profile icon, opening menu on click */}
                    <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle bordered avatar">
                            <div className="w-7 rounded-full">
                                <UserIcon className="h-6 w-6 m-auto self-center"/>
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between">
                            <Link to={'/app/settings-profile'}>
                                Profile Settings
                                <span className="badge">New</span>
                                </Link>
                            </li>
                            <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a onClick={logoutUser}>Logout</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header