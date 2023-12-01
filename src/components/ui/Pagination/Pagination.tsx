import React, {
  FC, PropsWithChildren,
} from 'react';
import { motion } from "framer-motion";
import classes from './Pagination.module.scss';
import { PagArrowLeftIcon } from '../../icons/PagArrowLeftIcon';
import { PagArrowRightIcon } from '../../icons/PagArrowRightIcon';
import { IRequest } from '../../../interfaces/RequestFilters';
import { paginationMotion } from "../../../motions/paginationMotion";

interface PaginationProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void;
  clickHandler: (page: number, type: number) => void;
  onChange: (newValue: IRequest) => void;
  ROWS_PER_PAGE: number;
  separator: string;
  current: number;
  total: number;
}

export const Pagination: FC<PropsWithChildren<PaginationProps>> = (
  {
    ROWS_PER_PAGE,
    clickHandler,
    separator,
    onChange,
    onClick,
    current,
    total,
  },
) => {
  const showAfterFirst = current < 5;
  const showBeforeLast = current > total - 4;

  const createArrayButtons = (quantity: number, startNumber: number) => {
    const newArr = [...Array.from({ length: quantity })];
    return newArr.map((n, i) => startNumber + i);
  };

  const buttonsToRender = total > 8
    ? [
      1,
      showAfterFirst && createArrayButtons(4, 2),
      !showAfterFirst && separator,
      !(showAfterFirst || showBeforeLast) && createArrayButtons(3, current),
      !showBeforeLast && separator,
      showBeforeLast && createArrayButtons(4, total - 4),
      total,
    ]
      .flat()
      .filter(Boolean)
    : createArrayButtons(total, 1);

  return (
    <motion.div
      variants={paginationMotion}
      className={classes.PaginationWrapper}
      initial="initial"
      animate="animate"
    >
      <div className={classes.PaginationContainer}>

        <PagArrowLeftIcon onClick={() => clickHandler(current, -1)} />

        <div className={classes.PaginationRow}>

          {buttonsToRender.map((number, index) => (number === separator ? (
            <div className={classes.Separator} key={index}>
              {separator}
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => onClick(e, +number)}
              key={index}
              className={`${classes.Item} ${number === current ? classes.ItemActive : ''}`}
              data-page={number}
            >
              {number}
            </button>
          )))}

        </div>

        <PagArrowRightIcon onClick={() => clickHandler(current, 1)} />

      </div>

      <div className={classes.PaginationCardsValue}>
        Show

        <select
          className={classes.Select}
          value={ROWS_PER_PAGE}
          onChange={(e) => onChange({ rowsPerPage: +e.target.value })}
        >
          <option value={10}>10</option>
          <option value={8}>8</option>
          <option value={6}>6</option>
        </select>

        Cards per Page
      </div>

    </motion.div>
  );
};
