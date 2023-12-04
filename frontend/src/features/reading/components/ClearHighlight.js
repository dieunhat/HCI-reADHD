function ClearHighlighter() {
    const clearHighlight = () => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        range.deleteContents();
        const span = document.createElement("span");
        span.style.backgroundColor = "transparent";
        span.appendChild(document.createTextNode(selectedText));
        range.insertNode(span);
    };

    return (
        <>
            <button className="btn" id='highlight' onClick={clearHighlight}>Clear Highlight</button>
        </>
    )
}

export default ClearHighlighter;