import { any, element, oneOf, string } from 'prop-types';
import './index.scss';

interface PropsType {
  children: any;
  className?: string;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  variant?: 'secondary' | 'primary';
  inline?: boolean;
}

export default function InfoText({ className, children, size = 'md', variant = 'primary', inline = false }: PropsType) {
  return <p className={`info-text ${className} ${size} ${variant} ${inline ? 'inline' : ''}`}>{children}</p>;
}
