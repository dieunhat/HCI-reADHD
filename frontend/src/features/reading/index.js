import TitleCard from "../../components/Cards/TitleCard";
import React from "react";
import { Link } from "react-router-dom";
import checkAuth from "../../app/auth";
import ReadingPanel from "./components/ReadingPanel";
import SummaryPanel from "./components/SummaryPanel";
import ReadingTools from "./components/ReadingTools";
import Notes from "./components/Notes";

const token = checkAuth();

function ReadingPage() {
    const [content, setContent] = React.useState("");
    const [contentTitle, setContentTitle] = React.useState("");
    let initialNotes = [];
    const [notes, setNotes] = React.useState(initialNotes); // array of notes

    const addNote = () => {
        let selection = document.getSelection();
        let range = selection.getRangeAt(0);
        let selectedText = range.toString();
        console.log(selectedText);
        // if (selectedText === "") return;
        // if (notes.includes(selectedText)) return;
        setNotes([...notes, { text: selectedText, range: range }]);
        console.log(notes);
    };

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

    window.onload = function () {
      const addNoteButton = document.getElementById("addnote-button");
      addNoteButton.addEventListener("click", addNote);
    };

    return (
        <div className="h-fit w-full grid grid-cols-5 lg:gap- lg:px-3 gap-5">
            <audio autoPlay={true} loop id="audio">
                <source src={"/background-music.mp3"} type={"audio/mpeg"} />
            </audio>
            <div id="left-reading-tools" className="float-left">
                <SummaryPanel content={content} />
                <Notes notes={notes} />
            </div>

            <ReadingPanel content={content} contentTitle={contentTitle} />

            <ReadingTools />

        </div>
    );
}

export default ReadingPage;
