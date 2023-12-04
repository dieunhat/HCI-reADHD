import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SpeakerWaveIcon from "@heroicons/react/24/outline/SpeakerWaveIcon";
import SpeakerXMarkIcon from "@heroicons/react/24/outline/SpeakerXMarkIcon";
import SummaryIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import NoteIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import UploadTextIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
// import Highlighter from "./Highlight";
// import ClearHighlight from "./ClearHighlight";

function ReadingTools() {
    const [isAudioPlaying, setIsAudioPlaying] = React.useState();

    useEffect(() => {
        const audio = document.getElementById("audio");
        audio.addEventListener("play", () => {
            setIsAudioPlaying(true);
        });
    });
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

    const textHighlight = () => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        range.deleteContents();
        const span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        span.appendChild(document.createTextNode(selectedText));
        range.insertNode(span);
    };

    const clearHighlight = () => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        range.deleteContents();
        const span = document.createElement("span");
        span.style.backgroundColor = "transparent";
        span.appendChild(document.createTextNode(selectedText));
        range.insertNode(span);
    };

    return (
        <div className="w-full col-span-2">
            <div
                className="join join-vertical h-max w-max float-right items-right bg-transparent
                         max-md:shadow-md md:shadow-lg my-5"
            >
                <button
                    id="summary-button"
                    className="join-item btn btn-info tooltip tooltip-bottom tooltip-primary hover:z-10"
                    data-tip={"Click here to summarize the text"}
                >
                    <div className="flex flex-row items-center gap-1 w-full">
                        <SummaryIcon className="w-6 h-6 lg:mr-2" />
                        <span className="max-lg:hidden">Summary</span>
                    </div>
                </button>
                <button
                    id="audio-button"
                    className="join-item btn btn-info tooltip tooltip-bottom tooltip-primary hover:z-10"
                    onClick={handleAudioButtonClick}
                    data-tip={
                        isAudioPlaying
                            ? "Click here to turn audio off"
                            : "Click here to turn audio on"
                    }
                >
                    {isAudioPlaying ? (
                        <div className="flex flex-row items-center gap-1 w-full">
                            <SpeakerWaveIcon className="w-6 h-6 lg:mr-2" />
                            <span className="max-lg:hidden">Audio</span>
                            <span className="text-green-600 max-lg:hidden">
                                On
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center gap-1 w-full">
                            <SpeakerXMarkIcon className="w-6 h-6 lg:mr-2" />
                            <span className="max-lg:hidden">Audio Off</span>
                        </div>
                    )}
                </button>
                <button
                    id="highlight"
                    onClick={textHighlight}
                    className="btn btn-info join-item tooltip tooltip-bottom tooltip-primary hover:z-10"
                    data-tip="Click here to highlight text"
                >
                    <div className="flex flex-row items-center gap-1 w-full">
                        <div>
                            <svg className="w-6 h-6 lg:mr-2" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.2585648,2.00438474 C20.6382605,2.00472706 20.9518016,2.28716326 21.0011348,2.65328337 L21.0078899,2.75506004 L21.0038407,7.25276883 C21.0009137,8.40908568 20.1270954,9.36072944 19.0029371,9.48671858 L19.0024932,11.7464847 C19.0024932,12.9373487 18.0773316,13.9121296 16.906542,13.9912939 L16.7524932,13.9964847 L16.501,13.9963847 L16.5017549,16.7881212 C16.5017549,17.6030744 16.0616895,18.349347 15.3600767,18.7462439 L15.2057929,18.8258433 L8.57108142,21.9321389 C8.10484975,22.1504232 7.57411944,21.8450614 7.50959937,21.3535767 L7.50306874,21.2528982 L7.503,13.9963847 L7.25,13.9964847 C6.05913601,13.9964847 5.08435508,13.0713231 5.00519081,11.9005335 L5,11.7464847 L5.00043957,9.4871861 C3.92882124,9.36893736 3.08392302,8.49812196 3.0058865,7.41488149 L3,7.25086975 L3,2.75438506 C3,2.3401715 3.33578644,2.00438474 3.75,2.00438474 C4.12969577,2.00438474 4.44349096,2.28653894 4.49315338,2.6526145 L4.5,2.75438506 L4.5,7.25086975 C4.5,7.63056552 4.78215388,7.94436071 5.14822944,7.99402313 L5.25,8.00086975 L18.7512697,8.00087075 C19.1315998,8.00025031 19.4461483,7.71759877 19.4967392,7.3518545 L19.5038434,7.25019537 L19.5078902,2.75371008 C19.508263,2.33949668 19.8443515,2.00401258 20.2585648,2.00438474 Z M15.001,13.9963847 L9.003,13.9963847 L9.00306874,20.0736262 L14.5697676,17.4673619 C14.8004131,17.3593763 14.9581692,17.1431606 14.9940044,16.89581 L15.0017549,16.7881212 L15.001,13.9963847 Z M17.502,9.50038474 L6.5,9.50038474 L6.5,11.7464847 C6.5,12.1261805 6.78215388,12.4399757 7.14822944,12.4896381 L7.25,12.4964847 L16.7524932,12.4964847 C17.1321889,12.4964847 17.4459841,12.2143308 17.4956465,11.8482552 L17.5024932,11.7464847 L17.502,9.50038474 Z"
                                ></path>
                            </svg>
                        </div>
                        <span className="max-lg:hidden">Highlight</span>
                    </div>
                </button>
                <button
                    id="removehighlight"
                    onClick={clearHighlight}
                    className="btn btn-info join-item tooltip tooltip-bottom tooltip-primary hover:z-10"
                    data-tip="Click here to clear highlight"
                >
                    <div className="flex flex-row items-center gap-1 w-full">
                        <div>
                            <svg className="w-6 h-6 lg:mr-2" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.50506 11.4096L6.03539 11.9399L5.50506 11.4096ZM3 14.9522H2.25H3ZM9.04776 21V21.75V21ZM11.4096 5.50506L10.8792 4.97473L11.4096 5.50506ZM13.241 17.8444C13.5339 18.1373 14.0088 18.1373 14.3017 17.8444C14.5946 17.5515 14.5946 17.0766 14.3017 16.7837L13.241 17.8444ZM7.21629 9.69832C6.9234 9.40543 6.44852 9.40543 6.15563 9.69832C5.86274 9.99122 5.86274 10.4661 6.15563 10.759L7.21629 9.69832ZM17.9646 12.0601L12.0601 17.9646L13.1208 19.0253L19.0253 13.1208L17.9646 12.0601ZM6.03539 11.9399L11.9399 6.03539L10.8792 4.97473L4.97473 10.8792L6.03539 11.9399ZM6.03539 17.9646C5.18538 17.1146 4.60235 16.5293 4.22253 16.0315C3.85592 15.551 3.75 15.2411 3.75 14.9522H2.25C2.25 15.701 2.56159 16.3274 3.03 16.9414C3.48521 17.538 4.1547 18.2052 4.97473 19.0253L6.03539 17.9646ZM4.97473 10.8792C4.1547 11.6993 3.48521 12.3665 3.03 12.9631C2.56159 13.577 2.25 14.2035 2.25 14.9522H3.75C3.75 14.6633 3.85592 14.3535 4.22253 13.873C4.60235 13.3752 5.18538 12.7899 6.03539 11.9399L4.97473 10.8792ZM12.0601 17.9646C11.2101 18.8146 10.6248 19.3977 10.127 19.7775C9.64651 20.1441 9.33665 20.25 9.04776 20.25V21.75C9.79649 21.75 10.423 21.4384 11.0369 20.97C11.6335 20.5148 12.3008 19.8453 13.1208 19.0253L12.0601 17.9646ZM4.97473 19.0253C5.79476 19.8453 6.46201 20.5148 7.05863 20.97C7.67256 21.4384 8.29902 21.75 9.04776 21.75V20.25C8.75886 20.25 8.449 20.1441 7.9685 19.7775C7.47069 19.3977 6.88541 18.8146 6.03539 17.9646L4.97473 19.0253ZM17.9646 6.03539C18.8146 6.88541 19.3977 7.47069 19.7775 7.9685C20.1441 8.449 20.25 8.75886 20.25 9.04776H21.75C21.75 8.29902 21.4384 7.67256 20.97 7.05863C20.5148 6.46201 19.8453 5.79476 19.0253 4.97473L17.9646 6.03539ZM19.0253 13.1208C19.8453 12.3008 20.5148 11.6335 20.97 11.0369C21.4384 10.423 21.75 9.79649 21.75 9.04776H20.25C20.25 9.33665 20.1441 9.64651 19.7775 10.127C19.3977 10.6248 18.8146 11.2101 17.9646 12.0601L19.0253 13.1208ZM19.0253 4.97473C18.2052 4.1547 17.538 3.48521 16.9414 3.03C16.3274 2.56159 15.701 2.25 14.9522 2.25V3.75C15.2411 3.75 15.551 3.85592 16.0315 4.22253C16.5293 4.60235 17.1146 5.18538 17.9646 6.03539L19.0253 4.97473ZM11.9399 6.03539C12.7899 5.18538 13.3752 4.60235 13.873 4.22253C14.3535 3.85592 14.6633 3.75 14.9522 3.75V2.25C14.2035 2.25 13.577 2.56159 12.9631 3.03C12.3665 3.48521 11.6993 4.1547 10.8792 4.97473L11.9399 6.03539ZM14.3017 16.7837L7.21629 9.69832L6.15563 10.759L13.241 17.8444L14.3017 16.7837Z"/>
                            </svg>
                        </div>
                        <span className="max-lg:hidden">Clear Highlight</span>
                    </div>
                </button>

                <button
                    id="add-note"
                    className="btn btn-info join-item tooltip tooltip-bottom tooltip-primary hover:z-10"
                    data-tip="Click here to add a note"
                >
                    <div className="flex flex-row items-center gap-1 w-full">
                        <NoteIcon className="w-6 h-6 lg:mr-2" />
                        <span className="max-lg:hidden">Add Note</span>
                    </div>
                </button>
                {/* upload new text or file button -> redirect to welcome page */}
                <Link to="/welcome" className="w-full join-item">
                    <button
                        className="btn btn-info join-item tooltip tooltip-bottom tooltip-primary hover:z-10"
                        data-tip="Click here to upload new text"
                    >
                        <div className="flex flex-row items-center gap-1">
                            <UploadTextIcon className="w-6 h-6 lg:mr-2" />
                            <span className="max-lg:hidden">
                                Upload New Text
                            </span>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ReadingTools;
