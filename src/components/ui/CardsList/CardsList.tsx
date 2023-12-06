import React, {
  FC, PropsWithChildren,
} from 'react';
import Skeleton from '@mui/material/Skeleton';
import { motion } from "framer-motion";
import classes from './CardsList.tsx.module.scss';
import { DropDownArrowIcon } from '../../icons/DropDownArrowIcon';
import { Card } from '../../../interfaces/Cards';
import { useAppSelector } from '../../../hooks/hook';
import { CardRowItem, ListMotion } from '../../../motions/listMotion';
import { IRequest } from "../../../interfaces/RequestFilters";
import { CardListItem } from "./CardListItem/CardListItem";

interface CardsListProps {
  sortByGrade: (newValue: IRequest) => void;
  updateTotal: (total: number) => void;
  resetUI: () => void;
  rowsPerPage: number;
  request: IRequest;
  data: Card[];
  path: string;
}

export const CardsList: FC<PropsWithChildren<CardsListProps>> = (
  {
    data,
    rowsPerPage,
    updateTotal,
    sortByGrade,
    request,
    resetUI,
    path,
  },
) => {
  const isLoading = useAppSelector((state) => state.cards.loading);
  const changeSortHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    request.sort === '0grade' ? sortByGrade({ sort: '1grade' }) : sortByGrade({ sort: '0grade' });
  };

  return (
    <motion.div
      className={classes.Container}
      variants={ListMotion}
      initial="initial"
      animate="animate"
    >
      <div className={classes.Table}>

        <div className={classes.Row}>
          <div className={classes.RowCellOne}>Question</div>
          <div className={classes.RowCellTwo}>Answer</div>
          <div className={classes.RowCellThree}>Last Updated</div>

          <button
            className={classes.RowCellFour}
            onClick={changeSortHandler}
            type="button"
          >
            Grade
            <DropDownArrowIcon rotate={request.sort === '0grade' ? 0 : 180} />
          </button>
        </div>

        {isLoading && (
          Array.from(Array(data.length).keys()).map((n, i) => (
            <motion.div
              className={classes.SkeletonRow}
              variants={CardRowItem}
              initial="initial"
              animate="animate"
              exit="exit"
              key={i}
            >
              <Skeleton
                className={classes.SkeletonRowItem}
                variant="rectangular"
                animation="wave"
                width="96%"
              />
            </motion.div>
          ))
        )}

        {data && !isLoading && (
          data.map((item: Card) => (
            <CardListItem
              ROWS_PER_PAGE={rowsPerPage}
              updateTotal={updateTotal}
              path={path}
              item={item}
              key={item._id}
              resetUI={resetUI}
            />
          ))
        )}

      </div>
    </motion.div>
  );
};
