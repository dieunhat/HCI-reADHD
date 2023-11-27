import TitleCard from "../../components/Cards/TitleCard";
import React from "react";

function ReadingPage() {
    const [summary, setSummary] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    // get summary of content from backend if top side button of id = 'summary' is clicked
    React.useEffect(() => {
        // get content from document with id 'content'
        const content = document.getElementById('content').innerText
        console.log(content)

        // get top side button of id 'summary'
        const summary_card = document.getElementById('summary')
        if (!summary_card) return

        const summaryButton = summary_card.querySelector('.card-title .card-action button')

        const handleTopSideButtonClick = () => {
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
        summaryButton.addEventListener('click', handleTopSideButtonClick)
    });

    return (
        <div className='max-w-6xl mx-auto my-0 h-fit'>
            <TitleCard id='doc' title='Document Title' TopSideButtons={'Bionic Mode'}>
                <div className='card-body items-center max-h-[26rem] text-justify
                                overflow-y-auto scroll-smooth scroll-p-1'>
                    <article id={'content'} className='prose max-w-4xl'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus ullamcorper volutpat. Sed blandit ligula ac interdum vulputate. Nulla vel orci congue, vehicula sapien at, iaculis ligula. Ut condimentum pharetra massa, non scelerisque arcu consectetur sit amet. In dignissim efficitur leo a convallis. Fusce placerat ac erat vitae imperdiet. Fusce in facilisis ante, in venenatis magna. Vestibulum ante felis, facilisis quis ex vitae, eleifend tempus sem. Curabitur eu felis vitae odio mollis pharetra at sit amet lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. In dignissim nisl nibh, non faucibus augue iaculis eget. In auctor iaculis leo ac facilisis. Maecenas commodo porttitor diam in imperdiet.
                        </p>
                        <p>
                            Vestibulum sit amet facilisis nulla, sit amet commodo magna. Donec dignissim pellentesque rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque fringilla massa id tellus gravida viverra. Quisque sagittis ligula augue, facilisis convallis enim pulvinar ut. In nec ex vel nisi aliquam volutpat vitae vel nisi. Integer at venenatis massa. Cras at nunc vel risus lobortis lacinia. Maecenas sagittis lacus non accumsan commodo. Sed dapibus odio sit amet libero mollis, sit amet pretium leo faucibus. Duis risus tellus, tempus vitae magna a, congue auctor odio. Quisque gravida, mauris sed eleifend venenatis, risus dolor sollicitudin est, ullamcorper semper augue magna eu libero.
                        </p>
                    </article>
                </div>
            </TitleCard>

            <TitleCard id='summary' title='Summary' TopSideButtons={'Summarize'}>
                <div className='card-body items-center max-h-[26rem] text-justify
                                    overflow-y-auto scroll-smooth scroll-p-1'>
                    <article className='prose max-w-4xl'>
                        <p>
                            {loading ? 'Loading summary...' : ''}
                            {summary}
                        </p>
                    </article>
                </div>
            </TitleCard>
        </div>
    )
}

export default ReadingPage;