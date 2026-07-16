import Button from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';
import PublicationSummary from '../PublicationSummary/PublicationSummary';
import { TextArea } from '@/shared/ui/TextArea';
const CreatePostForm = () => {
    return (
        <form className="create-post__layout">
            <div className="create-post__editor">
                <details className="create-post__panel" open>
                    <summary className="create-post__panel-header">
                        <span className="create-post__step">1</span>

                        <span className="create-post__panel-title">Basic information</span>

                        <span className="create-post__panel-description">
                            Add the essential details for your publication.
                        </span>
                    </summary>

                    <div className="create-post__panel-body">
                        <div className="create-post__fields">
                            <FormInput
                                id="post-title"
                                label="Title"
                                name="title"
                                type="text"
                                placeholder="Enter a compelling title for your publication"
                                required
                                fieldClassName="create-post__field create-post__field--wide"
                            />

                            <div className="field create-post__field create-post__field--wide">
                                <label className="field__label" htmlFor="post-description">
                                    Short description{' '}
                                    <span className="field__required-star" aria-hidden="true">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    className="field__control create-post__short-description"
                                    id="post-description"
                                    name="description"
                                    placeholder="Write a short summary that describes your publication"
                                    required
                                />
                            </div>

                            <div className="field create-post__field">
                                <label className="field__label" htmlFor="post-category">
                                    Category{' '}
                                    <span className="field__required-star" aria-hidden="true">
                                        *
                                    </span>
                                </label>

                                <select
                                    className="field__control create-post__select"
                                    id="post-category"
                                    name="categoryId"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    <option value="artificial-intelligence">
                                        Artificial Intelligence
                                    </option>
                                    <option value="robotics">Robotics</option>
                                    <option value="technology">Technology</option>
                                    <option value="space">Space</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </details>

                <details className="create-post__panel" open>
                    <summary className="create-post__panel-header">
                        <span className="create-post__step">2</span>

                        <span className="create-post__panel-title">Cover</span>

                        <span className="create-post__panel-description">
                            Add a banner image and accessibility description.
                        </span>
                    </summary>

                    <div className="create-post__panel-body">
                        <div className="create-post__cover-grid">
                            <div className="field create-post__field">
                                <span className="field__label">
                                    Banner image{' '}
                                    <span className="field__required-star" aria-hidden="true">
                                        *
                                    </span>
                                </span>

                                <input
                                    className="create-post__file-input"
                                    id="banner-image"
                                    name="bannerImage"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    required
                                />

                                <label className="create-post__upload" htmlFor="banner-image">
                                    <span className="create-post__upload-icon" aria-hidden="true">
                                        ↑
                                    </span>

                                    <span className="create-post__upload-title">
                                        Upload banner image
                                    </span>

                                    <span className="create-post__upload-description">
                                        JPEG, PNG or WebP. Maximum 5 MB
                                    </span>
                                </label>
                            </div>

                            <div className="field create-post__field">
                                <label className="field__label" htmlFor="banner-alt">
                                    Alternative text{' '}
                                    <span className="field__required-star" aria-hidden="true">
                                        *
                                    </span>
                                </label>
                                <textarea
                                    className="field__control create-post__banner-alt"
                                    id="banner-alt"
                                    name="bannerAlt"
                                    placeholder="Describe the image for accessibility"
                                    required
                                />
                                <TextArea 
                                className='create-post__banner-alt'
                                id='banner-alt'
                                name="bannerAlt"
                                placeholder="Describe the image for accessibility"
                                required
                                />

                            </div>
                        </div>
                    </div>
                </details>

                <details className="create-post__panel" open>
                    <summary className="create-post__panel-header">
                        <span className="create-post__step">3</span>

                        <span className="create-post__panel-title">Introduction</span>

                        <span className="create-post__panel-description">
                            Write an engaging introduction for your publication.
                        </span>
                    </summary>

                    <div className="create-post__panel-body">
                        <div className="field create-post__field">
                            <label className="field__label" htmlFor="post-introduction">
                                Introduction{' '}
                                <span className="field__required-star" aria-hidden="true">
                                    *
                                </span>
                            </label>

                            <textarea
                                className="field__control create-post__introduction"
                                id="post-introduction"
                                name="introduction"
                                placeholder="Write an introduction that sets the context for your readers"
                                required
                            />
                        </div>
                    </div>
                </details>

                <details className="create-post__panel" open>
                    <summary className="create-post__panel-header">
                        <span className="create-post__step">4</span>

                        <span className="create-post__panel-title">Content sections</span>

                        <span className="create-post__panel-description">
                            Build the main content of your publication.
                        </span>
                    </summary>

                    <div className="create-post__panel-body">
                        <div className="create-post__content-sections">
                            <article className="create-post__content-section">
                                <div className="create-post__content-section-header">
                                    <span className="create-post__drag-handle" aria-hidden="true">
                                        ⋮⋮
                                    </span>

                                    <span className="create-post__section-number">1</span>

                                    <div className="field create-post__section-title-field">
                                        <label className="field__label" htmlFor="section-1-title">
                                            Section title{' '}
                                            <span
                                                className="field__required-star"
                                                aria-hidden="true"
                                            >
                                                *
                                            </span>
                                        </label>

                                        <input
                                            className="field__control create-post__section-title-control"
                                            id="section-1-title"
                                            name="section-1-title"
                                            type="text"
                                            placeholder="Enter section title"
                                            required
                                        />
                                    </div>

                                    <div className="create-post__section-actions">
                                        <button
                                            className="create-post__icon-button"
                                            type="button"
                                            aria-label="Collapse section"
                                        >
                                            ↑
                                        </button>

                                        <Button
                                            className="create-post__icon-button"
                                            type="button"
                                            aria-label="Delete section"
                                        >
                                            ×
                                        </Button>
                                    </div>
                                </div>

                                <div className="create-post__paragraphs">
                                    <div className="field create-post__paragraph-field">
                                        <label
                                            className="field__label"
                                            htmlFor="section-1-paragraph-1"
                                        >
                                            Paragraph 1{' '}
                                            <span
                                                className="field__required-star"
                                                aria-hidden="true"
                                            >
                                                *
                                            </span>
                                        </label>

                                        <textarea
                                            className="field__control create-post__paragraph"
                                            id="section-1-paragraph-1"
                                            name="section-1-paragraph-1"
                                            placeholder="Write the first paragraph of this section"
                                            required
                                        />
                                    </div>

                                    <div className="field create-post__paragraph-field">
                                        <label
                                            className="field__label"
                                            htmlFor="section-1-paragraph-2"
                                        >
                                            Paragraph 2
                                        </label>

                                        <textarea
                                            className="field__control create-post__paragraph"
                                            id="section-1-paragraph-2"
                                            name="section-1-paragraph-2"
                                            placeholder="Write another paragraph"
                                        />
                                    </div>
                                </div>

                                <button className="create-post__text-button" type="button">
                                    <span aria-hidden="true">+</span>
                                    Add paragraph
                                </button>
                            </article>

                            <article className="create-post__content-section">
                                <div className="create-post__content-section-header">
                                    <span className="create-post__drag-handle" aria-hidden="true">
                                        ⋮⋮
                                    </span>

                                    <span className="create-post__section-number">2</span>

                                    <div className="field create-post__section-title-field">
                                        <label className="field__label" htmlFor="section-2-title">
                                            Section title{' '}
                                            <span
                                                className="field__required-star"
                                                aria-hidden="true"
                                            >
                                                *
                                            </span>
                                        </label>

                                        <input
                                            className="field__control create-post__section-title-control"
                                            id="section-2-title"
                                            name="section-2-title"
                                            type="text"
                                            placeholder="Enter section title"
                                            required
                                        />
                                    </div>

                                    <div className="create-post__section-actions">
                                        <button
                                            className="create-post__icon-button"
                                            type="button"
                                            aria-label="Collapse section"
                                        >
                                            ↑
                                        </button>

                                        <button
                                            className="create-post__icon-button"
                                            type="button"
                                            aria-label="Delete section"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>

                                <div className="create-post__paragraphs">
                                    <div className="field create-post__paragraph-field">
                                        <label
                                            className="field__label"
                                            htmlFor="section-2-paragraph-1"
                                        >
                                            Paragraph 1{' '}
                                            <span
                                                className="field__required-star"
                                                aria-hidden="true"
                                            >
                                                *
                                            </span>
                                        </label>

                                        <textarea
                                            className="field__control create-post__paragraph"
                                            id="section-2-paragraph-1"
                                            name="section-2-paragraph-1"
                                            placeholder="Write the first paragraph of this section"
                                            required
                                        />
                                    </div>
                                </div>

                                <button className="create-post__text-button" type="button">
                                    <span aria-hidden="true">+</span>
                                    Add paragraph
                                </button>
                            </article>

                            <button className="create-post__add-section" type="button">
                                <span aria-hidden="true">+</span>
                                Add section
                            </button>
                        </div>
                    </div>
                </details>
            </div>
            <PublicationSummary />
        </form>
    );
};
export default CreatePostForm;
