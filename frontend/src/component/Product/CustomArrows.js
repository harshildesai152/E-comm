import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CustomPrevArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowLeft
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowRight
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );
};

export { CustomPrevArrow, CustomNextArrow };
