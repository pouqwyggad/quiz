import React, { FC, PropsWithChildren } from 'react';

interface WatchInputIconProps {
  className?: string
}

export const WatchInputIcon: FC<PropsWithChildren<WatchInputIconProps>> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.23997 17 6.99997 14.76 6.99997 12C6.99997 9.24 9.23997 6.99999 12 6.99999C14.76 6.99999 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 8.99997 10.34 8.99997 12C8.99997 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
      fill="black"
    />
  </svg>
);

WatchInputIcon.defaultProps = {
  className: '',
};
