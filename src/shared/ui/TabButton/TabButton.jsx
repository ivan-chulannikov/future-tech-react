import { Button } from "../Button"

const TabButton = (props) => {
    const {
        className = '',
        children,
        onClick,
        isActive,
        tabId,
        panelId,
        onKeyDown,
    } = props
    
    return (
        <Button 
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
