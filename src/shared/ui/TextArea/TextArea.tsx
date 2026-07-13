import type { TextAreaProps } from './types';

const TextArea = ({ className = 'field__control', ...props }: TextAreaProps) => {
    return <textarea className={className} {...props} />;
};

export default TextArea;
