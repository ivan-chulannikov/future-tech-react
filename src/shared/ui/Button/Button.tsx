import type { ButtonProps } from './types/ButtonProps';

const Button = (props: ButtonProps) => {
  if (typeof props.href === 'string') {
    const { className = '', children, href, icon = '', ...rest } = props;

    return (
      <a href={href} className={`${className} button`} {...rest}>
        {icon && <span className={`icon icon--${icon}`}>{children}</span>}
        {!icon && children}
      </a>
    );
  }

  const { className = '', children, icon = '', type = 'button', ...rest } = props;

  return (
    <button type={type} className={`${className} button`} {...rest}>
      {icon && <span className={`icon icon--${icon}`}>{children}</span>}
      {!icon && children}
    </button>
  );
};

export default Button;