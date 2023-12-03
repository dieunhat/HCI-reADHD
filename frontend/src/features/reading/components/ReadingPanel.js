import Title from "../../../components/Typography/Title";
import React from "react";
import { bionicReading } from "bionic-reading";

function ReadingPanel({ content, contentTitle }) {
    const [isBionicMode, setIsBionicMode] = React.useState(false);
    const [currentText, setCurrentText] = React.useState(content);

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



    return (
        <>
            <div
                id={"doc"}
                className={
                    "card w-full h-max col-span-3 p-4 bg-base-100 max-md:shadow-md md:shadow-lg my-5"
                }
            >
                
                <Title styleClass={"inline-block card-title px-6 items-center"}>
                    <p id='doc-title' className={"title-text inline-block text-success-content"}>{contentTitle}</p>

                    <div className="flex flex-row float-right w-fit gap-3 items-center">
                        
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
                    </div>
                </Title>
                <div className="divider mt-2"></div>
                <div className="h-full w-full pb-6 bg-base-100">
                    <div className="card-body text-justify w-full h-max py-1">
                        <article id="content" className="prose max-w-[48rem]">
                            <div dangerouslySetInnerHTML={{ __html: currentText !== "" ? currentText : content.replace(/\n/g, "<br>") }} />
                        </article>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default ReadingPanel;
