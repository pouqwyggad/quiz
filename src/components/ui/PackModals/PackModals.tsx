import React, { FC, PropsWithChildren, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { motion } from "framer-motion";
import { Checkbox } from '@mui/material';
import classes from './PackModals.module.scss';
import { CloseIcon } from '../../icons/CloseIcon';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import {
  addNewPackAsync, deletePackAsync, editPackNameAsync, getPacksAsync,
} from '../../../store/packsSlice';
import { modalContainer, modalMotion } from "../../../motions/modalMotion";

interface PackModalsProps {
  updateTotal?: (total: number) => void;
  ROWS_PER_PAGE?: number;
  onClick: () => void;
  packName?: string;
  type: string;
  id?: string;
}

export const PackModals: FC<PropsWithChildren<PackModalsProps>> = (
  {
    ROWS_PER_PAGE,
    updateTotal,
    packName,
    onClick,
    type,
    id = '',
  },
) => {
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
      const res = await dispatch(getPacksAsync({}));
      if (res.meta.requestStatus === 'fulfilled') {
        if (updateTotal) {
          updateTotal(Math.ceil(res.payload.cardPacksTotalCount / (ROWS_PER_PAGE || 8)));
        }
      }
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
      const res = await dispatch(getPacksAsync({}));
      if (res.meta.requestStatus === 'fulfilled') {
        if (updateTotal) {
          updateTotal(Math.ceil(res.payload.cardPacksTotalCount / (ROWS_PER_PAGE || 8)));
        }
      }
    }
  };

  return (
    <motion.div
      className={classes.Wrapper}
      animate="animate"
      exit="exit"
      variants={modalContainer}
    >
      <motion.div
        className={classes.Container}
        variants={modalMotion}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={classes.Title}>
          <h3>
            {type === 'add' && 'Add new pack'}
            {type === 'edit' && 'Edit pack'}
            {type === 'delete' && 'Delete Pack'}
          </h3>

          <CloseIcon onClick={onClick} />
        </div>

        <hr />

        {type === 'delete' && (
          <div className={classes.DeleteModalText}>
            Do you really want to remove
            {' '}
            <b>{packName}</b>
            ? All cards will be deleted.
          </div>
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
      </motion.div>
    </motion.div>
  );
};

PackModals.defaultProps = {
  id: '',
  packName: 'this Pack',
  updateTotal: () => {},
  ROWS_PER_PAGE: 8,
};
