import React, { FC, PropsWithChildren } from 'react';

interface LogOutIconProps {
  className?: string
}

export const LogOutIcon: FC<PropsWithChildren<LogOutIconProps>> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M11.6267 9.74671L13.3333 8.04004L11.6267 6.33337"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.50665 8.04004H13.2867"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.83999 13.3333C4.89332 13.3333 2.50665 11.3333 2.50665 7.99996C2.50665 4.66663 4.89332 2.66663 7.83999 2.66663"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

LogOutIcon.defaultProps = {
  className: '',
};
