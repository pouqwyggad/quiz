import React, {
  FC, PropsWithChildren, useState,
} from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { motion } from "framer-motion";
import classes from './CardModals.module.scss';
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
import { Cards } from "../../../interfaces/Cards";

interface CardModalsProps {
  updateTotal?: (total: number) => void;
  currentQuestion?: string;
  currentAnswer?: string;
  ROWS_PER_PAGE: number;
  onClick: () => void;
  CARD_ID?: string;
  PACK_ID?: string;
  type: string;
  // eslint-disable-next-line react/require-default-props
  updateGet?: () => Promise<Cards>
}

export const CardModals: FC<PropsWithChildren<CardModalsProps>> = (
  {
    currentQuestion = '',
    ROWS_PER_PAGE,
    currentAnswer = '',
    updateTotal,
    onClick,
    CARD_ID = '',
    PACK_ID = '',
    type,
    updateGet,
  },
) => {
  const dispatch = useAppDispatch();
  const [selectValue, setSelectValue] = useState('Text');
  const [values, setValues] = useState<Record<string, string>>({
    question: currentQuestion,
    answer: currentAnswer,
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addCardHandler = async () => {
    const firstRequest = await dispatch(addCardAsync({
      question: values.question,
      answer: values.answer,
      PACK_ID,
    }));

    onClick();

    if (firstRequest.meta.requestStatus === 'fulfilled') {
      if (updateGet) {
        const res = await updateGet();

        if (updateTotal) {
          // @ts-ignore
          updateTotal(Math.ceil(res.payload.cardsTotalCount / (ROWS_PER_PAGE || 8)));
          console.log(res);
        }
      }
    }
  };

  const deleteCardHandler = async () => {
    const firstRequest = await dispatch(deleteCardAsync({ CARD_ID }));

    onClick();

    if (firstRequest.meta.requestStatus === 'fulfilled') {
      if (updateGet) {
        const res = await updateGet();

        if (updateTotal) {
          // @ts-ignore
          updateTotal(Math.ceil(res.payload.cardsTotalCount / (ROWS_PER_PAGE || 8)));
          console.log(res);
        }
      }
    }
  };

  const editPackHandler = async () => {
    const firstRequest = await dispatch(editCardAsync({
      question: values.question,
      answer: values.answer,
      CARD_ID,
    }));

    onClick();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    firstRequest.meta.requestStatus === 'fulfilled' && dispatch(getCardsAsync({ PACK_ID }));
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
            Do you really want to remove
            <b>{` ${currentQuestion} `}</b>
            card?
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
                onChange={handleChangeValues}
                name="question"
                text="Question"
                user={values}
              />

              <TextField
                onChange={handleChangeValues}
                name="answer"
                text="Answer"
                user={values}
              />

            </div>
          </>
        )}

        <div className={classes.ButtonsContainer}>

          <Button
            onClick={onClick}
            sidePadding={28}
            text="Cancel"
            type="white"
          />

          {type === 'add' && (
            <Button
              onClick={addCardHandler}
              sidePadding={44}
              type="blue"
              text="Save"
            />
          )}

          {type === 'edit' && (
            <Button
              onClick={editPackHandler}
              sidePadding={44}
              text="Edit"
              type="blue"
            />
          )}

          {type === 'delete' && (
            <Button
              onClick={deleteCardHandler}
              sidePadding={44}
              text="Delete"
              type="red"
            />
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};

CardModals.defaultProps = {
  updateTotal: () => {},
  currentQuestion: '',
  currentAnswer: '',
  PACK_ID: '',
  CARD_ID: '',
};
