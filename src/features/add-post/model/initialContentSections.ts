import type { CreatePostSectionConfig } from './types';

export const initialContentSections = [
    {
        id: 'overview',
        paragraphs: [
            {
                id: 'context',
                placeholder: 'Write the first paragraph of this section',
                required: true,
            },
            {
                id: 'details',
                placeholder: 'Write another paragraph',
            },
        ],
    },
    {
        id: 'applications',
        paragraphs: [
            {
                id: 'examples',
                placeholder: 'Write the first paragraph of this section',
                required: true,
            },
        ],
    },
] as const satisfies readonly CreatePostSectionConfig[];
