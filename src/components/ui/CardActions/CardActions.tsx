import React, {
  FC, PropsWithChildren, useState,
} from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { motion } from "framer-motion";
import classes from './CardActions.module.scss';
import { CloseIcon } from '../../icons/CloseIcon';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import {
  addCardAsync,
  deleteCardAsync,
  editCardAsync,
  getCardsAsync,
} from '../../../store/cardsSlice';
import { modalContainer, modalMotion } from "../../../motions/modalMotion";

interface CardActionsProps {
  onClick: () => void;
  type: string;
  CARD_ID?: string;
  PACK_ID?: string;
  ROWS_PER_PAGE: number;
  updateTotal?: (total: number) => void;
}

export const CardActions: FC<PropsWithChildren<CardActionsProps>> = (
  {
    onClick,
    type,
    CARD_ID = '',
    PACK_ID = '',
    ROWS_PER_PAGE,
    updateTotal,
  },
) => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectValue, setSelectValue] = useState('Text');

  // eslint-disable-next-line max-len
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value);
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value);

  const addCardHandler = async () => {
    const firstRequest = await dispatch(addCardAsync({ question, answer, PACK_ID }));
    onClick();

    if (firstRequest.meta.requestStatus === 'fulfilled') {
      const res = await dispatch(getCardsAsync({ PACK_ID }));
      if (res.meta.requestStatus === 'fulfilled') {
        if (updateTotal) {
          updateTotal(Math.ceil(res.payload.cardsTotalCount / (ROWS_PER_PAGE || 8)));
        }
      }
    }
  };

  const deleteCardHandler = async () => {
    const firstRequest = await dispatch(deleteCardAsync({ CARD_ID }));
    onClick();

    if (firstRequest.meta.requestStatus === 'fulfilled') {
      const res = await dispatch(getCardsAsync({ PACK_ID }));
      if (res.meta.requestStatus === 'fulfilled') {
        if (updateTotal) {
          updateTotal(Math.ceil(res.payload.cardsTotalCount / (ROWS_PER_PAGE || 8)));
        }
      }
    }
  };

  const editPackHandler = async () => {
    const firstRequest = await dispatch(editCardAsync({ question, answer, CARD_ID }));
    onClick();

    if (firstRequest.meta.requestStatus === 'fulfilled') {
      dispatch(getCardsAsync({ PACK_ID }));
    }
  };

  return (
    <motion.div
      className={classes.Wrapper}
      variants={modalContainer}
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={classes.Container}
        variants={modalMotion}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={classes.Title}>

          {type === 'add' && 'Add new card'}
          {type === 'delete' && 'Delete card'}
          {type === 'edit' && 'Edit card'}

          <CloseIcon onClick={onClick} />
        </div>

        <hr />

        {type === 'delete' && (
          <div className={classes.DeleteText}>
            Do you really want to remove this card?
          </div>
        )}

        {type !== 'delete' && (
          <>
            <div className={classes.SelectContainer}>
              <div className={classes.SelectText}>Choose a question format</div>

              <FormControl fullWidth>
                <Select
                  onChange={(e) => setSelectValue(e.target.value)}
                  className={classes.Input}
                  id="demo-simple-select"
                  value={selectValue}
                >
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="Something">Something</MenuItem>
                  <MenuItem value="Something 2">Something 2</MenuItem>
                </Select>
              </FormControl>

            </div>

            <div className={classes.TextAreaContainer}>
              <TextField
                onChange={handleChangeQuestion}
                name="question"
                text="Question"
              />

              <TextField
                onChange={handleChangeAnswer}
                name="answer"
                text="Answer"
              />
            </div>
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

CardActions.defaultProps = {
  CARD_ID: '',
  PACK_ID: '',
  updateTotal: () => {},
};
