import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import Title from "../../components/Typography/Title";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import { DOCUMENTS } from "../../utils/tempData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import ReadIcon from "@heroicons/react/24/outline/BookOpenIcon"
import { Link, json } from "react-router-dom";

const TopSideButtons = ({ applySearch }) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (searchText == "") {
            // removeAppliedFilter();
        } else {
            applySearch(searchText);
        }
    }, [searchText]);

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

function Documents() {
    const [docs, setDocs] = useState(DOCUMENTS);
    const [isLoading, setIsLoading] = useState(false);

    const applySearch = (value) => {
        let filteredDocs = DOCUMENTS.filter((t) => {
            return (
                t.title.toLowerCase().includes(value.toLowerCase()) ||
                t.summary.toLowerCase().includes(value.toLowerCase())
            );
        });
        setDocs(filteredDocs);
    };

    useEffect(() => {
        getUserDocs();
    }, []);

    const getUserDocs = () => {
        setIsLoading(true);
        const username = localStorage.getItem("username");
        setDocs([]);
        fetch(`/api/get_user_files?username=${username}`, {  
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //     username: localStorage.getItem("username"),
            // }),
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((data) => {
                    // setDocs(data);
                    // const 
                    console.log(data);
                    console.log(data[0]);
                    const files = data[0];
                    files.forEach((file) => {
                        var title = file.content;
                        var date = file.date;
                        var notes = file.notes;
                        var summary = file.summary;
                        var title = file.title;
                        var _id = file._id;

                        var doc = {
                            title: title,
                            date: date,
                            notes: notes,
                            summary: summary,
                            _id: _id,
                        };

                        setDocs((docs) => [...docs, doc]);
                    })
                });
            } else {
                response.json().then((data) => {
                    console.log(data);
                });
            }
        }).catch((error) => {
            console.error("Error:", error);
            setIsLoading(false);
        });
    }

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
                        <TopSideButtons applySearch={applySearch} />
                    </div>
                </Title>
                <div className="divider"></div>

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>Date</th>
                                <th>Read</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map((l, k) => {
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
                                        <td>{l.summary}</td>

                                        <td>
                                            {moment(l.date).format(
                                                "hh:mm DD/MM/YYYY"
                                            )}
                                        </td>
                                        
                                        <td>
                                            <Link to="/reading">
                                                <button className="btn btn-ghost text-success-content btn-sm btn-circle">
                                                    <ReadIcon className="h-6 w-6 text-current" />
                                                </button>
                                            </Link>
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
