import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import Logo from "../../components/Logo";

function ForgotPassword() {
    const INITIAL_USER_OBJ = {
        email: "",
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [linkSent, setLinkSent] = useState(false);
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (userObj.email.trim() === "")
            return setErrorMessage("Email is required! (use any value)");
        else {
            setLoading(true);
            // Call API to send password reset link
            setLoading(false);
            setLinkSent(true);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setUserObj({ ...userObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center">
            <div className="card card-side card-bordered mx-auto w-full max-w-5xl shadow-xl h-[42rem]">
                <figure>
                    <img src="background_1.png" className="h-full" />
                </figure>
                <div className="py-24 px-10 w-[50%] card-body">
                    <h2 className="text-2xl font-semibold mb-2 text-center">
                        Forgot Password
                    </h2>

                    {linkSent && (
                        <>
                            <div className="text-center mt-8">
                                <CheckCircleIcon className="inline-block w-32 text-success" />
                            </div>
                            <p className="my-4 text-xl font-bold text-center">
                                Link Sent
                            </p>
                            <p className="mt-4 mb-8 font-semibold text-center">
                                Check your email to reset password
                            </p>
                            <div className="text-center mt-4">
                                <Link to="/login">
                                    <button className="btn btn-block btn-primary ">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}

                    {!linkSent && (
                        <>
                            <form onSubmit={(e) => submitForm(e)}>
                                <p className="my-8 font-semibold text-center">
                                    We will send password reset link on your
                                    email
                                </p>
                                <div className="mb-4">
                                    <InputText
                                        type="email"
                                        defaultValue={userObj.email}
                                        updateType="email"
                                        containerStyle="mt-4"
                                        labelTitle="Email"
                                        updateFormValue={updateFormValue}
                                    />
                                </div>

                                <ErrorText styleClass="mt-12">
                                    {errorMessage}
                                </ErrorText>
                                <div className="w-full text-center">
                                    <button
                                        type="submit"
                                        className={
                                            "btn mt-1 btn-wide btn-primary text-white" +
                                            (loading ? " loading" : "")
                                        }
                                    >
                                        Send Reset Link
                                    </button>
                                </div>
                                <div className="text-center mt-4">
                                    Don't have an account yet?{" "}
                                    <Link to="/register">
                                        <button className="inline-block font-bold hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
