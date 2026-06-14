import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CommonButtonProps = {
  className?: string;
  children: ReactNode;
  icon?: string;
};

type ButtonAsButtonProps = CommonButtonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonButtonProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = CommonButtonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonButtonProps | 'type' | 'href'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;