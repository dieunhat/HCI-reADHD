import { React, useState, useEffect } from "react";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

var temp = [];
var tempLocations = [];
var tempComments = [];

if (localStorage.getItem("notes") !== null) {
    const tempNotes = JSON.parse(localStorage.getItem("notes"));
    console.log("local notes", tempNotes);
    for (var i = 0; i < tempNotes.length; i++) {
        temp.push(tempNotes[i]["note"]);
        tempLocations.push(tempNotes[i]["location"]);
        tempComments.push(tempNotes[i]["comment"]);
    }
}

function Notes() {
    const [notes, setNotes] = useState(temp); // array of notes
    const [locations, setLocations] = useState(tempLocations); // array of locations
    const [comments, setComments] = useState(tempComments); // array of comments

    useEffect(() => {
        const addNoteButton = document.getElementById("add-note");
        addNoteButton.addEventListener("click", addNote);
        return () => {
            addNoteButton.removeEventListener("click", addNote);
        };
    }, []);

    const addNote = () => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (notes.includes(selectedText)) {
            alert("You have already added this note.");
            return;
        }

        setNotes((notes) => [...notes, selectedText]);
        setLocations((locations) => [...locations, [range.startOffset]]);
        setComments((comments) => [...comments, ""]);

        localStorage.setItem("isDocSaved", false);

        // saveNotes();
    };

    const deleteNote = (index) => {
        console.log("delete at index", index);
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        console.log(notes);

        const updatedComments = [...comments];
        console.log(updatedComments[index]);
        updatedComments.splice(index, 1);
        setComments(updatedComments);

        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);

        console.log("delete");

        localStorage.setItem("isDocSaved", false);

        // saveNotes();
    };

    useEffect(() => {
        if (notes.length === 0) return;
        const tempNotes = [];
        for (var i = 0; i < notes.length; i++) {
            var temp = {
                note: notes[i],
                location: locations[i],
                comment: comments[i],
            };
            tempNotes.push(temp);
        }
        console.log("temp notes", tempNotes);
        console.log("saving notes");
        // localStorage.removeItem("notes");
        if (tempNotes.length > 0) {
            localStorage.setItem("notes", JSON.stringify(tempNotes));
        } else {
            localStorage.setItem("notes", null);
        }
        console.log(localStorage);
    });

    return (
        <div className="collapse collapse-arrow float-left w-full lg:w-[90%] max-w-full h-max bg-base-100 max-md:shadow-md md:shadow-lg my-5">
            <input type="checkbox" />
            <h2 className="collapse-title lg:text-xl font-medium">Notes</h2>
            <div className="collapse-content w-full bg-base-100">
                {notes.map((note, index) => (
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col border rounded-md p-2 w-[95%]">
                            <p className="text-sm italic text-justify mb-1.5 py-0.5 px-2.5 bg-info">
                                {note}
                            </p>
                            <input
                                className="input input-xs w-full input-bordered"
                                type="text"
                                value={comments[index]}
                                onChange={(e) => {
                                    const updatedComments = [...comments];
                                    updatedComments[index] = e.target.value;
                                    setComments(updatedComments);

                                    // saveNotes();
                                    console.log(comments);
                                }}
                                placeholder="Add a comment"
                            />
                        </div>
                        <button
                            onClick={() => deleteNote(index)}
                            className="btn btn-circle btn-xs btn-ghost"
                        >
                            <TrashIcon className="h-4 w-4 text-error" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;
