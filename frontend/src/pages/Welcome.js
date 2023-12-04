import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../features/common/headerSlice";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../containers/Header";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import checkAuth from "../app/auth";

let username = "";
const token = checkAuth();
if (token) {
    username = JSON.parse(token)["username"];
}

function WelcomePage() {
    const redirect = useNavigate();

    const dispatch = useDispatch();
    const [inputText, setInputText] = useState();
    const [inputFile, setInputFile] = useState();

    const [currentButtonAddText, setCurrentButtonAddText] = useState(true);

    useEffect(() => {
        dispatch(
            setPageTitle({
                title: (
                    <div>
                        Welcome to <Logo />
                    </div>
                ),
            })
        );
    }, []);

    const handleAddText = () => {
        setCurrentButtonAddText(true);
    };

    const handleUploadText = () => {
        setCurrentButtonAddText(false);
    };

    const updateInputText = ({ updateType, value }) => {
        setInputText(value);
        console.log(inputText);
    };

    const updateInputFile = ({ updateType, value }) => {
        setInputFile(value);
        console.log(inputFile);
    };

    // if read now button is clicked, check if currentButtonAddText is true or false
    // if true, then send inputText to backend
    // if false, then send inputFile to backend
    // then redirect to reading page
    const handleReadNow = () => {
        if (currentButtonAddText) {
            // send inputText to backend
            console.log("input text is: " + inputText);
            fetch("/api/upload_text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: inputText,
                    username: username,
                }),
            })
                .then((response) => {
                    console.log(response);
                    response.json().then((r) => {
                        console.log(r);
                        console.log("redirecting to reading page");
                        redirect("/app/reading");
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            // send inputFile to backend
            console.log("input file is: " + inputFile.name);
            const formData = new FormData();
            formData.append("file", inputFile);
            formData.append("filename", inputFile.name);
            formData.append("username", username);
            console.log(formData);
            fetch("/api/upload_file", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/formdata",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                },
                body: formData,
                mode: "no-cors",
            })
                .then((response) => {
                    console.log(response);
                    response.json().then((r) => {
                        console.log(r);
                        console.log("redirecting to reading page");
                        redirect("/app/reading");
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    return (
        <>
            <div className="drawer-content flex flex-col bg-base-200 h-screen">
                <Header />
                <main className="flex-1 overflow-y-auto px-5 py-2 max-lg:w-screen w-fit max-w-screen-2xl min-w-lg mx-auto">
                    <div className="w-md mt-3 bg-base-200">
                        {/* Content */}
                        <div className="flex flex-col gap-1 px-5">
                            {/*<TemplatePointers />*/}
                            <div className="flex flex-col">
                                <h1 className="mb-2 text-6xl">
                                    <Logo />
                                </h1>
                                <p>A reading support helpkit for ADHD users.</p>
                            </div>
                            <div className="divider mb-2"></div>
                            <div className={"w-full inline-block"}>
                                <div
                                    role="tablist"
                                    className="tabs tabs-lifted mb-4 w-full"
                                >
                                    <input
                                        type="radio"
                                        name="get_text_tabs"
                                        role="tab"
                                        className="tab min-w-[8rem] py-2"
                                        aria-label="Add Text"
                                        checked={currentButtonAddText}
                                        onChange={handleAddText}
                                    />
                                    <div
                                        role="tabpanel"
                                        className="tab-content min-w-[42rem] bg-base-100 border-base-300 rounded-box p-6"
                                    >
                                        <TextareaAutosize
                                            className={
                                                "textarea w-full max-h-56 bg-info border-2 my-2"
                                            }
                                            onChange={(e) =>
                                                updateInputText({
                                                    updateType: "inputText",
                                                    value: e.target.value,
                                                })
                                            }
                                            placeholder={
                                                "You can enter or paste your text here."
                                            }
                                        />
                                    </div>

                                    <input
                                        type="radio"
                                        name="get_text_tabs"
                                        role="tab"
                                        className="tab min-w-[8rem] py-2"
                                        aria-label="Upload Text"
                                        checked={!currentButtonAddText}
                                        onChange={handleUploadText}
                                    />
                                    <div
                                        role="tabpanel"
                                        className="tab-content min-w-[42rem] bg-base-100 border-base-300 rounded-box p-6"
                                    >
                                        <div
                                            className={
                                                "w-full px-20 hero my-3 tooltip tooltip-success hover:tooltip-open tooltip-bottom"
                                            }
                                            data-tip="Accept .docx, .txt, .pdf"
                                        >
                                            <input
                                                name="file"
                                                type="file"
                                                className="file-input file-input-success w-96 mx-auto"
                                                accept={
                                                    ".docx," +
                                                    "application/pdf," +
                                                    ".txt"
                                                }
                                                onChange={(e) =>
                                                    updateInputFile({
                                                        updateType: "inputFile",
                                                        value: e.target
                                                            .files[0],
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleReadNow}
                                    className={
                                        inputFile !== "" || inputText !== ""
                                            ? "btn btn-primary float-right"
                                            : "btn btn-disabled float-right"
                                    }
                                >
                                    Read Now
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <div className="divider mt-1 mb-0"></div>
                <footer className="footer items-center py-2 px-5 w-screen">
                    <aside className="items-center grid-flow-col max-lg:hidden">
                        <img
                            src={"/neg_logo.svg"}
                            alt="logo"
                            className="w-8 h-8"
                        />
                        <p>
                            Human Computer Interaction project by{" "}
                            <span className="font-bold text-primary">
                                Group 4
                            </span>
                        </p>
                    </aside>
                    <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end shadow-none">
                        <Link
                            to={
                                "https://github.com/dieunhat/HCI-Project-ADHD-Help-Kit"
                            }
                            target="blank"
                            className="btn btn-sm flex flex-row items-center gap-2 shadow-none"
                        >
                            <div className="text-lg">
                                <Logo />
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={"currentColor"}
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </Link>
                    </nav>
                </footer>
            </div>
        </>
    );
}

export default WelcomePage;
