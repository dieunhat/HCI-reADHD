import moment from "moment";
import { useEffect, useState } from "react";
import Title from "../../components/Typography/Title";
// import { DOCUMENTS } from "../../utils/tempData";
import SearchBar from "../../components/Input/SearchBar";
import ReadIcon from "@heroicons/react/24/outline/BookOpenIcon";
import { Link, json, useNavigate } from "react-router-dom";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

const TopSideButtons = ({removeFilter, applySearch }) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter();
        } else {
            applySearch(searchText);
        }
    }, [searchText]);

    const removeAppliedFilter = () => {
        removeFilter()
        setSearchText("")
    }

    return (
        <div className="w-max">
            <SearchBar
                searchText={searchText}
                styleClass="mr-4 max-lg:w-[10rem]"
                setSearchText={setSearchText}
            />
        </div>
    );
};

var DOCUMENTS = [];

function Documents() {
    const redirect = useNavigate();

    const [docs, setDocs] = useState(DOCUMENTS);
    const [isLoading, setIsLoading] = useState(false);

    const removeFilter = () => {
        setDocs(DOCUMENTS);

    }

    const applySearch = (value) => {
        let filteredDocs = DOCUMENTS.filter((d) => {
            console.log(d.title);
            if (d.summary !== "" && d.summary !== null) {
                return (
                    d.title.toLowerCase().includes(value.toLowerCase()) ||
                    d.summary.toLowerCase().includes(value.toLowerCase())
                )}
            else {
                return (
                    d.title.toLowerCase().includes(value.toLowerCase())
                )
            }
        });
        setDocs(filteredDocs);
    };

    useEffect(() => {
        getUserDocs();
    }, []);

    const handleDeleteFile = (doc) => {
        console.log(doc);

        const tempDocs = docs.filter((d) => d._id !== doc._id);
        setDocs(tempDocs);

    };

    const handleReadFile = (doc) => {
        console.log(doc);

        localStorage.setItem("content", doc.content);
        localStorage.setItem("contentTitle", doc.title);
        localStorage.setItem("summary", doc.summary);
        localStorage.setItem("notes", doc.notes);
        localStorage.setItem("_id", doc._id);

        console.log("redirecting to reading page");
        // clear DOCUMENT (pop all elements)
        DOCUMENTS.length = 0;
        redirect("/app/reading");
    };

    const getUserDocs = () => {
        setIsLoading(true);
        const username = localStorage.getItem("username");
        setDocs([]);
        fetch(`/api/get_user_files?username=${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status == 200) {
                    response.json().then((data) => {
                        // setDocs(data);
                        // const
                        console.log(data);
                        console.log(data[0]);
                        const files = data[0];
                        files.forEach((file) => {
                            var content = file.content;
                            var date = file.date;
                            var notes = file.notes;
                            var summary = file.summary;
                            var title = file.title;
                            var _id = file._id;

                            var doc = {
                                content: content,
                                title: title,
                                date: date,
                                notes: notes,
                                summary: summary,
                                _id: _id,
                            };

                            setDocs((docs) => [...docs, doc]);
                            DOCUMENTS.push(doc);
                            console.log(DOCUMENTS);
                        });                        
                    });
                } else {
                    response.json().then((data) => {
                        console.log(data);
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="card w-[42rem] mx-auto max-lg:w-[90%] h-[36rem] col-span-5 p-4 bg-base-100 max-md:shadow-md md:shadow-lg my-5">
                {/* Team Member list in table format loaded constant */}
                <Title
                    styleClass={
                        "navbar min-h-[2rem] card-title m-0 py-0 items-center w-full"
                    }
                >
                    <p
                        className={
                            "title-text navbar-start text-success-content"
                        }
                    >
                        Documents
                    </p>
                    <div className="navbar-end">
                        <TopSideButtons removeFilter={removeFilter} applySearch={applySearch} />
                    </div>
                </Title>
                <div className="divider"></div>

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-lg">Title</th>
                                <th className="text-lg">Summary</th>
                                <th className="text-lg">Date</th>
                                <th className="text-lg">Read</th>
                                <th className="text-lg">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map((l, k) => {
                                // const title = l.title.length > 10 ? `${l.title.substring(0, 10)}...` : l.title;
                                // const summary = l.summary.length > 10 ? `${l.summary.substring(0, 10)}...` : l.summary;

                                return (
                                    <tr key={k}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold">
                                                        {l.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-justify italic">
                                            {l.summary}
                                        </td>

                                        <td>
                                            {moment(l.date).format(
                                                "hh:mm DD/MM/YYYY"
                                            )}
                                        </td>

                                        <td className="text-center">
                                            <button
                                                className="btn btn-ghost text-success-content btn-sm btn-circle"
                                                onClick={() =>
                                                    handleReadFile(docs[k])
                                                }
                                            >
                                                <ReadIcon className="h-6 w-6 text-current" />
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-ghost text-error-content btn-sm btn-circle"
                                                onClick={() =>
                                                    handleDeleteFile(docs[k])
                                                }
                                            >
                                                <TrashIcon className="h-6 w-6 text-error" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Documents;
