const ResourceBody =  () => {
    return (
        <div className="card__body">
  <div className="card__grid card__grid--2-cols-alt">
    <div className="card__cell">
      <h3 className="card__cell-title h5">Variety of Topics</h3>
    </div>
    <div className="card__cell">
      <p className="card__cell-desc">
        opics include AI in education (25%), renewable energy (20%), healthcare
        (15%), space exploration (25%), and biotechnology (15%).
      </p>
    </div>
    <div className="card__cell card__cell--wide">
      <img
        className="card__cell-image"
        src="/images/resources/1.jpg"
        alt=""
        width="917"
        height="332"
      />
    </div>
    <div className="card__cell tile">
      <h4 className="card__cell-subtitle">Total Ebooks</h4>
      <p className="card__cell-desc h6">Over 100 ebooks</p>
    </div>
    <div className="card__cell tile">
      <h4 className="card__cell-subtitle">Download Formats</h4>
      <p className="card__cell-desc h6">PDF format for access.</p>
      <a href="" className="card__cell-link button">
        <span className="icon icon--eye-yellow">Preview</span>
      </a>
    </div>
    <div className="card__cell card__cell--wide tile">
      <h4 className="card__cell-subtitle">Average Author Expertise</h4>
      <p className="card__cell-desc h6">
        Ebooks are authored by renowned experts with an average of 15 years of
        experience
      </p>
    </div>
  </div>
</div>

    )
}
export default ResourceBody