import checkAuth from "../../../app/auth";
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import { Link } from "react-router-dom";
import React from "react";

const token = checkAuth();

function SummaryPanel({ content }) {
    const [summary, setSummary] = React.useState("");
    
    // console.log(summary === "");
    const [loading, setLoading] = React.useState(false);

    // get summary of content from backend if top side button of id = 'summary' is clicked
    React.useEffect(() => {
        const summary_card = document.getElementById("summary");
        const summaryButton = document.getElementById("summary-button");
        // console.log(summaryButton);

        if (!token) {
            summaryButton.classList.add("btn-disabled");
            return;
        }
        // get top side button of id 'summary'
        if (!summary_card) {
            return;
        }

        if ((localStorage.getItem("summary") !== "") || (summary !== "")) {
            setSummary(localStorage.getItem("summary"));

            summaryButton.classList.add("btn-disabled");
            
            let div = summaryButton.childNodes[0];
            let span = div.querySelector(".loading.loading-spinner.loading-xs");
            if (span !== null) div.removeChild(span);

            return;
        }

        const handleSummaryButtonClick = () => {
            //   console.log("Summary button clicked");
            setLoading(true);
            // add child element span with class 'loading loading-spinner' to button
            let span = document.createElement("span");
            span.classList.add("loading", "loading-spinner", "loading-xs");
            let div = summaryButton.childNodes[0];
            if (div.childNodes.length === 2) {
                div.appendChild(span);
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
                        localStorage.setItem("summary", r["texts"]);
                        localStorage.setItem("isDocSaved", false);
                    });
                })
                .then(() => {
                    if (summary !== "") {
                        summaryButton.classList.add("btn-disabled");
                        summary_card.classList.add("collapse-open");
                    }
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
        <div
            id="summary"
            className={
                "collapse collapse-arrow float-left w-full lg:w-[90%] max-w-full h-max bg-base-100 max-md:shadow-md md:shadow-lg my-5"
            }
        >
            <input type="checkbox" />
            <div className="collapse-title lg:text-xl font-medium flex flex-row items-center gap-2">
                <span>Summary</span>
            </div>

            <div className="collapse-content w-full bg-base-100">
                {token ? (
                    <div className="items-center h-fit text-justify py-1">
                        <article className="prose max-w-4xl">
                            <div>
                                {!loading && summary !== "" ? (
                                    <div className="flex flex-row gap-2.5">
                                        <span className="text-sm">
                                            {summary}
                                        </span>
                                        <button
                                            className={
                                                "btn btn-info btn-xs btn-square self-start"
                                            }
                                            onClick={handleCopyButtonClick}
                                        >
                                            <ClipboardDocumentIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {loading && summary === "" ? (
                                    <progress className="progress progress-primary">
                                        Loading summary...
                                    </progress>
                                ) : (
                                    ""
                                )}
                            </div>
                        </article>
                    </div>
                ) : (
                    <div className="text-center text-neutral">
                        <p>
                            Please{" "}
                            <Link
                                to={"/login"}
                                className="text-error font-bold"
                            >
                                Login
                            </Link>{" "}
                            or{" "}
                            <Link
                                to={"/register"}
                                className="text-success-content font-bold"
                            >
                                Register
                            </Link>{" "}
                            to summarize text.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SummaryPanel;
