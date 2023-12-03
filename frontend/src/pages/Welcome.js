import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../features/common/headerSlice";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../containers/Header";
import Logo from "../components/Logo"; 
import { Link } from "react-router-dom";

function WelcomePage() {
  const redirect = useNavigate();

  const dispatch = useDispatch();
  const [inputText, setInputText] = useState();
  const [inputFile, setInputFile] = useState();

  const [currentButtonAddText, setCurrentButtonAddText] = useState(true);

  useEffect(() => {
    dispatch(setPageTitle({ title: <div>Welcome to <Logo/></div> }));
  }, []);

  const handleAddText = () => {
    setCurrentButtonAddText(true);
  };

  const handleUploadText = () => {
    setCurrentButtonAddText(false);
  };

  const updateInputText = ({ updateType, value }) => {
    setInputText(value);
    console.log(inputText);
  };

  const updateInputFile = ({ updateType, value }) => {
    setInputFile(value);
    console.log(inputFile);
  };

  // if read now button is clicked, check if currentButtonAddText is true or false
  // if true, then send inputText to backend
  // if false, then send inputFile to backend
  // then redirect to reading page
  const handleReadNow = () => {
    if (currentButtonAddText) {
      // send inputText to backend
      console.log("input text is: " + inputText);
      fetch("/api/read_text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: inputText,
        }),
      })
        .then((response) => {
          console.log(response);
          response.json().then((r) => {
            console.log(r);
            console.log("redirecting to reading page");
            redirect("/app/reading");
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // send inputFile to backend
      console.log("input file is: " + inputFile.name);
      const formData = new FormData();
      formData.append("file", inputFile);
      formData.append("filename", inputFile.name);
      console.log(formData);
      fetch("/api/read_file", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/formdata",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: formData,
        mode: "no-cors",
      })
        .then((response) => {
          console.log(response);
          response.json().then((r) => {
            console.log(r);
            console.log("redirecting to reading page");
            redirect("/app/reading");
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const screenHeight = window.innerHeight;
  const elementHeight = screenHeight - 64 - 60 - 20 - 68;

  return (
    <>
      <div className="drawer-content flex flex-col bg-base-200">
	  <Header/>
        <main
          className="flex-1 overflow-y-auto p-5 max-lg:w-screen max-w-screen-2xl min-w-lg mx-auto"
          
        >
          <div
            className="w-md mt-5 bg-base-200"
            style={{ height: `${elementHeight}px` }}
          >
            {/* Content */}
            <div className="flex flex-col gap-1 px-5">
              {/*<TemplatePointers />*/}
              <div className="flex flex-col">
                <h1 className="mb-5 text-6xl">
                  {/* <span className="text-success-content font-bold">reAD</span>
                  <span className="text-success font-normal">HD</span> */}
                  <Logo/>
                </h1>
                <p>A reading support helpkit for ADHD users.</p>
              </div>
              <div className="divider"></div>
              <div className={"w-full inline-block"}>
                <div className="join">
                  <button
                    onClick={handleAddText}
                    className={
                      currentButtonAddText
                        ? "btn join-item btn-warning hover:bg-warning hover:border-0 cursor-default no-animation"
                        : "btn join-item btn-info"
                    }
                  >
                    Add Text
                  </button>
                  <button
                    onClick={handleUploadText}
                    className={
                      currentButtonAddText
                        ? "btn join-item btn-info"
                        : "btn join-item btn-warning hover:bg-warning hover:border-0 cursor-default no-animation"
                    }
                  >
                    Upload Text
                  </button>
                </div>
                {/*make this align to right*/}
                {/*<Link to="/app/reading" className={'float-right'}>*/}
                <button
                  onClick={handleReadNow}
                  className={
                    inputFile !== "" || inputText !== ""
                      ? "btn btn-primary float-right"
                      : "btn btn-disabled float-right"
                  }
                >
                  Read Now
                </button>
                {/*</Link>*/}
              </div>
              <div
                className={"min-w-fit max-lg:w-full max-w-screen-xl w-[48rem] h-full mt-8"}
              >
                {currentButtonAddText ? (
                  <TextareaAutosize
                    className={"textarea w-full max-h-72"}
                    onChange={(e) =>
                      updateInputText({
                        updateType: "inputText",
                        value: e.target.value,
                      })
                    }
                    placeholder={"You can enter or paste your text here."}
                  />
                ) : (
                  //     upload file area
                  <div
                    className={
                      "w-full px-20 hero mt-5 tooltip tooltip-success hover:tooltip-open tooltip-bottom"
                    }
                    data-tip="Accept .docx, .txt, .pdf"
                  >
                    <input
                      name="file"
                      type="file"
                      className="file-input file-input-success w-96 mx-auto"
                      accept={".docx," + "application/pdf," + ".txt"}
                      onChange={(e) =>
                        updateInputFile({
                          updateType: "inputFile",
                          value: e.target.files[0],
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <div className="divider mt-1 mb-0"></div>
        <footer className="footer items-center py-4 px-5 w-screen">
          <aside className="items-center grid-flow-col max-lg:hidden">
            <img src={"/neg_logo.svg"} alt="logo" className="w-8 h-8" />
            {/* <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current">
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>  */}
            <p>Human Computer Interaction project by <span className="font-bold text-primary">Group 4</span></p>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          
            <Link to={'https://github.com/dieunhat/HCI-Project-ADHD-Help-Kit'} 
                  target="blank" className="btn btn-sm flex flex-row items-center gap-2">
            <div className="text-lg bg-base-100"><Logo/></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={'currentColor'}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}

export default WelcomePage;
