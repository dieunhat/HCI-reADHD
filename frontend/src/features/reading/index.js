import TitleCard from "../../components/Cards/TitleCard";
import React from "react";
import { bionicReading } from 'bionic-reading';
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";

function ReadingPage() {
    const [content, setContent] = React.useState('')

    // get content from read_text endpoint
    React.useEffect(() => {
        fetch('/api/get_content', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response)
                response.json().then(r => {
                    console.log(r);
                    setContent(r.texts[0])
                })
            })
            .catch((error) => {
                console.error('Error:', error);
        })
    })

    const [summary, setSummary] = React.useState('')
    const [currentText, setCurrentText] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    // title of document: editable
    React.useEffect(() => {
    //     get title of document
        const title = document.getElementById('doc').querySelector('.card-title .title-text')
    //     make title editable
        title.contentEditable = true
    //     add event listener to save title on blur
        title.addEventListener('blur', () => {
            console.log('Title changed')
        })
    })

    // get summary of content from backend if top side button of id = 'summary' is clicked
    React.useEffect(() => {
        // get top side button of id 'summary'
        const summary_card = document.getElementById('summary')
        if (!summary_card) return

        const summaryButton = summary_card.querySelector('.card-title .card-action button')
        const handleSummaryButtonClick = () => {
            console.log('Summary button clicked')
            setLoading(true);

            fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "content": content,
                })
            })
            .then(response => {
                console.log(response)
                response.json().then(r => {
                    console.log(r);
                    setSummary(r.summary);
                })
            })
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        summaryButton.addEventListener('click', handleSummaryButtonClick)
    })

    const handleCopyButtonClick = () => {
        console.log('Copy button clicked')
        navigator.clipboard.writeText(summary).then(r => {})
    };

    // switch to bionic reading mode if bionic mode is clicked
    React.useEffect(() => {
        // get content from document with id 'content'
        const content = document.getElementById('content').innerText
        console.log(content)

        // get top side button of id 'summar  y'
        const text_card = document.getElementById('doc')
        if (!text_card) return

        const bionicButton = text_card.querySelector('.card-title .card-action button')

        const handleTopSideButtonClick = () => {
            console.log('Bionic Mode button clicked')
            // setLoading(true);

            //  bionic reading mode
            const bionic_text = bionicReading(content, { highlightTag: 'strong' })

            console.log(bionic_text)
            setCurrentText(bionic_text)
        }
        bionicButton.addEventListener('click', handleTopSideButtonClick)
    });

    return (
        <div className='mx-auto my-0 h-fit'>
            <TitleCard id='doc' title='Document Title' TopSideButtons={'Bionic Mode'}>
                <div className='card-body max-h-[26rem] text-justify w-[48rem] h-[26rem]
                                overflow-y-auto scroll-smooth scroll-p-1'>
                    <article id={'content'} className='prose'>
                        <p dangerouslySetInnerHTML={{__html: currentText}}>
                        </p>
                    </article>
                </div>
            </TitleCard>

            <TitleCard id='summary' title='Summary' TopSideButtons={'Summarize'}>
                {summary !== '' ?
                    <div className="card-action float-right copy-button">
                        <button className="btn btn-sm btn-info text-primary" onClick={handleCopyButtonClick}>
                            <ClipboardDocumentIcon className='h-5 w-5'/>
                        </button>
                    </div>
                    : ''}
                <div className='card-body items-center max-h-[26rem] text-justify
                                    overflow-y-auto scroll-smooth scroll-p-1'>
                    <article className='prose max-w-4xl'>
                        <p>
                            {loading ? 'Loading summary...' : summary}

                        </p>
                    </article>
                </div>
            </TitleCard>
        </div>
    )
}

export default ReadingPage;