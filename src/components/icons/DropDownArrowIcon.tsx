import React, { FC, PropsWithChildren } from 'react';

interface DropDownArrowIconProps {
  className?: string
  rotate: number
}

export const DropDownArrowIcon: FC<PropsWithChildren<DropDownArrowIconProps>> = (
  { className, rotate },
) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="6"
    viewBox="0 0 10 6"
    transform={`rotate(${rotate})`}
    rotate="90"
  >
    <path d="M5 6L0.669872 0L9.33013 0L5 6Z" fill="black" />
  </svg>
);

DropDownArrowIcon.defaultProps = {
  className: '',
};
