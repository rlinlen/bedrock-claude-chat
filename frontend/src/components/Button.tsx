import React, { forwardRef } from 'react';
import { BaseProps } from '../@types/common';
import { PiSpinnerGap } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';

type Props = BaseProps & {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  text?: boolean;
  outlined?: boolean;
  loading?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(
        'flex items-center justify-center whitespace-nowrap rounded-lg border p-1 px-3',
        props.text && 'border-0 dark:text-aws-font-color-dark',
        props.outlined && 'border-aws-squid-ink-light/50 dark:border-aws-font-color-gray/50 hover:bg-white dark:hover:bg-aws-ui-color-dark dark:text-aws-font-color-dark',
        !props.text &&
          !props.outlined &&
          'bg-aws-sea-blue-light dark:bg-aws-ui-color-dark dark:border-aws-ui-color-dark text-aws-font-color-white-light dark:text-aws-font-color-white-dark',
        props.disabled || props.loading ? 'opacity-30' : 'hover:brightness-75',
        props.className
      )}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.onClick();
      }}
      disabled={props.disabled || props.loading}>
      {props.icon && !props.loading && (
        <div className="-ml-1 mr-2">{props.icon}</div>
      )}
      {props.loading && <PiSpinnerGap className="-ml-1 mr-2 animate-spin" />}
      {props.children}
      {props.rightIcon && <div className="ml-2">{props.rightIcon}</div>}
    </button>
  );
});

export default Button;
