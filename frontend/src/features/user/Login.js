import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import Logo from "../../components/Logo";

function Login() {
    const INITIAL_LOGIN_OBJ = {
        username: "",
        password: "",
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (loginObj.username.trim() === "") {
            return setErrorUsername("Please enter your username.");
        }
        if (loginObj.password.trim() === "")
            return setErrorPassword("Please enter your password.");
        else {
            setLoading(true);
            // Call API to check user credentials and save token in localstorage

            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginObj),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.error) {
                        console.log(data.error);
                        setErrorUsername(data.error["username"]);
                        setErrorPassword(data.error["password"]);
                        setLoading(false);
                    } else {
                        console.log("no more error");
                        localStorage.setItem("username", data.username);
                        localStorage.setItem("email", data.email);
                        localStorage.setItem("fullname", data.fullname);
                        localStorage.setItem("token", data.username);
                        // localStorage.setItem("username", JSON.stringify(loginObj.username));
                        setLoading(false);
                        window.location.href = "/welcome";
                    }
                })
                .catch((err) => {
                    setErrorMessage(err.message);
                    setLoading(false);
                });

            // localStorage.setItem("token", "");
            // setLoading(false);
            // window.location.href = "/welcome";
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center">
            <div className="card card-side card-bordered mx-auto w-full max-w-5xl shadow-xl h-[42rem]">
                <figure>
                    <img src="background_2.png" className="h-full" />
                </figure>
                {/* <div className="card-body grid md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                 */}
                <div className="card-body min-w-[50%] py-8 px-14 text-center">
                    {/* <div className="max-lg:hidden">
                        
                    </div> */}
                    <h1 className="text-6xl font-bold my-6 text-center">
                        <Logo />
                    </h1>
                    <form onSubmit={(e) => submitForm(e)}>
                        <h2 className=" card-title text-3xl font-semibold">
                            Login
                        </h2>
                        <div className="mb-4">
                            <InputText
                                type="username"
                                defaultValue={loginObj.emailId}
                                updateType="username"
                                containerStyle="mt-3"
                                labelTitle="Username"
                                updateFormValue={updateFormValue}
                            />
                            <ErrorText styleClass="text-sm">
                                {errorUsername}
                            </ErrorText>

                            <InputText
                                defaultValue={loginObj.password}
                                type="password"
                                updateType="password"
                                containerStyle="mt-2"
                                labelTitle="Password"
                                updateFormValue={updateFormValue}
                            />
                            <ErrorText styleClass="text-sm">
                                {errorPassword}
                            </ErrorText>
                            <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <div className="w-full text-center">
                            <button
                                type="submit"
                                className={
                                    "btn mt-1 btn-wide btn-primary" +
                                    (loading ? " loading" : "")
                                }
                            >
                                Login
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            Don't have an account yet?{" "}
                            <Link to="/register">
                                <span className="inline-block font-bold hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                    Register
                                </span>
                            </Link>
                        </div>

                        <div className="w-full text-center">
                            <Link to={"/welcome"}>
                                <button
                                    className={"btn mt-10 btn-wide btn-error"}
                                >
                                    Quick Read as Guest
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
