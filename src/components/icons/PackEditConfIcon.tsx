import React, { FC, PropsWithChildren } from 'react';

interface PackEditConfIconProps {
  className?: string
}

export const PackEditConfIcon: FC<PropsWithChildren<PackEditConfIconProps>> = ({ className }) => (
  <div className={className}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="#0D0C0B" />
      <circle cx="12.0005" cy="8.50024" r="0.875" fill="black" />
      <circle cx="12.0005" cy="11.9998" r="0.875" fill="black" />
      <circle cx="12.0005" cy="15.5" r="0.875" fill="black" />
    </svg>
  </div>
);

PackEditConfIcon.defaultProps = {
  className: '',
};
