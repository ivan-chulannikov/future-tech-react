import type { LinkProps } from 'react-router-dom';

type SectionHeaderBaseProps = {
  subTitle: string;
  title: string;
};

type SectionHeaderWithoutButton = {
  buttonText?: undefined;
  buttonTo?: never;
  buttonHref?: never;
};

type SectionHeaderWithRouterLink = {
  buttonText: string;
  buttonTo: LinkProps['to'];
  buttonHref?: never;
};

type SectionHeaderWithExternalLink = {
  buttonText: string;
  buttonHref: string;
  buttonTo?: never;
};

export type SectionHeaderProps = SectionHeaderBaseProps &
  (
    | SectionHeaderWithoutButton
    | SectionHeaderWithRouterLink
    | SectionHeaderWithExternalLink
  );