import React, { FC, PropsWithChildren } from 'react';
import classes from './SwitchButtons.module.scss';
import { useAppSelector } from '../../../hooks/hook';
import { IRequest } from '../../../interfaces/RequestFilters';

interface SwitchButtonsProps {
  value: string
  onValueChange: (newValue: IRequest) => void;
}

export const SwitchButtons: FC<PropsWithChildren<SwitchButtonsProps>> = (
  { value, onValueChange },
) => {
  const USER_ID = useAppSelector((state) => state.auth.user._id);

  return (
    <div className={classes.SwitchPacksContainer}>
      <button
        className={`${value !== '' ? classes.SwitchActive : classes.Switch}`}
        onClick={() => {
          onValueChange({ currentUser: USER_ID });
        }}
        type="button"
      >
        My
      </button>
      <button
        type="button"
        onClick={() => {
          onValueChange({ currentUser: '' });
        }}
        className={`${value === '' ? classes.SwitchActive : classes.Switch}`}
      >
        All
      </button>
    </div>
  );
};
