function Notes({ notes }) {
    for (let i = 0; i < notes.length; i++) {
        console.log(notes[i]);
    }

    return (
        <div className="collapse collapse-arrow w-full lg:w-[90%] max-w-full float-left
                        h-max bg-base-100 max-md:shadow-md md:shadow-lg my-5">
            <input type="checkbox" />
            <div className="collapse-title lg:text-xl font-medium">
                Notes
            </div>
            <div className="collapse-content w-full bg-base-100">
                {notes.map((note) => {
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-400">{note.text}</p>
                            <p className="text-xs text-gray-400">Date</p>
                        </div>
                        <button className="btn btn-sm btn-circle btn-error">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>;
                })}
            </div>
        </div>
    );
}

export default Notes;
