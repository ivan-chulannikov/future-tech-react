import type { ReactNode } from 'react';

export type StateViewVariant = 'loading' | 'error' | 'empty';
export type StateViewSize = 'page' | 'section';
export type StateViewTitleTag = 'h1' | 'h2' | 'h3';
export type StateViewProps = {
    variant: StateViewVariant;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
    size?: StateViewSize;
    titleAs?: StateViewTitleTag;
};
