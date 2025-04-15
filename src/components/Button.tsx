import { ButtonHTMLAttributes, ReactNode } from 'react';
import '../styles/Button.css';

type ButtonVariant = 'info' | 'submit';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export const Button = ({
  children,
  variant = 'info',
  className = '',
  ...props
}: ButtonProps) => {
  const classes = [
    'button',
    variant === 'info' && 'button-info',
    variant === 'submit' && 'button-submit',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}; 