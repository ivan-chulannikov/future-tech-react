import type { ReactNode, KeyboardEventHandler } from 'react';

export type TabButtonProps = {
    className: string;
    children: ReactNode;
    onClick: () => void;
    isActive: boolean;
    tabId: string;
    panelId: string;
    onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
};
