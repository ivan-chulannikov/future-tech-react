import { Button } from '@/shared/ui/Button';
import type { SectionHeaderProps } from './types/SectionHeaderTypes';

const SectionHeader = (props: SectionHeaderProps) => {
  const { subTitle, title } = props;

  return (
    <header className="section__header">
      <div className="section__header-inner container">
        <div className="section__header-info">
          <p className="section__subtitle tag">{subTitle}</p>
          <h2 className="section__title">{title}</h2>
        </div>

        {props.buttonText && props.buttonTo && (
          <Button to={props.buttonTo} className="section__link" icon="arrow-yellow">
            {props.buttonText}
          </Button>
        )}

        {props.buttonText && props.buttonHref && (
          <Button href={props.buttonHref} className="section__link" icon="arrow-yellow">
            {props.buttonText}
          </Button>
        )}
      </div>
    </header>
  );
};

export default SectionHeader;