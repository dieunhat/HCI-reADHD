import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

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

        if (loginObj.username.trim() === "")
            return setErrorUsername("Please enter your username.");
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
                        localStorage.setItem(loginObj.username, JSON.stringify(data));
                        setLoading(false);
                        window.location.href = "/welcome";
                    }
                })
                .catch((err) => {
                    setErrorMessage(err.message);
                    setLoading(false);
                });

            localStorage.setItem(loginObj.username, JSON.stringify(loginObj));
            setLoading(false);
            window.location.href = "/welcome";
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className="max-lg:hidden">
                        <LandingIntro />
                    </div>
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">
                            Login
                        </h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                                <InputText
                                    type="username"
                                    defaultValue={loginObj.emailId}
                                    updateType="username"
                                    containerStyle="mt-4"
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
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                                <ErrorText styleClass="text-sm">
                                    {errorPassword}
                                </ErrorText>
                            </div>

                            <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>

                            <ErrorText styleClass="mt-8">
                                {errorMessage}
                            </ErrorText>
                            <button
                                type="submit"
                                className={
                                    "btn mt-2 w-full btn-primary" +
                                    (loading ? " loading" : "")
                                }
                            >
                                Login
                            </button>

                            <div className="text-center mt-4">
                                Don't have an account yet?{" "}
                                <Link to="/register">
                                    <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Register
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
