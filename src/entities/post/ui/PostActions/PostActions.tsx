import type { PostActionsProps } from './types/PostActionsProps';
const PostActions = ({shares, children }: PostActionsProps) => {
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
