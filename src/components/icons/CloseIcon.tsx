import React, { FC, PropsWithChildren } from 'react';

interface CloseIconProps {
  className?: string
  onClick: () => void
}

export const CloseIcon: FC<PropsWithChildren<CloseIconProps>> = ({ className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
  >
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2847 0L7 6.28467L0.71635 0L0.357664 0.357664L0 0.714307L6.28467 7L0 13.2857L0.357664 13.6423L0.71635 14L7 7.71533L13.2847 14L13.6423 13.6423L14 13.2857L7.71533 7L14 0.714307L13.6423 0.357664L13.2847 0Z"
        fill="#2D2E46"
      />
    </svg>
  </button>
);

CloseIcon.defaultProps = {
  className: '',
};
