import React, { useEffect } from "react";
import checkAuth from "../../app/auth";
import ReadingPanel from "./components/ReadingPanel";
import SummaryPanel from "./components/SummaryPanel";
import ReadingTools from "./components/ReadingTools";
import Notes from "./components/Notes";

const token = checkAuth();

function ReadingPage() {
  	const [content, setContent] = React.useState("The NDS is a coherent set of standards and principles that combine neurodiversity and user experience design for Learning Management Systems.  ");
  	const [contentTitle, setContentTitle] = React.useState("NDS");

    // get content from read_text endpoint
    React.useEffect(() => {
        if (content !== "") return; // if content is not empty, do not fetch again
        fetch("/api/get_content", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                response.json().then((r) => {
                    console.log(r);
                    setContent(r["texts"][0]);
                    setContentTitle(r["title"]);
                    console.log(content);

                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        
    });

    return (
        <div className="h-fit w-full grid grid-cols-9 lg:gap-7 lg:px-3 gap-5">
            <audio autoPlay={true} loop id="audio">
                <source src={"/background-music.mp3"} type={"audio/mpeg"} />
            </audio>
            <div id="left-reading-tools" className="float-left col-span-2">
                <SummaryPanel content={content} />
                <Notes />
            </div>

            <ReadingPanel content={content} contentTitle={contentTitle} />

            <ReadingTools />

        </div>
    );
}

export default ReadingPage;
