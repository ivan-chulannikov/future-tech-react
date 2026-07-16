import type { FormErrors } from '@/shared/lib/form';

import { initialContentSections } from '../model/initialContentSections';
import type { CreatePostFormValues } from '../model/types';

const acceptedBannerTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maximumBannerSize = 5 * 1024 * 1024;

export const validateCreatePostForm = (
    values: CreatePostFormValues,
): FormErrors<CreatePostFormValues> => {
    const errors: FormErrors<CreatePostFormValues> = {};

    if (!values.title.trim()) {
        errors.title = 'Enter a title';
    }

    if (!values.description.trim()) {
        errors.description = 'Enter a short description';
    }

    if (!values.categoryId) {
        errors.categoryId = 'Select a category';
    }

    if (!values.bannerImage) {
        errors.bannerImage = 'Upload a banner image';
    } else if (!acceptedBannerTypes.includes(values.bannerImage.type)) {
        errors.bannerImage = 'Use a JPEG, PNG or WebP image';
    } else if (values.bannerImage.size > maximumBannerSize) {
        errors.bannerImage = 'Banner image must be no larger than 5 MB';
    }

    if (!values.bannerAlt.trim()) {
        errors.bannerAlt = 'Enter alternative text';
    }

    if (!values.introduction.trim()) {
        errors.introduction = 'Enter an introduction';
    }

    initialContentSections.forEach((section) => {
        const sectionValues = values.sections[section.id];
        const titlePath = `sections.${section.id}.title` as const;

        if (!sectionValues?.title.trim()) {
            errors[titlePath] = 'Enter a section title';
        }

        section.paragraphs.forEach((paragraph) => {
            if (!('required' in paragraph) || !paragraph.required) {
                return;
            }

            const paragraphPath = `sections.${section.id}.paragraphs.${paragraph.id}` as const;

            if (!sectionValues?.paragraphs[paragraph.id]?.trim()) {
                errors[paragraphPath] = 'Enter paragraph text';
            }
        });
    });

    return errors;
};
