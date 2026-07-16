import { useGetCategoriesQuery } from '@/entities/category';
import Button from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { TextArea } from '@/shared/ui/TextArea';
import { useForm } from '@/shared/lib/form';

import { validateCreatePostForm } from '../../lib/validateCreatePostForm';
import { initialContentSections } from '../../model/initialContentSections';
import type { CreatePostFormValues } from '../../model/types';
import CreatePostContentSection from '../CreatePostContentSection/CreatePostContentSection';
import PublicationSummary from '../PublicationSummary/PublicationSummary';

const createPostInitialValues: CreatePostFormValues = {
    title: '',
    description: '',
    categoryId: '',
    bannerImage: null as File | null,
    bannerAlt: '',
    introduction: '',
    sections: {
        overview: {
            title: '',
            paragraphs: {
                context: '',
                details: '',
            },
        },
        applications: {
            title: '',
            paragraphs: {
                examples: '',
            },
        },
    },
};

const CreatePostForm = () => {
    const {
        data: categories = [],
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
        refetch: refetchCategories,
    } = useGetCategoriesQuery();

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.label,
    }));
    const { values, errors, touched, onBlur, onChange, setFieldTouched, handleSubmit } = useForm(
        createPostInitialValues,
        validateCreatePostForm,
    );

    const categoryError = isCategoriesError ? 'Failed to load categories' : undefined;
    const categoryPlaceholder = isCategoriesLoading ? 'Loading categories...' : 'Select a category';
    const categoryFieldError =
        categoryError ?? (touched.categoryId ? errors.categoryId : undefined);
    const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        setFieldTouched('bannerImage');
    };
    const selectedCategory = categories.find((category) => category.id === values.categoryId);

    return (
        <form
            className="create-post__layout"
            onSubmit={(event) => void handleSubmit(event)}
            noValidate
        >
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
                                error={touched.title ? errors.title : undefined}
                                className="create-post__field create-post__field--wide"
                            >
                                <Input
                                    id="post-title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter a compelling title for your publication"
                                    value={values.title}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    aria-describedby={
                                        touched.title && errors.title
                                            ? 'post-title-error'
                                            : undefined
                                    }
                                    aria-invalid={touched.title && errors.title ? true : undefined}
                                />
                            </FormField>

                            <FormField
                                id="post-description"
                                label="Short description"
                                required
                                error={touched.description ? errors.description : undefined}
                                className="create-post__field create-post__field--wide"
                            >
                                <TextArea
                                    className="create-post__short-description"
                                    id="post-description"
                                    name="description"
                                    placeholder="Write a short summary that describes your publication"
                                    value={values.description}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    aria-describedby={
                                        touched.description && errors.description
                                            ? 'post-description-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        touched.description && errors.description ? true : undefined
                                    }
                                />
                            </FormField>

                            <FormField
                                id="post-category"
                                label="Category"
                                required
                                error={categoryFieldError}
                                className="create-post__field"
                            >
                                <Select
                                    id="post-category"
                                    name="categoryId"
                                    options={categoryOptions}
                                    placeholder={categoryPlaceholder}
                                    value={values.categoryId}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    disabled={isCategoriesLoading || isCategoriesError}
                                    className="create-post__select"
                                    aria-describedby={
                                        categoryFieldError ? 'post-category-error' : undefined
                                    }
                                    aria-invalid={categoryFieldError ? true : undefined}
                                />
                                {isCategoriesError && (
                                    <Button
                                        className="create-post__text-button"
                                        type="button"
                                        onClick={() => void refetchCategories()}
                                    >
                                        Try again
                                    </Button>
                                )}
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
                                error={touched.bannerImage ? errors.bannerImage : undefined}
                                className="create-post__field"
                            >
                                <Input
                                    className="create-post__file-input"
                                    id="banner-image"
                                    name="bannerImage"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleBannerImageChange}
                                    required
                                    aria-describedby={
                                        touched.bannerImage && errors.bannerImage
                                            ? 'banner-image-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        touched.bannerImage && errors.bannerImage ? true : undefined
                                    }
                                />

                                <label className="create-post__upload" htmlFor="banner-image">
                                    <span className="create-post__upload-icon" aria-hidden="true">
                                        ↑
                                    </span>
                                    <span className="create-post__upload-title">
                                        {values.bannerImage
                                            ? values.bannerImage.name
                                            : 'Upload banner image'}
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
                                error={touched.bannerAlt ? errors.bannerAlt : undefined}
                                className="create-post__field"
                            >
                                <TextArea
                                    className="create-post__banner-alt"
                                    id="banner-alt"
                                    name="bannerAlt"
                                    placeholder="Describe the image for accessibility"
                                    value={values.bannerAlt}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required
                                    aria-describedby={
                                        touched.bannerAlt && errors.bannerAlt
                                            ? 'banner-alt-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        touched.bannerAlt && errors.bannerAlt ? true : undefined
                                    }
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
                            error={touched.introduction ? errors.introduction : undefined}
                            className="create-post__field"
                        >
                            <TextArea
                                className="create-post__introduction"
                                id="post-introduction"
                                name="introduction"
                                placeholder="Write an introduction that sets the context for your readers"
                                value={values.introduction}
                                onChange={onChange}
                                onBlur={onBlur}
                                required
                                aria-describedby={
                                    touched.introduction && errors.introduction
                                        ? 'post-introduction-error'
                                        : undefined
                                }
                                aria-invalid={
                                    touched.introduction && errors.introduction ? true : undefined
                                }
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
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    onChange={onChange}
                                    onBlur={onBlur}
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

            <PublicationSummary values={values} categoryLabel={selectedCategory?.label} />
        </form>
    );
};

export default CreatePostForm;
