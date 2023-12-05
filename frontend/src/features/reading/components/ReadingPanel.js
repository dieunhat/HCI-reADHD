import Title from "../../../components/Typography/Title";
import React from "react";
import { bionicReading } from "bionic-reading";
import IncreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassPlusIcon";
import DecreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassMinusIcon";

if (localStorage.getItem('username') !== null && localStorage.getItem('username') !== undefined) {
    var username = localStorage.getItem('username');
} else {
    var username = "";
}

function ReadingPanel({ content, contentTitle }) {
    const [isBionicMode, setIsBionicMode] = React.useState(false);
    const [currentText, setCurrentText] = React.useState(content);
    const [isSavedSuccessfully, setIsSavedSuccessfully] = React.useState(false);

    // title of document: editable
    React.useEffect(() => {
        //     get title of document
        const title = document.getElementById("doc-title");
        //     make title editable
        title.contentEditable = true;
        //     add event listener to save title on blur
        title.addEventListener("blur", () => {
            console.log("Title changed");
        });
    });

    React.useEffect(() => {
        if (localStorage.getItem('file_id') !== null && localStorage.getItem('file_id') !== undefined) {
            const file_id = localStorage.getItem('file_id');
        } else {
            console.log("File ID not found");
            console.log(localStorage);
            return;
        }

        if (username === "") {
            console.log("Username not found");
            return;
        }
        console.log("Username: ", username);
        const saveDocButton = document.getElementById("save-doc");
        if (saveDocButton === null) {
            console.log("Save button not found");
            return;
        }
        saveDocButton.addEventListener("click", () => {
            console.log("Save button clicked");
            const doc_title = document.getElementById("doc-title").innerText;
            const doc_content = document.getElementById("content").innerText;
            console.log(doc_title);
            console.log(doc_content);

            //     send request to backend to save document
            fetch('/api/save_file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    title: doc_title,
                    content: doc_content,
                    file_id: localStorage.getItem('file_id')
                })
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setIsSavedSuccessfully(true);
                    saveDocButton.childNodes[0].childNodes[1].innerText = "Document Saved";
                    saveDocButton.childNodes[0].childNodes[0].classList.add("text-success-content");
                    saveDocButton.childNodes[0].childNodes[1].classList.add("text-success-content");
                    setTimeout(() => {
                        setIsSavedSuccessfully(false);
                        saveDocButton.childNodes[0].childNodes[1].innerText = "Save Document";
                        saveDocButton.childNodes[0].childNodes[0].classList.remove("text-success-content");
                        saveDocButton.childNodes[0].childNodes[1].classList.remove("text-success-content");
                    }, 2500);
                }
                response.json().then((r) => {
                    console.log(r);
                    localStorage.setItem("file_id", JSON.stringify(r["file_id"]));
                });
            }).catch((error) => {
                console.error("Error:", error);
            });
        });
    });

    // switch to bionic reading mode if bionic mode is clicked
    const handleBionicButtonClick = () => {
        console.log("Bionic Mode button clicked");
        if (!isBionicMode) {
            const bionic_text = bionicReading(content, {
                highlightTag: "strong",
            });

            console.log(bionic_text);
            setCurrentText(bionic_text);
            setIsBionicMode(true);
        } else {
            setCurrentText(content.replace(/\n/g, "<br>"));
            setIsBionicMode(false);
        }
    };

    const decreaseDocumentTextSize = () => {
        const doc = document.getElementById("content");
        const doc_text = doc.childNodes[0];
        const size = parseInt(doc_text.style.fontSize);
        if (size > 12) {
            doc_text.style.fontSize = (size - 2) + "px";
        }
    }

    const increaseDocumentTextSize = () => {
        const doc = document.getElementById("content");
        const doc_text = doc.childNodes[0];
        const size = parseInt(doc_text.style.fontSize);
        if (size < 20) {
            doc_text.style.fontSize = (size + 2) + "px";
        }
    }



    return (
        <>
            <div
                id={"doc"}
                className={
                    "card w-full h-max col-span-5 p-4 bg-base-100 max-md:shadow-md md:shadow-lg my-5"
                }
            >
                
                <Title styleClass={"navbar min-h-[2rem] card-title m-0 py-0 items-center w-full"}>
                    <p id='doc-title' className={"title-text navbar-start text-success-content"}>{contentTitle}</p>

                    <div className="navbar-end flex flex-row  w-full gap-3">
                        
                        {/* <button
                            className={
                            "btn btn-sm btn-primary" +
                            (isBionicMode
                            ? " btn-outline text-primary"
                            : " text-info")
                            }
                            onClick={handleBionicButtonClick}
                        >
                            Bionic Mode
                        </button> */}
                        <div className="form-control self-center">
                            <label className="label flex gap-1 p-0">
                                <span className="label-text">Bionic</span>
                                <input type="checkbox" className="toggle toggle-success cursor-pointer" 
                                onClick={handleBionicButtonClick}/>
                                <span className={"label-text"}>
                                    {isBionicMode ? "ON" : "OFF"}
                                </span>
                            </label>
                        </div>
                        <div className="flex flex-row gap-0.5 items-center h-full">
                            <button onClick={decreaseDocumentTextSize} 
                            data-tip="Decrease font size"
                            className="tooltip tooltip-top tooltip-info">
                                <DecreaseFontSizeIcon className="w-6 h-6" />
                            </button>
                            <button onClick={increaseDocumentTextSize}
                            data-tip={"Increase font size"}
                            className="tooltip tooltip-top tooltip-info">
                                <IncreaseFontSizeIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </Title>
                <div className="divider mt-2"></div>
                <div className="h-full w-full pb-6 bg-base-100">
                    <div className="card-body text-justify w-full h-max py-1">
                        <article id="content" className="prose max-w-[48rm]">
                            <div className="w-full min-w-[38rem]" style={{fontSize : '16px'}}
                            dangerouslySetInnerHTML={{ __html: currentText !== "" ? currentText : content.replace(/\n/g, "<br>") }} />
                        </article>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default ReadingPanel;
