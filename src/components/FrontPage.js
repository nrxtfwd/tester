import frontPage from '../images/frontpage.jpg'

const FrontPage = () => {
    return (
        <div className="front-page-div">
            <img className="page front-page" src={frontPage}></img>
            <p className="subject-name">Computer science</p>
        </div>
    )
}

export default FrontPage