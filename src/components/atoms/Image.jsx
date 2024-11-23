import React from 'react';

const Image = ({
  src,
  width = '24px',
  height = '24px',
  alt = 'image',
  className = ''
}) => (
  <img
    src={src}
    width={width}
    height={height}
    alt={alt}
    className={className}
  />
);

export default Image;
