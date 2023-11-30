import React, { FC, PropsWithChildren } from 'react';

interface LogoIconProps {
  className: string[]
}

export const LogoIcon: FC<PropsWithChildren<LogoIconProps>> = ({ className }) => (
  <div className={className[0]}>
    <span className={className[1]} />
    <span className={className[2]} />
  </div>
);
