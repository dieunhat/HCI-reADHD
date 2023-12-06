import Title from "../../../components/Typography/Title";
import React from "react";
import { bionicReading } from "bionic-reading";
import IncreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassPlusIcon";
import DecreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassMinusIcon";

function ReadingPanel({ content, contentTitle }) {
    const [isBionicMode, setIsBionicMode] = React.useState(false);
    const [currentText, setCurrentText] = React.useState(content);
    const [isDocSaved, setIsDocSaved] = React.useState(
        localStorage.getItem("isDocSaved") === true
    );
    const [isLoading, setIsLoading] = React.useState(false);

    // title of document: editable
    React.useEffect(() => {
        //     get title of document
        const title = document.getElementById("doc-title");
        //     make title editable
        title.contentEditable = true;
        //     add event listener to save title on blur
        title.addEventListener("blur", () => {
            console.log("Title changed");
            console.log(title.innerText);
            contentTitle = title.innerText;
            localStorage.setItem("contentTitle", contentTitle);
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
            doc_text.style.fontSize = size - 2 + "px";
        }
    };

    const increaseDocumentTextSize = () => {
        const doc = document.getElementById("content");
        const doc_text = doc.childNodes[0];
        const size = parseInt(doc_text.style.fontSize);
        if (size < 20) {
            doc_text.style.fontSize = size + 2 + "px";
        }
    };

    return (
        <>
            <div
                id={"doc"}
                className={
                    "card w-full h-max col-span-5 p-4 bg-base-100 max-md:shadow-md md:shadow-lg my-5"
                }
            >
                <Title
                    styleClass={
                        "navbar min-h-[2rem] card-title m-0 py-0 items-center w-full"
                    }
                >
                    <p
                        id="doc-title"
                        className={
                            "title-text navbar-start text-success-content text-justify min-w-[12rem]"
                        }
                    >
                        {contentTitle}
                    </p>

                    <div className="navbar-end flex flex-row  w-full gap-3">

                        <div className="form-control self-center">
                            <label className="label flex gap-1 p-0">
                                <span className="label-text">Bionic</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-success cursor-pointer"
                                    onClick={handleBionicButtonClick}
                                />
                                <span className={"label-text"}>
                                    {isBionicMode ? "ON" : "OFF"}
                                </span>
                            </label>
                        </div>
                        <div className="flex flex-row gap-0.5 items-center h-full">
                            <button
                                onClick={decreaseDocumentTextSize}
                                data-tip="Decrease font size"
                                className="btn btn-sm btn-info btn-circle tooltip tooltip-top tooltip-info"
                            >
                                <DecreaseFontSizeIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={increaseDocumentTextSize}
                                data-tip={"Increase font size"}
                                className="btn btn-sm btn-info btn-circle tooltip tooltip-top tooltip-info"
                            >
                                <IncreaseFontSizeIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </Title>
                <div className="divider mt-2"></div>
                <div className="h-full w-full pb-6 bg-base-100">
                    <div className="card-body text-justify w-full h-max py-1">
                        <article id="content" className="prose max-w-[48rem]">
                            <div
                                className="w-full xl:min-w-[36rem] mx-auto"
                                style={{ fontSize: "16px" }}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        currentText !== ""
                                            ? currentText
                                            : content.replace(/\n/g, "<br>"),
                                }}
                            />
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReadingPanel;