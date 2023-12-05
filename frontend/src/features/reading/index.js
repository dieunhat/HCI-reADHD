import React, { useEffect } from "react";
import ReadingPanel from "./components/ReadingPanel";
import SummaryPanel from "./components/SummaryPanel";
import ReadingTools from "./components/ReadingTools";
import Notes from "./components/Notes";
import checkAuth from "../../app/auth";

import axios from 'axios';

const username = localStorage.getItem("username");

function ReadingPage() {
    const [content, setContent] = React.useState("");
    const [contentTitle, setContentTitle] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    // get content from read_text endpoint
    React.useEffect(() => {
        // if content is not empty, do not fetch again
        if (content !== "") {
            const localTitle = localStorage.getItem("contentTitle");
            if (localTitle !== null) {
                setContentTitle(localTitle);
            }
            return;
        }
        if (localStorage.getItem("content") !== null) {
            setContent(localStorage.getItem("content"));
            setContentTitle(localStorage.getItem("contentTitle"));
            return;
        }
        getContent();
    }, []);

    const getContent = () => {
        setIsLoading(true);
        var api = `/api/get_content`
        if (username !== null) {
            api += `?username=${username}`
        }
        fetch(`/api/get_content?username=${username}`, {
            method: "GET",
			headers: {
				'Content-Type': 'application/json',
			},
			// mode: 'no-cors'
        })
            .then((response) => {
                console.log("get content", response);
                response.json().then((r) => {
                    console.log(r);
                    setContent(r[0]["texts"][0]);
                    setContentTitle(r[0]["title"]);
                    console.log(content);

					// localStorage.setItem("content", content);
					// localStorage.setItem("contentTitle", contentTitle);

                    if('summary' in r[0] && r[0]['summary'] !== null) {
                        localStorage.setItem("summary", r[0]['summary']);
                    }

                    if ('notes' in r[0] && r[0]['notes'] !== null) {
                        localStorage.setItem("notes", r[0]['notes']);
                    }

                    console.log(localStorage);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                setIsLoading(false);
            });
    }

    return (
        <div className="h-fit w-full grid grid-cols-10 lg:gap-7 lg:px-3 gap-5">
            <audio autoPlay={true} loop id="audio">
                <source src={"/background-music.mp3"} type={"audio/mpeg"} />
            </audio>
            <div id="left-reading-tools" className="float-left col-span-3">
                <SummaryPanel content={content} />
                <Notes />
            </div>

            <ReadingPanel content={content} contentTitle={contentTitle} />

            <ReadingTools />
        </div>
    );
}

export default ReadingPage;
