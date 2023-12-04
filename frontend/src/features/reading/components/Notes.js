import { React, useState, useEffect } from "react";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

function Notes() {
    const [notes, setNotes] = useState([]); // array of notes
    const [locations, setLocations] = useState([]); // array of locations [start, end]
    const [comments, setComments] = useState([]); // array of comments

    useEffect(() => {}, [notes]);

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
        setLocations((locations) => [
            ...locations,
            [range.startOffset],
        ]);
        setComments((comments) => [...comments, ""]);
    };

    const deleteNote = (index) => {
        console.log(index);
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);

        const updatedComments = [...comments];
        console.log(updatedComments[index]);
        updatedComments.splice(index, 1);
        setComments(updatedComments);

        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
    };

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
                                onChange={
                                    (e) => {
                                        console.log(e.target.value);
                                        const updatedComments = [...comments];
                                        updatedComments[index] = e.target.value;
                                        setComments(updatedComments);
                                    }
                                    // (e) => setComments(e.target.value)
                                }
                                placeholder="Add a comment"
                                onBlur={() => {
                                    console.log("onBlur");
                                }}
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
