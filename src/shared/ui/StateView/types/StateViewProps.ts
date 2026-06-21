import {ReactNode} from "react"

export type StateViewVariant = 'loading' | 'error' | 'empty';
export type StateViewSize = 'page' | 'section';
export type StateViewProps = {
    variant: StateViewVariant;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
    size?: StateViewSize;
}