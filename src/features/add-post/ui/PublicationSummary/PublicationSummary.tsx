import Button from "@/shared/ui/Button";
const PublicationSummary = () => {
    
    return (
        <aside className="create-post__sidebar">
            <div className="create-post__summary">
                <header className="create-post__summary-header">
                    <h2 className="create-post__summary-title">Publication summary</h2>

                    <p className="create-post__summary-description">
                        Review the publication before sending it.
                    </p>
                </header>

                <div
                    className="create-post__banner-preview"
                    role="img"
                    aria-label="Banner preview"
                />

                <dl className="create-post__summary-list">
                    <div className="create-post__summary-row">
                        <dt>Category</dt>
                        <dd>Technology</dd>
                    </div>

                    <div className="create-post__summary-row">
                        <dt>Sections</dt>
                        <dd>2</dd>
                    </div>

                    <div className="create-post__summary-row">
                        <dt>Words</dt>
                        <dd>0</dd>
                    </div>

                    <div className="create-post__summary-row">
                        <dt>Reading time</dt>
                        <dd>0 min</dd>
                    </div>
                </dl>

                <div className="create-post__author">
                    <span className="create-post__author-avatar" aria-hidden="true">
                        FT
                    </span>

                    <span className="create-post__author-content">
                        <span className="create-post__author-label">Author</span>
                        <strong className="create-post__author-name">FutureTech author</strong>
                    </span>
                </div>

                <div className="create-post__actions">
                    <Button type="button" className="create-post__preview-button">
                        Preview
                    </Button>

                    <Button type="button" className="button--accent create-post__publish-button">
                        Publish
                    </Button>
                </div>

                <p className="create-post__draft-status">
                    Draft changes will be saved automatically
                </p>
            </div>
        </aside>
    );
};
export default PublicationSummary;
