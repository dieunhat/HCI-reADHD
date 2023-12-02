function Highlighter() {
    const textHighlight = () => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        range.deleteContents();
        const span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        span.appendChild(document.createTextNode(selectedText));
        range.insertNode(span);
    };

    return (
        <>
            <button className="btn" id='highlight' onClick={textHighlight}>Highlight</button>
        </>
    )
}

export default Highlighter;