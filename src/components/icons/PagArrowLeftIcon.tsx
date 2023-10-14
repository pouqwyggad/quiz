import React, { FC, PropsWithChildren } from 'react';

interface PagArrowLeftIconProps {
  className?: string
}

export const PagArrowLeftIcon: FC<PropsWithChildren<PagArrowLeftIconProps>> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
  >
    <path d="M5 1L1 4.43182L5 7.93306" stroke="black" />
  </svg>
);

PagArrowLeftIcon.defaultProps = {
  className: '',
};
