import { ReactNode, createElement } from 'react';
import styles from './Typography.module.css';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption';
type TypographyColor = 'primary' | 'secondary' | 'error';
type TypographyWeight = 'regular' | 'medium' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right';

interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  gutterBottom?: boolean;
  className?: string;
}

export const Typography = ({
  children,
  variant = 'body1',
  color = 'primary',
  weight = 'regular',
  align = 'left',
  gutterBottom = false,
  className = '',
}: TypographyProps) => {
  const element = variant.startsWith('h') ? variant : 'p';
  
  const classes = [
    styles.text,
    styles[variant],
    styles[color],
    styles[weight],
    styles[align],
    gutterBottom && styles.gutterBottom,
    className
  ].filter(Boolean).join(' ');

  return createElement(element, { className: classes }, children);
}; 