import type { CommentPostButtonProps } from './types';

const CommentPostButton = ({ isActive, onClick, comments }: CommentPostButtonProps) => {
    
    return (
        <button
            type="button"
            className={`blog-actions__button ${isActive ? 'is-active' : ''} `}
            onClick={onClick}
        >
            <span className="blog-actions__icon-wrapper">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.07167 15.9906C7.95564 16.4235 8.94952 16.6666 10.0002 16.6666C13.6821 16.6666 16.6668 13.6819 16.6668 9.99992C16.6668 6.31802 13.6821 3.33325 10.0002 3.33325C6.31827 3.33325 3.3335 6.31802 3.3335 9.99992C3.3335 11.3667 3.7448 12.6374 4.45038 13.695M7.07167 15.9906L3.3335 16.6666L4.45038 13.695M7.07167 15.9906L7.07709 15.9897M4.45038 13.695L4.45144 13.6922"
                        stroke="#666666"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            {comments}
        </button>
    );
};
export default CommentPostButton;
