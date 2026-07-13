import { Link } from 'react-router-dom';
import type { ButtonProps } from './types/ButtonProps';

const renderContent = (children: ButtonProps['children'], icon?: string) => {
    if (icon) {
        return <span className={`icon icon--${icon}`}>{children}</span>;
    }

    return children;
};

const Button = (props: ButtonProps) => {
    if (props.to !== undefined) {
        const { className = '', children, icon = '', to, ...rest } = props;

        return (
            <Link to={to} className={`button ${className}`.trim()} {...rest}>
                {renderContent(children, icon)}
            </Link>
        );
    }

    if (props.href !== undefined) {
        const { className = '', children, href, icon = '', ...rest } = props;

        return (
            <a href={href} className={`button ${className}`.trim()} {...rest}>
                {renderContent(children, icon)}
            </a>
        );
    }

    const { className = '', children, icon = '', type = 'button', ...rest } = props;

    return (
        <button type={type} className={`button ${className}`.trim()} {...rest}>
            {renderContent(children, icon)}
        </button>
    );
};

export default Button;
