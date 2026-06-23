import { SectionHeader } from '@/shared/ui/SectionHeader';
import ReviewsList from './ReviewsList';

const ReviewsSection = () => {
    return (
        <section className="section">
            <SectionHeader
                subTitle="What Our Readers Say"
                title="Real Words from Real Readers"
                buttonText=" View All Testimonials"
                buttonHref="#"
            />
            <div className="section__body">
                <ReviewsList />
            </div>
        </section>
    );
};
export default ReviewsSection;
