import React, { FC, PropsWithChildren } from 'react';
import classes from './SwitchButtons.module.scss';
import { useAppSelector } from '../../../hooks/hook';
import { IRequest } from '../../../interfaces/RequestFilters';

interface SwitchButtonsProps {
  onValueChange: (newValue: IRequest) => void;
  value: string;
}

export const SwitchButtons: FC<PropsWithChildren<SwitchButtonsProps>> = (
  {
    value,
    onValueChange,
  },
) => {
  const USER_ID = useAppSelector((state) => state.auth.user._id);

  return (
    <div className={classes.Container}>
      <button
        className={`${value !== '' ? classes.SwitchActive : classes.Switch}`}
        onClick={() => onValueChange({ currentUser: USER_ID })}
        type="button"
      >
        My
      </button>
      <button
        className={`${value === '' ? classes.SwitchActive : classes.Switch}`}
        onClick={() => onValueChange({ currentUser: '' })}
        type="button"
      >
        All
      </button>
    </div>
  );
};
