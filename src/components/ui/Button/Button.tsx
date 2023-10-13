import React, { FC, PropsWithChildren } from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  sidePadding: number
  type: string
  text: string
  onClick?: () => void
  // eslint-disable-next-line react/no-unused-prop-types
  isFormValid?: Record<string, boolean>
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  onClick, sidePadding, type, text, children,
}) => {
  const changeHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      style={{
        padding: `8px ${sidePadding}px`,
      }}
      className={`${classes.Button} ${type === 'blue' ? classes.ButtonBlue : classes.ButtonWhite}`}
      onClick={changeHandler}
    >
      {children}
      {text}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  isFormValid: {},
};
