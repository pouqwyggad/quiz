import React, { FC, PropsWithChildren, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import classes from './PackActions.module.scss';
import { CloseIcon } from '../../icons/CloseIcon';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import {
  addNewPackAsync, deletePackAsync, editPackNameAsync, getPacksAsync,
} from '../../../store/packsSlice';

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
    const firstRequest = await dispatch(addNewPackAsync({ name, privatePack }));
    onClick();
    if (firstRequest.meta.requestStatus === 'fulfilled') {
      dispatch(getPacksAsync({}));
    }
  };

  const editPackHandler = async () => {
    const firstRequest = await dispatch(editPackNameAsync({ id, name }));
    onClick();
    if (firstRequest.meta.requestStatus === 'fulfilled') {
      dispatch(getPacksAsync({}));
    }
  };

  const deleteCardHandler = async () => {
    const firstRequest = await dispatch(deletePackAsync({ id }));
    onClick();
    if (firstRequest.meta.requestStatus === 'fulfilled') {
      dispatch(getPacksAsync({}));
    }
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
            text="Edit"
            onClick={editPackHandler}
          />
          )}

          {type === 'delete' && (
          <Button
            sidePadding={44}
            type="red"
            text="Delete"
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
