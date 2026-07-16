import type { TextAreaProps } from './types';

const TextArea = ({ className = '', ...props }: TextAreaProps) => {
    return <textarea className={`field__control ${className}`.trim()} {...props} />;
};

export default TextArea;
