import React, { FC, PropsWithChildren, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import classes from './PackActions.module.scss';
import { CloseIcon } from '../../icons/CloseIcon';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import {
  addNewPackAsync, deletePackAsync, editPackNameAsync, getCardsAsync,
} from '../../../store/cardsSlice';

interface AddNewPackProps {
  onClick: () => void
  type: string
  id?: string
  packName?: string
}

export const PackActions: FC<PropsWithChildren<AddNewPackProps>> = ({
  onClick, type, id = '', packName,
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [privatePack, setPrivatePack] = useState(false);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const addCardHandler = async () => {
    dispatch(addNewPackAsync({ name, privatePack }));
    onClick();
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    dispatch(getCardsAsync());
  };

  const editPackHandler = async () => {
    dispatch(editPackNameAsync({ id, name }));
    onClick();
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    dispatch(getCardsAsync());
  };

  const deleteCardHandler = async () => {
    dispatch(deletePackAsync({ id }));
    onClick();
    // await new Promise((resolve) => { setTimeout(resolve, 1000); });
    dispatch(getCardsAsync());
  };

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Container}>
        <div className={classes.Title}>
          <h3>
            {type === 'add' && 'Add new pack'}
            {type === 'edit' && 'Edit pack'}
            {type === 'delete' && 'Delete Pack'}
          </h3>
          <CloseIcon
            onClick={onClick}
          />
        </div>

        <hr />

        {type === 'delete' && (
        <p className={classes.DeleteModalText}>
          Do you really want to remove
          {' '}
          <b>{packName}</b>
          ? All cards will be deleted.
        </p>
        )}

        {type !== 'delete' && (
        <>

          <div className={classes.ContainerSectionTwo}>
            <TextField
              onChange={handleChangeValue}
              text="Name pack"
              name={type}
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

        </>
        )}

        <div className={classes.ButtonsContainer}>

          <Button
            sidePadding={28}
            type="white"
            text="Cancel"
            onClick={onClick}
          />

          {type === 'add' && (
            <Button
              sidePadding={44}
              type="blue"
              text="Save"
              onClick={addCardHandler}
            />
          )}

          {type === 'edit' && (
          <Button
            sidePadding={44}
            type="blue"
            text="Save"
            onClick={editPackHandler}
          />
          )}

          {type === 'delete' && (
          <Button
            sidePadding={44}
            type="red"
            text="Save"
            onClick={deleteCardHandler}
          />
          )}

        </div>
      </div>
    </div>
  );
};

PackActions.defaultProps = {
  id: '',
  packName: 'this Pack',
};
