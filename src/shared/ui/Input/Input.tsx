import type { InputProps } from './types/types';
const Input = ({ className = 'field__control', ...props }: InputProps) => {
    return <input className={className} {...props} />;
};

export default Input;
