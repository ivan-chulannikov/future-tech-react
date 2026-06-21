import { useId } from 'react';

import type { StateViewProps } from './types/StateViewProps';



const StateView = ({
  variant,
  title,
  description,
  action,
  className = '',
  size,
}: StateViewProps) => {
  const titleId = useId();
  const isLoading = variant === 'loading';
  const isError = variant === 'error';

  return (
    <section
      className={`state-view state-view--${variant}  state-view--${size} ${className}`}
      aria-labelledby={titleId}
      aria-live={isLoading ? 'polite' : undefined}
      aria-busy={isLoading}
      role={isError ? 'alert' : 'status'}
    >
      <div className="state-view__inner container">
        <div className="state-view__body">
          <p className="state-view__tag tag">
            {isLoading && 'Loading'}
            {variant === 'error' && 'Something went wrong'}
            {variant === 'empty' && 'No data'}
          </p>
          <h1 className="state-view__title" id={titleId}>
            {title}
          </h1>
          {description && (
            <p className="state-view__description">{description}</p>
          )}
          {action && <div className="state-view__actions">{action}</div>}
        </div>
        {isLoading && (
          <div className="state-view__loader" aria-hidden="true" />
        )}
      </div>
    </section>
  );
};

export default StateView;