import { React, useState, useEffect } from 'react';

function Notes() {
    
    const [notes, setNotes] = useState([]); // array of notes
	const [locations, setLocations] = useState([]); // array of locations [start, end]
    const [comments, setComments] = useState([]); // array of comments
    const [commentInput, setCommentInput] = useState(""); // comment input value

    useEffect(() => {
    }, [notes]);

    useEffect(() => {
        const addNoteButton = document.getElementById("add-note");
        console.log(addNoteButton);
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
		setLocations((locations) => [...locations, [range.startOffset, range.endOffset]]);
    };

	const deleteNote = (index) => {
		const updatedNotes = [...notes];
		updatedNotes.splice(index, 1);
		setNotes(updatedNotes);
	}

    const handleCommentChange = (event) => {
        setCommentInput(event.target.value);
    };

    const addComment = (index) => {
        const updatedComments = [...comments];
        updatedComments[index] = commentInput;
        setComments(updatedComments);
        setCommentInput("");
    };

    return (
        <div className="collapse collapse-arrow float-left w-full lg:w-[90%] max-w-full h-max bg-base-100 max-md:shadow-md md:shadow-lg my-5">
            <input type="checkbox" />
            <h2 className="collapse-title lg:text-xl font-medium">Notes</h2>
            <div className='collapse-content w-full bg-base-100'>
                {notes.map((note, index) => (
                    <div className='flex flex-col justify-between items-center'>
                        <p className='text-sm'>{note}</p>
                        <button onClick={() => deleteNote()} className='btn btn-circle btn-xs btn-ghost'>X</button>
                        <input type="text" value={commentInput} onChange={handleCommentChange} placeholder="Add a comment" />
                        <button onClick={() => addComment(index)} className='btn btn-xs btn-primary'>Add Comment</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;
