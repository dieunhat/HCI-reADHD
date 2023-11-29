import TitleCard from "../../../components/Cards/TitleCard"
import { Link } from "react-router-dom";

function ReadingPanel({content, contentTitle}) {
    return (
        <>
            <TitleCard id='doc' title={<p className="text-success">{contentTitle}</p>} TopSideButtons={'Bionic Mode'}>
                <div className='card-body max-h-[26rem] text-justify w-full h-[26rem] py-1
                                overflow-y-auto scroll-smooth scroll-p-1'>
                    <article id={'content'} className='prose max-w-[48rem]'>
                        {/* {currentText !== '' ? <div dangerouslySetInnerHTML={{__html: currentText}}></div>
                                            : <div dangerouslySetInnerHTML={{__html: content.replace(/\n/g, '<br>')}}></div>
                        } */}
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </article>
                </div>
                {/* upload new text or file button -> redirect to welcome page */}
                <Link to="/app/welcome" className="w-full flex flex-row align-center mt-5">
                    <button className="btn btn-success btn-outline btn-sm w-64 mx-auto">Upload New Text</button>
                </Link>
            </TitleCard>
        </>
    )
}

export default ReadingPanel;