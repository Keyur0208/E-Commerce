export default function Feedback() {
    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mt-3">
                    <li className="breadcrumb-item"><a href='/' >Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Feedback</li>
                </ol>
            </nav>
            <div className="text-center my-3" style={{color:'white'}}>
                <img src="feedback-video.gif" className="feedback-image" />
            </div>
        </div>

    )
}