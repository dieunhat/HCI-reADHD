import Title from "../../../components/Typography/Title";
import { Link } from "react-router-dom";
import React from "react";
import { bionicReading } from "bionic-reading";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import PauseIcon from "@heroicons/react/24/outline/PauseIcon";

function ReadingPanel({ content, contentTitle }) {
    const [isBionicMode, setIsBionicMode] = React.useState(false);
    const [currentText, setCurrentText] = React.useState(content);
    const [isAudioPlaying, setIsAudioPlaying] = React.useState();

    // title of document: editable
    React.useEffect(() => {
        //     get title of document
        const title = document
            .getElementById("doc")
            .querySelector(".card-title .title-text");
        //     make title editable
        title.contentEditable = true;
        //     add event listener to save title on blur
        title.addEventListener("blur", () => {
            console.log("Title changed");
        });

        // if audio is playing, set isAudioPlaying to true
        const audio = document.getElementById("audio");
        audio.addEventListener("play", () => {
            setIsAudioPlaying(true);
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
            setCurrentText(content);
            setIsBionicMode(false);
        }
    };

    // play or pause audio
    const handleAudioButtonClick = () => {
        const audio = document.getElementById("audio");
        if (isAudioPlaying) {
            audio.pause();
            setIsAudioPlaying(false);
        } else {
            audio.play();
            setIsAudioPlaying(true);
        }
    };

    return (
        <>
            <div
                id={"doc"}
                className={
                    "card w-full h- p-4 bg-base-100 max-md:shadow-md md:shadow-lg my-5"
                }
            >
                <Title styleClass={"inline-block card-title px-1"}>
                    <p className={"title-text inline-block text-success-content"}>{contentTitle}</p>

                    <div className="flex flex-row float-right w-fit gap-3 items-start">
                        <button id="audio-button" className="btn btn-sm btn-circle" 
                                onClick={handleAudioButtonClick}>
                            {isAudioPlaying ? (
                                <PauseIcon className="w-6 h-6" />
                            ) : (
                                <PlayIcon className="w-6 h-6" />
                            )}
                            <audio autoPlay={true} loop id="audio">
                                <source src={"/background-music.mp3"} type={"audio/mpeg"}/>
                            </audio>
                        </button>
                        <button
                            className={
                                "btn btn-sm btn-primary" +
                                (isBionicMode
                                    ? " btn-outline text-primary"
                                    : " text-info")
                            }
                            onClick={handleBionicButtonClick}
                        >
                            Bionic Mode
                        </button>
                    </div>
                </Title>
                <div className="divider mt-2"></div>
                <div className="h-full w-full pb-6 bg-base-100">
                    <div className="card-body text-justify w-full h-[27rem] py-1 overflow-y-auto scroll-smooth scroll-p-1">
                        <article id="content" className="prose max-w-[48rem]">
                            <div dangerouslySetInnerHTML={{ __html: currentText !== "" ? currentText : content }} />
                        </article>
                    </div>
                    {/* upload new text or file button -> redirect to welcome page */}
                    <Link
                        to="/welcome"
                        className="w-full flex flex-row align-center mt-5"
                    >
                        <button className="btn btn-success-content text-success-content border-success-content bg-transparent hover:btn-success hover:text-base-100 btn-sm w-64 mx-auto">
                            Upload New Text
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ReadingPanel;
