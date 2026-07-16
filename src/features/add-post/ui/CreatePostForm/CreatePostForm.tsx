import Button from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { TextArea } from '@/shared/ui/TextArea';

import { initialContentSections } from '../../model/initialContentSections';
import CreatePostContentSection from '../CreatePostContentSection/CreatePostContentSection';
import PublicationSummary from '../PublicationSummary/PublicationSummary';

const categoryOptions = [
    {
        value: 'artificial-intelligence',
        label: 'Artificial Intelligence',
    },
    {
        value: 'robotics',
        label: 'Robotics',
    },
    {
        value: 'technology',
        label: 'Technology',
    },
    {
        value: 'space',
        label: 'Space',
    },
] as const;

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
                            <FormField
                                id="post-title"
                                label="Title"
                                required
                                className="create-post__field create-post__field--wide"
                            >
                                <Input
                                    id="post-title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter a compelling title for your publication"
                                    required
                                />
                            </FormField>

                            <FormField
                                id="post-description"
                                label="Short description"
                                required
                                className="create-post__field create-post__field--wide"
                            >
                                <TextArea
                                    className="create-post__short-description"
                                    id="post-description"
                                    name="description"
                                    placeholder="Write a short summary that describes your publication"
                                    required
                                />
                            </FormField>

                            <FormField
                                id="post-category"
                                label="Category"
                                required
                                className="create-post__field"
                            >
                                <Select
                                    id="post-category"
                                    name="categoryId"
                                    options={categoryOptions}
                                    placeholder="Select a category"
                                    defaultValue=""
                                    required
                                    className="create-post__select"
                                />
                            </FormField>
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
                            <FormField
                                id="banner-image"
                                label="Banner image"
                                required
                                className="create-post__field"
                            >
                                <Input
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
                            </FormField>

                            <FormField
                                id="banner-alt"
                                label="Alternative text"
                                required
                                className="create-post__field"
                            >
                                <TextArea
                                    className="create-post__banner-alt"
                                    id="banner-alt"
                                    name="bannerAlt"
                                    placeholder="Describe the image for accessibility"
                                    required
                                />
                            </FormField>
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
                        <FormField
                            id="post-introduction"
                            label="Introduction"
                            required
                            className="create-post__field"
                        >
                            <TextArea
                                className="create-post__introduction"
                                id="post-introduction"
                                name="introduction"
                                placeholder="Write an introduction that sets the context for your readers"
                                required
                            />
                        </FormField>
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
                            {initialContentSections.map((section, sectionIndex) => (
                                <CreatePostContentSection
                                    key={section.id}
                                    section={section}
                                    position={sectionIndex + 1}
                                />
                            ))}

                            <Button className="create-post__add-section" type="button">
                                <span aria-hidden="true">+</span>
                                Add section
                            </Button>
                        </div>
                    </div>
                </details>
            </div>

            <PublicationSummary />
        </form>
    );
};

export default CreatePostForm;
