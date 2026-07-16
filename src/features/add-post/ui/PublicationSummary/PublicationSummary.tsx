import Button from '@/shared/ui/Button';
import type { PublicationSummaryProps } from './types';
import { useObjectUrl } from '@/shared/lib/file';
import { useAppSelector } from '@/app/store/hooks';
import { selectUser } from '@/features/auth';
const PublicationSummary = ({ values, categoryLabel }: PublicationSummaryProps) => {
    const bannerPreview = useObjectUrl(values.bannerImage);
    const sectionTexts = Object.values(values.sections).flatMap((section) => [
        section.title,
        ...Object.values(section.paragraphs),
    ]);

    const publicationText = [
        values.title,
        values.description,
        values.introduction,
        ...sectionTexts,
    ].join(' ');

    const wordCount = publicationText.trim() ? publicationText.trim().split(/\s+/).length : 0;
    const wordsPerMinute = 200;
    const readingTime = wordCount > 0 ? Math.ceil(wordCount / wordsPerMinute) : 0;
    const user = useAppSelector(selectUser);
    const authorName = user?.username ?? 'FutureTech author';
    const authorInitials = authorName
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();

    return (
        <aside className="create-post__sidebar">
            <div className="create-post__summary">
                <header className="create-post__summary-header">
                    <h2 className="create-post__summary-title">Publication summary</h2>

                    <p className="create-post__summary-description">
                        Review the publication before sending it.
                    </p>
                </header>
                {bannerPreview ? (
                    <img
                        className="create-post__banner-preview"
                        src={bannerPreview}
                        alt={values.bannerAlt || 'Banner preview'}
                    />
                ) : (
                    <div
                        className="create-post__banner-preview"
                        role="img"
                        aria-label="Banner preview placeholder"
                    />
                )}

                <dl className="create-post__summary-list">
                    <div className="create-post__summary-row">
                        <dt>Category</dt>
                        <dd>{categoryLabel ? categoryLabel : 'Choose category'}</dd>
                    </div>

                    <div className="create-post__summary-row">
                        <dt>Sections</dt>
                        <dd>{Object.keys(values.sections).length}</dd>
                    </div>

                    <div className="create-post__summary-row">
                        <dt>Words</dt>
                        <dd>{wordCount}</dd>
                    </div>

                    <div className="create-post__summary-row">
                        <dt>Reading time</dt>
                        <dd>{readingTime} min</dd>
                    </div>
                </dl>

                <div className="create-post__author">
                    {user?.avatarSrc ? (
                        <img className="create-post__author-avatar" src={user.avatarSrc} alt="" />
                    ) : (
                        <span className="create-post__author-avatar" aria-hidden="true">
                            {authorInitials}
                        </span>
                    )}

                    <span className="create-post__author-content">
                        <span className="create-post__author-label">Author</span>
                        <strong className="create-post__author-name">{authorName}</strong>
                    </span>
                </div>

                <div className="create-post__actions">
                    <Button type="button" className="create-post__preview-button">
                        Preview
                    </Button>

                    <Button type="submit" className="button--accent create-post__publish-button">
                        Publish
                    </Button>
                </div>

                <p className="create-post__draft-status">
                    Draft changes will be saved automatically
                </p>
            </div>
        </aside>
    );
};
export default PublicationSummary;
