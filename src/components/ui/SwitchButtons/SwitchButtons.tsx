import React, { FC, PropsWithChildren, useState } from 'react';
import classes from './SwitchButtons.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { getPacksAsync } from '../../../store/packsSlice';

interface SwitchButtonsProps {
}

export const SwitchButtons: FC<PropsWithChildren<SwitchButtonsProps>> = () => {
  const dispatch = useAppDispatch();
  const [currentButton, setCurrentButton] = useState<string | null>('all');
  const [buttonMyIsDisabled, setButtonMyIsDisabled] = useState(false);
  const USER_ID = useAppSelector((state) => state.auth.user._id);

  return (
    <div className={classes.SwitchPacksContainer}>
      <button
        type="button"
        onClick={() => {
          setCurrentButton('my');
          setButtonMyIsDisabled(true);
          dispatch(getPacksAsync({ USER_ID })).then(() => setButtonMyIsDisabled(false));
        }}
        className={`${currentButton === 'my' ? classes.SwitchActive : classes.Switch}`}
        disabled={buttonMyIsDisabled || currentButton === 'my'}
      >
        My
      </button>
      <button
        type="button"
        onClick={() => {
          setCurrentButton('all');
          setButtonMyIsDisabled(true);
          dispatch(getPacksAsync({})).then(() => setButtonMyIsDisabled(false));
        }}
        className={`${currentButton === 'all' ? classes.SwitchActive : classes.Switch}`}
        disabled={buttonMyIsDisabled || currentButton === 'all'}
      >
        All
      </button>
    </div>
  );
};
