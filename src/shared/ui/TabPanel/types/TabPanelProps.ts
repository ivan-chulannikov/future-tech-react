import { ReactNode } from "react"

export type TabPanelProps = {
    children: ReactNode;
    isActive: boolean;
    id: string;
    labelledBy: string;
    
}