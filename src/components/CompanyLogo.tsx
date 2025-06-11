import React from 'react';

interface CompanyLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const CompanyLogo = ({ src, alt, className }: CompanyLogoProps) => (
  <img
    src={src}
    alt={alt}
    className={`${className} object-contain grayscale group-hover:grayscale-0 transition-all duration-300`}
  />
);

export default CompanyLogo; 