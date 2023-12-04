import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/solid/SunIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import LogoutIcon from "@heroicons/react/24/outline/ArrowLeftCircleIcon";
import SettingIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import LeftSidebar from "./LeftSidebar";
import { NavLink, Routes, Link, useLocation } from "react-router-dom";
import checkAuth from "../app/auth";
import { useContext } from "react";
import ThemeContext from "../app/theme";
import Logo from "../components/Logo";

const token = checkAuth();
console.log("token:", token);
const username = localStorage.getItem("username");

function Header() {
    
    const dispatch = useDispatch();
    const { noOfNotifications, pageTitle } = useSelector(
        (state) => state.header
    );

    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = (event) => {
        console.log(event.target.checked);
        setTheme(event.target.checked ? "dark-theme" : "light-theme");
        console.log(theme);
        window.localStorage.setItem(
            "theme",
            event.target.checked ? "dark-theme" : "light-theme"
        );
    };

    useEffect(() => {
        const storedTheme = window.localStorage.getItem("theme");
        setTheme(storedTheme ? storedTheme : "light-theme");
    }, []);

    const handleClicked = () => {
        const element = document.activeElement;
        if (element instanceof HTMLElement) {
            element.blur();
        }
    };
    const handleParentClicked = (e) => {
        e.target.parentElement.classList.toggle("active");
    };

    // add click event listener to li element that in dropdown menu
    useEffect(() => {
        const liElements = document.querySelectorAll(".dropdown-content li");
        liElements.forEach((li) => {
            li.addEventListener("click", handleClicked);
        });
    }, []);

    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(
            openRightDrawer({
                header: "Notifications",
                bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
            })
        );
    };

    function logoutUser() {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <>
            <div className="navbar sticky flex justify-between bg-info z-10 shadow-md md:px-5 max-md:px-1">
                <div className="navbar-start flex flex-row gap-4">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-primary btn-warning dropdown-toggle"
                        >
                            <Bars3Icon className="h-5 inline-block w-5" />
                        </div>
                        <LeftSidebar />
                    </div>
                    <Link to={"/welcome"} className="text-2xl">
                        <span>
                            <Logo />
                        </span>
                    </Link>
                </div>

                <div className="navbar-center">
                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>

                <div className="navbar-end">
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
                        <input
                            type="checkbox"
                            className="theme-controller tooltip tooltip-bottom tooltip-primary"
                            value={theme}
                            onChange={handleThemeChange}
                            checked={theme === "dark-theme"}
                            data-tip="Change theme"
                        />
                        <SunIcon className={"swap-off fill-current w-6 h-6"} />
                        <MoonIcon className={"swap-on fill-current w-6 h-6"} />
                    </label>

                    {token ? (
                        <div>
                            {/* <button
                                className="btn btn-ghost md:ml-4 btn-circle"
                                onClick={() => openNotification()}
                            >
                                <div className="indicator">
                                    <BellIcon className="h-6 w-6" />
                                    {noOfNotifications > 0 ? (
                                        <span className="indicator-item badge badge-secondary badge-sm">
                                            {noOfNotifications}
                                        </span>
                                    ) : null}
                                </div>
                            </button> */}

                            <div className="dropdown dropdown-end md:ml-4 w-fit">
                                <label tabIndex={0} className="">
                                    <div className="btn btn-ghost btn-circle rounded-full avatar">
                                        <UserIcon className="h-6 w-6 self-center" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <span className="font-bold self-center">
                                            {username}
                                        </span>
                                    </li>

                                    <li className="justify-between flex flex-row">
                                        <Link to={"/app/settings-profile"}>
                                            <div>
                                                <SettingIcon className="h-6 w-6 self-center" />
                                            </div>
                                            Profile Settings
                                            {/* <span className="badge">New</span> */}
                                        </Link>
                                    </li>
                                    {/* <li className="">
                                        <Link to={"/app/settings-billing"}>
                                            Bill History
                                        </Link>
                                    </li> */}
                                    <div className="divider mt-0 mb-0"></div>
                                    <li className="justify-between">
                                        <a onClick={logoutUser}>
                                            <div>
                                                <LogoutIcon className="h-6 w-6 self-center" />
                                            </div>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row md:gap-4 max-md:gap-1 md:ml-5 max-md:ml-1">
                            <Link to={"/register"}>
                                <button className="btn btn-accent text-info btn-sm max-md:hidden">
                                    Register
                                </button>
                            </Link>
                            <Link to={"/login"}>
                                <button className="btn btn-error text-info btn-sm">
                                    Login
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
