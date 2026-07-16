import Button from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { TextArea } from '@/shared/ui/TextArea';

import type { CreatePostContentSectionProps } from './types';

const CreatePostContentSection = ({
    section,
    position,
    values,
    errors,
    touched,
    onChange,
    onBlur,
}: CreatePostContentSectionProps) => {
    const sectionTitleId = `post-section-${section.id}-title`;
    const sectionTitleName = `sections.${section.id}.title` as const;
    const sectionValues = values.sections[section.id];
    const sectionTitleError = touched[sectionTitleName] ? errors[sectionTitleName] : undefined;

    return (
        <article className="create-post__content-section">
            <div className="create-post__content-section-header">
                <span className="create-post__drag-handle" aria-hidden="true">
                    ⋮⋮
                </span>

                <span className="create-post__section-number">{position}</span>

                <FormField
                    id={sectionTitleId}
                    label="Section title"
                    required
                    error={sectionTitleError}
                    className="create-post__section-title-field"
                >
                    <Input
                        className="field__control create-post__section-title-control"
                        id={sectionTitleId}
                        name={sectionTitleName}
                        type="text"
                        placeholder="Enter section title"
                        value={sectionValues.title}
                        onChange={onChange}
                        onBlur={onBlur}
                        required
                        aria-describedby={sectionTitleError ? `${sectionTitleId}-error` : undefined}
                        aria-invalid={sectionTitleError ? true : undefined}
                    />
                </FormField>

                <div className="create-post__section-actions">
                    <Button
                        className="create-post__icon-button"
                        type="button"
                        aria-label={`Collapse section ${position}`}
                    >
                        ↑
                    </Button>

                    <Button
                        className="create-post__icon-button"
                        type="button"
                        aria-label={`Delete section ${position}`}
                    >
                        ×
                    </Button>
                </div>
            </div>

            <div className="create-post__paragraphs">
                {section.paragraphs.map((paragraph, paragraphIndex) => {
                    const paragraphId = `post-section-${section.id}-paragraph-${paragraph.id}`;
                    const paragraphName =
                        `sections.${section.id}.paragraphs.${paragraph.id}` as const;
                    const paragraphError = touched[paragraphName]
                        ? errors[paragraphName]
                        : undefined;

                    return (
                        <FormField
                            key={paragraph.id}
                            id={paragraphId}
                            label={`Paragraph ${paragraphIndex + 1}`}
                            required={paragraph.required}
                            error={paragraphError}
                            className="create-post__paragraph-field"
                        >
                            <TextArea
                                className="create-post__paragraph"
                                id={paragraphId}
                                name={paragraphName}
                                placeholder={paragraph.placeholder}
                                value={sectionValues.paragraphs[paragraph.id]}
                                onChange={onChange}
                                onBlur={onBlur}
                                required={paragraph.required}
                                aria-describedby={
                                    paragraphError ? `${paragraphId}-error` : undefined
                                }
                                aria-invalid={paragraphError ? true : undefined}
                            />
                        </FormField>
                    );
                })}
            </div>

            <Button className="create-post__text-button" type="button">
                <span aria-hidden="true">+</span>
                Add paragraph
            </Button>
        </article>
    );
};

export default CreatePostContentSection;
