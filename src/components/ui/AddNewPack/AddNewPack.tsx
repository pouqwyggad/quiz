import React, { FC, PropsWithChildren, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import classes from './AddNewPack.module.scss';
import { CloseIcon } from '../../icons/CloseIcon';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import { addNewPackAsync, getCardsAsync } from '../../../store/cardsSlice';

interface AddNewPackProps {
  onClick: () => void
}

export const AddNewPack: FC<PropsWithChildren<AddNewPackProps>> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [privatePack, setPrivatePack] = useState(false);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const addCardHandler = () => {
    dispatch(addNewPackAsync({ name, privatePack }));
    onClick();
    dispatch(getCardsAsync());
  };

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Container}>
        <div className={classes.Title}>
          <h3>Add new pack</h3>
          <CloseIcon
            onClick={onClick}
          />
        </div>

        <hr />

        <div className={classes.ContainerSectionTwo}>
          <TextField
            onChange={handleChangeValue}
            text="Add new pack"
            name="addPack"
            packName={name}
          />
        </div>

        <FormControlLabel
          className={classes.CheckBox}
          label="Private pack"
          control={(
            <Checkbox
              checked={privatePack}
              onChange={() => {
                setPrivatePack((prevState) => !prevState);
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            )}
        />

        <div className={classes.ButtonsContainer}>
          <Button
            sidePadding={28}
            type="white"
            text="Cancel"
            onClick={onClick}
          />
          <Button
            sidePadding={44}
            type="blue"
            text="Save"
            onClick={addCardHandler}
          />
        </div>
      </div>
    </div>
  );
};
