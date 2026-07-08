import type { PostActionsProps } from './types/PostActionsProps';
const PostActions = ({views, shares, children }: PostActionsProps) => {
    return (
        <div className="blog-details__actions actions">
            <ul className="blog-actions__list">
              
                <li className="blog-actions__item">
                    <button type="button" className="blog-actions__button">
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
                        <span>{views}</span>
                    </button>
                </li>
                <li className="blog-actions__item">
                    <button type="button" className="blog-actions__button">
                        <span className="blog-actions__icon-wrapper">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.36554 11.6345L3.47679 9.41238C2.80399 9.10656 2.83269 8.14126 3.52248 7.87595L15.7501 3.17301C16.4241 2.9138 17.0863 3.57599 16.8271 4.24995L12.1241 16.4776C11.8588 17.1674 10.8935 17.1961 10.5877 16.5233L8.36554 11.6345ZM8.36554 11.6345L12.0195 7.98071"
                                    stroke="#666666"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <span>{shares}</span>
                    </button>
                </li>
                {children}
            </ul>
        </div>
    );
};
export default PostActions;
