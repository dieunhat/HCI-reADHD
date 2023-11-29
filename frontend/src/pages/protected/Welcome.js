import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TextareaAutosize from 'react-textarea-autosize';
import {useState} from "react";
import { useNavigate } from "react-router-dom";

function InternalPage(){

    const redirect = useNavigate()

    const dispatch = useDispatch()
    const [inputText, setInputText] = useState()
    const [inputFile, setInputFile] = useState()

    const [currentButtonAddText, setCurrentButtonAddText] = useState(true)

    useEffect(() => {
        dispatch(setPageTitle({ title : "Welcome to ADHD Help Kit"}))
      }, [])

    const handleAddText = () => {
        setCurrentButtonAddText(true)
    }

    const handleUploadText = () => {
        setCurrentButtonAddText(false)
    }

    const updateInputText = ({updateType, value}) => {
        setInputText(value)
        console.log(inputText)
    }

    const updateInputFile = ({updateType, value}) => {
        setInputFile(value)
        console.log(inputFile)
    }

    // if read now button is clicked, check if currentButtonAddText is true or false
    // if true, then send inputText to backend
    // if false, then send inputFile to backend
    // then redirect to reading page
    const handleReadNow = () => {
        if (currentButtonAddText) {
            // send inputText to backend
            console.log('input text is: ' + inputText)
            fetch('/api/read_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "content": inputText,
                })
            })
                .then(response => {
                    console.log(response)
                    response.json().then(r => {
                        console.log(r);
                        console.log("redirecting to reading page")
                        redirect('/app/reading')
                    })
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        } else {
            // send inputFile to backend
            console.log('input file is: ' + inputFile.name)
            const formData = new FormData();
            formData.append('file', inputFile)
            formData.append('filename', inputFile.name)
            console.log(formData)
            fetch('/api/read_file', {
                method: 'POST',
                headers: {
                    'Content-Type':'multipart/formdata',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: formData,
                mode: "no-cors"
            })
                .then(response => {
                    console.log(response)
                    response.json().then(r => {
                        console.log(r);
                        console.log("redirecting to reading page")
                        redirect('/app/reading')
                    })
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

        }
    }

    const screenHeight = window.innerHeight;
    const elementHeight = screenHeight - 64 - 60;

    return (
        <div className="w-md mt-5 bg-base-200" style={{ height: `${elementHeight}px` }}>
            {/* Content */}
          <div className="flex flex-col gap-1 px-5">
            {/*<TemplatePointers />*/}
              <div className='flex flex-col'>
            <h1 className="mb-5 text-5xl font-bold text-primary">
                Bionic Reading
            </h1>
            <p>A collection of tools to help you manage your ADHD.</p>
              </div>
              <div className="divider"></div>
              <div className={'w-full inline-block'}>
                  <div className="join">
                      <button onClick={handleAddText}
                          className={currentButtonAddText 
                          ? "btn join-item btn-warning hover:bg-warning hover:border-0 cursor-default no-animation" 
                          : "btn join-item btn-info"}>
                          Add Text
                      </button>
                      <button onClick={handleUploadText}
                          className={currentButtonAddText ? "btn join-item btn-info" 
                          : "btn join-item btn-warning hover:bg-warning hover:border-0 cursor-default no-animation"}>
                          Upload Text
                      </button>
                  </div>
                  {/*make this align to right*/}
                  {/*<Link to="/app/reading" className={'float-right'}>*/}
                      <button onClick={handleReadNow}
                          className={(inputFile !== '' || inputText !== '')
                          ? "btn btn-primary float-right"
                          : "btn btn-disabled float-right"}>Read Now</button>
                  {/*</Link>*/}
              </div>
              <div className={'min-w-fit max-w-screen-xl w-[48rem] h-full mt-8'}>
                  {currentButtonAddText ?
                      <TextareaAutosize className={'textarea w-full max-h-72'}
                        onChange={(e) => updateInputText({
                            updateType: 'inputText', value: e.target.value})}
                                        placeholder={'You can enter your text here.'} />
                      :
                      //     upload file area
                      <div className={'w-full px-20 hero mt-5 tooltip tooltip-success hover:tooltip-open tooltip-bottom'} 
                            data-tip='Accept .docx, .txt, .pdf' >
                          <input name='file' type="file" className="file-input file-input-success w-96 mx-auto"
                                 accept={'.docx,' + 'application/pdf,' + '.txt'}
                                    onChange={(e) => updateInputFile({
                                        updateType: 'inputFile', value: e.target.files[0]})}
                                 />
                      </div>
                  }
              </div>
          </div>
    </div>
    )
}

export default InternalPage