import React, { FC, PropsWithChildren, useState } from 'react';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import classes from './CardActions.module.scss';
import { CloseIcon } from '../../icons/CloseIcon';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import { addCardAsync, getCardsAsync } from '../../../store/cardsSlice';

interface CardActionsProps {
  onClick: () => void
  type: string
  id?: string
}

export const CardActions: FC<PropsWithChildren<CardActionsProps>> = ({
  onClick, type, id = '',
}) => {
  const dispatch = useAppDispatch();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectValue, setSelectValue] = useState('Text');

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  const addCardHandler = async () => {
    dispatch(addCardAsync({ question, answer, id }));
    onClick();
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    dispatch(getCardsAsync({ id }));
  };

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Container}>
        <div className={classes.Title}>
          <h3>
            {type === 'add' && 'Add new card'}
          </h3>
          <CloseIcon
            onClick={onClick}
          />
        </div>

        <hr />

        <div className={classes.SelectContainer}>
          <div className={classes.SelectText}>Choose a question format</div>
          <FormControl fullWidth>
            <Select
              className={classes.Input}
              id="demo-simple-select"
              value={selectValue}
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
            >
              <MenuItem value="Text">Text</MenuItem>
              <MenuItem value="Something">Something</MenuItem>
              <MenuItem value="Something 2">Something 2</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classes.TextAreaContainer}>
          <TextField onChange={handleChangeQuestion} name="question" text="Question" />
          <TextField onChange={handleChangeAnswer} name="answer" text="Answer" />

        </div>
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

          {/* {type === 'edit' && ( */}
          {/* <Button */}
          {/*  sidePadding={44} */}
          {/*  type="blue" */}
          {/*  text="Edit" */}
          {/*  onClick={editPackHandler} */}
          {/* /> */}
          {/* )} */}

          {/* {type === 'delete' && ( */}
          {/* <Button */}
          {/*  sidePadding={44} */}
          {/*  type="red" */}
          {/*  text="Delete" */}
          {/*  onClick={deleteCardHandler} */}
          {/* /> */}
          {/* )} */}

        </div>
      </div>
    </div>
  );
};

CardActions.defaultProps = {
  id: '',
};
