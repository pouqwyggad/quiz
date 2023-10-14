import React, { FC, PropsWithChildren } from 'react';

interface UserIconProps {
  className?: string
}

export const UserIcon: FC<PropsWithChildren<UserIconProps>> = ({ className }) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M7.99996 8.00004C9.84091 8.00004 11.3333 6.50766 11.3333 4.66671C11.3333 2.82576 9.84091 1.33337 7.99996 1.33337C6.15901 1.33337 4.66663 2.82576 4.66663 4.66671C4.66663 6.50766 6.15901 8.00004 7.99996 8.00004Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7266 14.6667C13.7266 12.0867 11.16 10 7.99998 10C4.83998 10 2.27332 12.0867 2.27332 14.6667"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

UserIcon.defaultProps = {
  className: '',
};
