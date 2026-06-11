const Button = (props) => {
    const {
        className = '',
        children,
        href,
        icon = '',
        type = 'button',
        ...rest






    } = props
    
    
    return(
       
        href ? (<a href = {href} className= {`${className} button`} {...rest}>
             
            {icon &&(
                <span className={`icon icon--${icon}`}>{children}</span>
            )}
            {!icon && children}
            </a>
            
        ) :  <button type={type} className= {`${className} button`} {...rest}>{children}</button> 
            
            
        

    )
}
export default Button