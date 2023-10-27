import React, { FC, PropsWithChildren, useState } from 'react';
import classes from './SwitchButtons.module.scss';
import { filterPacksByIdAsync, getPacksAsync } from '../../../store/packsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';

interface SwitchButtonsProps {
}

export const SwitchButtons: FC<PropsWithChildren<SwitchButtonsProps>> = () => {
  const dispatch = useAppDispatch();
  const [currentButton, setCurrentButton] = useState<string | null>('all');
  const [buttonMyIsDisabled, setButtonMyIsDisabled] = useState(false);
  const USER_ID = useAppSelector((state) => state.auth.user._id);

  const filterPacksByMy = () => {
    setButtonMyIsDisabled(true);
    dispatch(filterPacksByIdAsync({ USER_ID })).then(() => setButtonMyIsDisabled(false));
  };
  const filterPacksByAll = () => {
    setButtonMyIsDisabled(true);
    dispatch(getPacksAsync()).then(() => setButtonMyIsDisabled(false));
  };

  return (
    <div className={classes.SwitchPacksContainer}>
      <button
        type="button"
        onClick={() => {
          setCurrentButton('my');
          filterPacksByMy();
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
          filterPacksByAll();
        }}
        className={`${currentButton === 'all' ? classes.SwitchActive : classes.Switch}`}
        disabled={buttonMyIsDisabled || currentButton === 'all'}
      >
        All
      </button>
    </div>
  );
};
