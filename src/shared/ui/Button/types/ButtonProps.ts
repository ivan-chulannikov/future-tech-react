import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LinkProps } from 'react-router-dom';

type CommonButtonProps = {
  className?: string;
  children: ReactNode;
  icon?: string;
};

type ButtonAsButtonProps = CommonButtonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonButtonProps> & {
    to?: never;
    href?: never;
  };

type ButtonAsExternalLinkProps = CommonButtonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonButtonProps | 'href' | 'type'> & {
    href: string;
    to?: never;
  };

type ButtonAsRouterLinkProps = CommonButtonProps &
  Omit<LinkProps, keyof CommonButtonProps | 'to'> & {
    to: LinkProps['to'];
    href?: never;
  };

export type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsExternalLinkProps
  | ButtonAsRouterLinkProps;