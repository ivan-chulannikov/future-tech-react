import { Button } from "../Button"
import type { TabButtonProps } from "./types/TabButtonProps"

const TabButton = ({ className = '',children,onClick,isActive,tabId,panelId,onKeyDown}: TabButtonProps) => {
    
    return (
        <Button 
        type="button"
        onClick = {onClick} 
        onKeyDown = {onKeyDown}
        className = {isActive ?`${className} is-active`: `${className}`} 
        role = "tab" 
        aria-selected = {isActive ? true : false} 
        tabIndex = {isActive ? 0 : -1} 
        id = {tabId} 
        aria-controls = {panelId}>
           {children}
        </Button>
    )
}
export default TabButton
