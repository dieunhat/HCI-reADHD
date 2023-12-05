import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import Logo from "../../components/Logo";

function Register() {
    const INITIAL_REGISTER_OBJ = {
        username: "",
        fullname: "",
        password: "",
        email: "",
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorFullname, setErrorFullname] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (registerObj.username.trim() === "")
            // return setErrorMessage("Please enter your username.");
            return setErrorUsername("Please enter your username.");

        if (registerObj.fullname.trim() === "")
            // return setErrorMessage("Please enter your full name.");
            return setErrorFullname("Please enter your full name.");
        if (registerObj.fullname.trim().length < 6)
            return setErrorFullname(
                "The full name must be at least 6 characters long."
            );

        if (registerObj.email.trim() === "")
            // return setErrorMessage("Please enter your email.");
            return setErrorEmail("Please enter your email.");
        if (!registerObj.email.includes("@"))
            // return setErrorMessage("Please enter a valid email.");
            return setErrorEmail("Please enter a valid email.");

        if (registerObj.password.trim() === "")
            // return setErrorMessage("Please enter your password.");
            return setErrorPassword("Please enter your password.");
        else {
            setLoading(true);
            // Call API to check user credentials and save token in localstorage
            fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerObj),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.error) {
                        console.log(data.error);
                        setErrorUsername(data.error["username"]);
                        setErrorFullname(data.error["Fullname"]);
                        setErrorPassword(data.error["password"]);
                        setErrorEmail(data.error["email"]);

                        setLoading(false);
                    } else {
                        console.log("no more error");
                        localStorage.setItem(
                            "token",
                            JSON.stringify(registerObj)
                        );
                        setLoading(false);
                        window.location.href = "/login";
                    }
                })
                .catch((err) => {
                    setErrorMessage(
                        "Something went wrong. Please try again later."
                    );
                    setLoading(false);
                });
            // localStorage.setItem("token", "DumyTokenHere");
            // localStorage.setItem(registerObj.username, JSON.stringify(registerObj));
            // setLoading(false);
            // window.location.href = "/login";
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setRegisterObj({ ...registerObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center">
            <div className="card card-side card-bordered mx-auto w-full max-w-5xl shadow-xl h-[42rem]">
                <figure><img src="background_2.png" className="h-full" /></figure>
                <div className="card-body min-w-[50%] py-6 px-14 text-center">
                    <h1 className="text-5xl font-bold my-4 text-center">
                        <Logo />
                    </h1>

                    <form onSubmit={(e) => submitForm(e)}>
                    <h2 className=" card-title text-2xl font-semibold">
                            Register
                        </h2>
                        <div className="mb-2">
                            <InputText
                                defaultValue={registerObj.username}
                                updateType="username"
                                containerStyle="mt-1"
                                labelTitle="Username"
                                updateFormValue={updateFormValue}
                            />
                            <ErrorText styleClass="text-sm">
                                {errorUsername}
                            </ErrorText>

                            <InputText
                                defaultValue={registerObj.fullname}
                                updateType="fullname"
                                containerStyle="mt-1"
                                labelTitle="Fullname"
                                updateFormValue={updateFormValue}
                            />
                            <ErrorText styleClass="text-sm">
                                {errorFullname}
                            </ErrorText>

                            <InputText
                                defaultValue={registerObj.email}
                                updateType="email"
                                containerStyle="mt-1"
                                labelTitle="Email"
                                updateFormValue={updateFormValue}
                            />
                            <ErrorText styleClass="text-sm">
                                {errorEmail}
                            </ErrorText>

                            <InputText
                                defaultValue={registerObj.password}
                                type="password"
                                updateType="password"
                                containerStyle="mt-1 text-sm"
                                labelTitle="Password"
                                updateFormValue={updateFormValue}
                            />
                            <ErrorText styleClass="text-sm">
                                {errorPassword}
                            </ErrorText>
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
                                Register
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/login">
                            <span className="inline-block font-bold hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                    Login
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
