import checkAuth from "../../../app/auth";
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import { Link } from "react-router-dom";
import React from "react";

const token = checkAuth();

function SummaryPanel({ content }) {
    const [summary, setSummary] = React.useState("");
    console.log(summary === "");
    const [loading, setLoading] = React.useState(false);

    // get summary of content from backend if top side button of id = 'summary' is clicked
    React.useEffect(() => {
        if (!token) return;
        // get top side button of id 'summary'
        const summary_card = document.getElementById("summary");
        if (!summary_card) return;

        const summaryButton = document.getElementById("summary-button");
        // console.log(summaryButton);

        if (summary !== "") {
            summaryButton.classList.add("btn-disabled");
            let span = summaryButton.querySelector(".loading.loading-spinner.loading-xs");
            if (span !== null) summaryButton.removeChild(span);

            // summary_card.classList.add("collapse-open");
        }
        const handleSummaryButtonClick = () => {
            //   console.log("Summary button clicked");
            setLoading(true);
            // add child element span with class 'loading loading-spinner' to button
            let span = document.createElement("span");
            span.classList.add("loading", "loading-spinner", 'loading-xs');
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
                    if (summary !== "") {
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
                "collapse collapse-arrow float-left w-full lg:w-[90%] max-w-full h-max bg-base-100 max-md:shadow-md md:shadow-lg my-5"}>
            <input type="checkbox" />
            <div className="collapse-title lg:text-xl font-medium flex flex-row items-center gap-2">
                <span>Summary</span>
            </div>

            <div className="collapse-content w-full bg-base-100">
                {token ? (
                    <div className="items-center h-fit text-justify py-1">
                        <article className="prose max-w-4xl">
                            <p>
                                {!loading && summary !== "" ?(
                                <div className="flex flex-row gap-1">
                                    <span className="text-sm">{summary}</span>
                                    <button
                                    className={"btn btn-info btn-xs btn-square self-start"}
                                    onClick={handleCopyButtonClick}>
                                        <ClipboardDocumentIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                ): ( "")}
                                {loading && summary === "" ? (
                                    <progress className="progress progress-primary">
                                        Loading summary...
                                    </progress>
                                ) : ("")}
                            </p>
                        </article>
                    </div>
                ) : (
                    <div className="collapse-content text-center py-1 w-32">
                        <p>
                            Please{" "}
                            <Link
                                to={"/login"}
                                className="text-success-content font-bold"
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
