import { Button } from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
   

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__inner container">
        <div className="not-found__body">
          <p className="not-found__tag tag">Error 404</p>

          <h1 className="not-found__title" id="not-found-title">
            Page Not Found
          </h1>

          <p className="not-found__description">
            The page you are looking for does not exist or has been moved.
            Return to the homepage and continue exploring FutureTech.
          </p>

          <div className="not-found__actions">
            <Button to="/" className="not-found__button" icon="arrow-yellow">
              Back to Home
            </Button>
          </div>
        </div>

        <aside className="not-found__info" aria-label="Page status">
          <p className="not-found__code" aria-hidden="true">
            404
          </p>

          <div className="not-found__info-body">
            <h2 className="not-found__info-title">Lost in the future?</h2>

            <p className="not-found__info-description">
              This route is not available yet. Use the homepage to get back to
              the main content.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default NotFound;