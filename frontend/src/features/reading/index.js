import React, { useEffect } from "react";
import ReadingPanel from "./components/ReadingPanel";
import SummaryPanel from "./components/SummaryPanel";
import ReadingTools from "./components/ReadingTools";
import Notes from "./components/Notes";
import checkAuth from "../../app/auth";

import axios from 'axios';

const token = checkAuth();
const username = localStorage.getItem("username");


function ReadingPage() {
    const [content, setContent] = React.useState("");
    const [contentTitle, setContentTitle] = React.useState("");

    // get content from read_text endpoint
    React.useEffect(() => {
        if (content !== "") return; // if content is not empty, do not fetch again
		if (localStorage.getItem("content") !== null) {
			setContent(JSON.parse(localStorage.getItem("content")));
			setContentTitle(JSON.parse(localStorage.getItem("contentTitle")));
			return;
		}
		// const formData = new FormData();
        // formData.append("username", username);
		fetch(`/api/get_content?username=${encodeURIComponent(username)}`, {
            method: "GET",
			headers: {
				// 'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*"
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

					localStorage.setItem("content", JSON.stringify(r[0]["texts"][0]));
					localStorage.setItem("contentTitle", JSON.stringify(r[0]["title"]));
                    localStorage.setItem("file_id", JSON.stringify(r[0]["file_id"]));

                    console.log(localStorage);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
		// axios.get("/api/get_content", {
		// 	json: {'username': username},
		// 	headers: {'Content-Type': 'application/json'}
		// }).then((response) => {
		// 	console.log(response);
		// 	setContent(response.data["texts"][0]);
		// 	setContentTitle(response.data["title"]);
		// 	console.log(content);
		// }
		// ).catch((error) => {
		// 	console.error("Error:", error);
		// });
    });

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
