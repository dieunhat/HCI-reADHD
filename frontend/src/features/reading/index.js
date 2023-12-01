import TitleCard from "../../components/Cards/TitleCard";
import React from "react";
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import { Link } from "react-router-dom";
import checkAuth from "../../app/auth";
import ReadingPanel from "./components/ReadingPanel";

const token = checkAuth();

function ReadingPage() {
  const [content, setContent] = React.useState("");
  const [contentTitle, setContentTitle] = React.useState("");

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

  const [summary, setSummary] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // get summary of content from backend if top side button of id = 'summary' is clicked
  React.useEffect(() => {
    if (!token) return;
    // get top side button of id 'summary'
    const summary_card = document.getElementById("summary");
    if (!summary_card) return;

    const summaryButton = summary_card.querySelector(
      ".card-title .card-action button"
    );
    const handleSummaryButtonClick = () => {
      console.log("Summary button clicked");
      setLoading(true);
      // add child element span with class 'loading loading-spinner' to button
      let span = document.createElement("span");
      span.classList.add("loading", "loading-spinner");
      if (summaryButton.childNodes.length === 1) {
        summaryButton.appendChild(span);
      }

      fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      })
        .then((response) => {
          console.log(response);
          response.json().then((r) => {
            console.log(r);
            setSummary(r["texts"]);
          });
        })
        .then(() => {
          let span = summaryButton.querySelector(".loading.loading-spinner");
          if (span !== null) summaryButton.removeChild(span);
          summaryButton.classList.add("btn-disabled");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    summaryButton.addEventListener("click", handleSummaryButtonClick);
  });

  const handleCopyButtonClick = () => {
    console.log("Copy button clicked");
    navigator.clipboard.writeText(summary).then((r) => {});
  };

    return (
        <div className='mx-auto h-fit'>
            <ReadingPanel content={content.replace(/\n/g, '<br>')} contentTitle={contentTitle}/>

      {token ? (
        <TitleCard id="summary" title="Summary" TopSideButtons={"Summarize"}>
          {summary !== "" ? (
            <div
              className="card-action float-right copy-button
                                    tooltip tooltip-warning hover:tooltip-open hover:tooltip-top z-10"
              data-tip={"Copy to Clipboard"}
            >
              <button
                className={"btn btn-sm btn-info text-primary"}
                onClick={handleCopyButtonClick}
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            ""
          )}
          <div
            className="card-body items-center max-h-[24rem] text-justify w-[48rem] py-1
                                    overflow-y-auto scroll-smooth scroll-p-1"
          >
            <article className="prose max-w-4xl">
              <p>
                {loading && summary === "" ? (
                  <progress className="progress progress-primary w-64"></progress>
                ) : (
                  summary
                )}
              </p>
            </article>
          </div>
        </TitleCard>
      ) : (
        <TitleCard id="summary" title="Summary">
          <div className="card-body text-center py-1 w-[48rem]">
            <p>
              Please 
                {" "}<Link to={'/login'} className="text-success-content font-bold">Login</Link>{" "}
                  or 
                {" "}<Link to={"/register"} className="text-success-content font-bold">Register</Link>{" "}
              to summarize text.
            </p>
          </div>
        </TitleCard>
      )}
    </div>
  );
}

export default ReadingPage;
