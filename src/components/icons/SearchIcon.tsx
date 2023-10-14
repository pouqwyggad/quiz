import React, { FC, PropsWithChildren } from 'react';

interface SearchIconProps {
  className?: string
}

export const SearchIcon: FC<PropsWithChildren<SearchIconProps>> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g opacity="0.4">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5714 6.85711C11.5714 9.46074 9.46073 11.5714 6.85711 11.5714C4.25348 11.5714 2.14282 9.46074 2.14282 6.85711C2.14282 4.25348 4.25348 2.14282 6.85711 2.14282C9.46073 2.14282 11.5714 4.25348 11.5714 6.85711ZM10.5288 11.2358C9.53578 12.0694 8.25507 12.5714 6.85711 12.5714C3.70119 12.5714 1.14282 10.013 1.14282 6.85711C1.14282 3.7012 3.70119 1.14282 6.85711 1.14282C10.013 1.14282 12.5714 3.7012 12.5714 6.85711C12.5714 8.25502 12.0694 9.53569 11.2359 10.5287L14.0679 13.3607C14.2631 13.5559 14.2631 13.8725 14.0679 14.0678C13.8726 14.263 13.556 14.263 13.3608 14.0678L10.5288 11.2358Z"
        fill="black"
      />
    </g>
  </svg>
);

SearchIcon.defaultProps = {
  className: '',
};
