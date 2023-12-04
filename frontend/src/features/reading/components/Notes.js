import { useState } from 'react';

function Notes({ note, location }) {
    const [text, setText] = useState("");
    return (
        <div className="card shadow-lg compact bg-base-100">
            <div className="card-body">
                <h2 className="card-title text-lg">{note}</h2>
                {/* <p className='text-sm'>{location}</p> */}
                <input
                    className="input-text" 
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type here..."
                />
            </div>
        </div>
    );
}

export default Notes;