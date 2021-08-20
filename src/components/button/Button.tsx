import './Button.css';
import { Button as BootstrapButton, Image } from 'react-bootstrap';
import { ButtonProps } from '../../Type';
import { useState } from 'react';
import Loader from 'components/Loader';

export const Button = ({
  homeBuyBtn,
  type,
  variant,
  isLoading,
  img,
  label,
  loadingMessage,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <BootstrapButton
      disabled={isLoading}
      className={homeBuyBtn ? `button click-effect ${className} homeBuyBtn` : `button click-effect ${className}`}
      type={type}
      variant={variant}
      onClick={() => onClick && onClick()}
    >
      {isLoading && <Loader message={loadingMessage || 'Saving...'} />}
      {!isLoading && img && <Image src={img} />}
      {!isLoading && label}
    </BootstrapButton>
  );
};
