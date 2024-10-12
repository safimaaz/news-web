const NewsCard = ({urlToImage, title, publishedAt, source, url, author}) => {      
    return (
        <div className="news-card d-flex my-3 p-3">
            <div>
                <img src={urlToImage} alt="new-image" />
            </div>
            <div className="ps-3">
                <h2>{title}</h2>
                <p className="mb-2">Source: {source?.name}</p>
                <p className="mb-3">Publiched Date: {new Date(publishedAt).toLocaleDateString()}</p>
                <a href={url} target="_blank" className="btn btn-info">View Details</a>
            </div>
        </div>
    )    
}

export default NewsCard
