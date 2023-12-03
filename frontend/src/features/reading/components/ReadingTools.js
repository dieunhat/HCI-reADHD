import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SpeakerWaveIcon from "@heroicons/react/24/outline/SpeakerWaveIcon";
import SpeakerXMarkIcon from "@heroicons/react/24/outline/SpeakerXMarkIcon";
import SummaryIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import NoteIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import UploadTextIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";

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
    return (
        <div className="w-full">
            <div
                className="join join-vertical h-max w-max float-right items-right bg-transparent
                         max-md:shadow-md md:shadow-lg my-5"
            >
                <button id="summary-button" className="join-item btn btn-info">
                    <div className="flex flex-row items-center gap-1 w-full">
                        <SummaryIcon className="w-6 h-6 lg:mr-2" />
                        <span className="max-lg:hidden">Summary</span>
                    </div>
                </button>
                <button
                    id="audio-button"
                    className="join-item btn btn-info"
                    onClick={handleAudioButtonClick}
                >
                    {isAudioPlaying ? (
                        <div className="flex flex-row items-center gap-1 w-full">
                            <SpeakerWaveIcon className="w-6 h-6 lg:mr-2" />
                            <span className="max-lg:hidden">Audio</span><span className="text-green-600 max-lg:hidden">On</span>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center gap-1 w-full">
                            <SpeakerXMarkIcon className="w-6 h-6 lg:mr-2" />
                            <span className="max-lg:hidden">Audio Off</span>
                        </div>
                    )}
                </button>
                <button id="addnote-button" className="btn btn-info join-item">
                    <div className="flex flex-row items-center gap-1 w-full">
                        <NoteIcon className="w-6 h-6 lg:mr-2" />
                        <span className="max-lg:hidden">Add Note</span>
                    </div>
                </button>
                {/* upload new text or file button -> redirect to welcome page */}
                <Link
                    to="/welcome"
                    className="w-full join-item"
                >
                    <button className="btn btn-info join-item">
                        <div className="flex flex-row items-center gap-1">
                        <UploadTextIcon className="w-6 h-6 lg:mr-2" />
                        <span className="max-lg:hidden">Upload New Text</span>
                    </div>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ReadingTools;
