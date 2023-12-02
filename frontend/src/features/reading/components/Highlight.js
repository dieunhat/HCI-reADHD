import Highlight from 'react-highlight';

window.onload=function(){
    const HIGHLIGHT_BUTTON = document.querySelector("#highlight");
    const CLEAR_BUTTON = document.querySelector("#clear")

    HIGHLIGHT_BUTTON.addEventListener("click", () => textHighlight())
    //CLEAR_BUTTON.addEventListener("click", () => clearHighlight())
}
let SELECTION_TEXTS = []
let selectionHighlighter = new Highlight();

function textHighlight(){
    
    // const HIGHLIGHT_BUTTON = document.querySelector("#highlight");
    // const CLEAR_BUTTON = document.querySelector("#clear")
    
    const textHighlight = () => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0)
        SELECTION_TEXTS.push(range)
        
        SELECTION_TEXTS.forEach((selection) => {
            selectionHighlighter.add(selection)
        })
        CSS.highlights.set("example", selectionHighlighter)
        };
// }

// function clearHighlight(){
//     const clearHighlight = () => {
//         selectionHighlighter.clear()
//         SELECTION_TEXTS = []
//         CSS.highlights.clear()
//     }
      
    // HIGHLIGHT_BUTTON.addEventListener("click", () => textHighlight())
        
    // CLEAR_BUTTON.addEventListener("click", () => clearHighlight())
    return (
        <>
            <button className="btn">Highlight</button>
        </>
    )
};

export default textHighlight;