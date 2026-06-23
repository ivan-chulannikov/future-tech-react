const ResourcePreview = () => {
    return (
        <div className="card__preview">
            <div className="card__preview-main">
                <img
                    src="/icons/resources/1.svg"
                    alt=""
                    width="80"
                    height="80"
                    className="card__preview-icon"
                />
                <div className="card__preview-info">
                    <h3 className="card__preview-title">Ebooks</h3>
                    <p>
                        Explore our collection of ebooks covering a wide spectrum of future
                        technology topics.
                    </p>
                </div>
                <a href="#" className="card__preview-link button">
                    <span className="icon icon--arrow-yellow">Download Ebooks Now</span>
                </a>
                <div className="download-info tile">
                    <div className="download-info__body">
                        <p className="download-info__title">Downloaded By</p>

                        <p className="download-info__subtitle h5">10k + Users</p>
                    </div>
                    <div className="download-info__team team">
                        <img
                            className="team__person"
                            src="/images/team/1.png"
                            width="50"
                            height="50"
                            loading="lazy"
                            alt=""
                        />
                        <img
                            className="team__person"
                            src="/images/team/2.png"
                            width="50"
                            height="50"
                            loading="lazy"
                            alt=""
                        />
                        <img
                            className="team__person"
                            src="/images/team/3.png"
                            width="50"
                            height="50"
                            loading="lazy"
                            alt=""
                        />
                        <img
                            className="team__person"
                            src="/images/team/4.png"
                            width="50"
                            height="50"
                            loading="lazy"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResourcePreview;
