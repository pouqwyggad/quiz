import React, {
  FC, PropsWithChildren, useEffect, useRef,
} from 'react';
import Skeleton from '@mui/material/Skeleton';
import { motion } from "framer-motion";
import classes from './CardsList.tsx.module.scss';
import { DropDownArrowIcon } from '../../icons/DropDownArrowIcon';
import { Card } from '../../../interfaces/Cards';
import { useAppSelector } from '../../../hooks/hook';
import { ListMotion } from '../../../motions/listMotion';
import { IRequest } from "../../../interfaces/RequestFilters";
import { CardListItem } from "./CardListItem/CardListItem";

interface CardsListProps {
  sortByGrade: (newValue: IRequest) => void;
  updateTotal: (total: number) => void;
  ROWS_PER_PAGE: number;
  rowsPerPage: number;
  request: IRequest;
  data: Card[];
}

export const CardsList: FC<PropsWithChildren<CardsListProps>> = (
  {
    data,
    rowsPerPage,
    updateTotal,
    ROWS_PER_PAGE,
    request,
    sortByGrade,
  },
) => {
  const isLoading = useAppSelector((state) => state.cards.loading);
  const path = useRef('');
  const changeSortHandler = () => {
    if (request.sort === '0grade') {
      sortByGrade({ sort: '1grade' });
    } else {
      sortByGrade({ sort: '0grade' });
    }
  };

  useEffect(() => {
    const url = window.location.pathname.split('/');
    path.current = url[url.length - 1];
  }, []);

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
          Array.from(Array(rowsPerPage).keys()).map((n, i) => (
            <div
              className={classes.SkeletonRow}
              key={i}
            >
              <Skeleton
                className={classes.SkeletonRowItem}
                variant="rectangular"
                animation="wave"
                width="98%"
              />
            </div>
          ))
        )}

        {data && !isLoading && (
          data.map((item: Card) => (
            <CardListItem
              ROWS_PER_PAGE={ROWS_PER_PAGE}
              updateTotal={updateTotal}
              path={path.current}
              item={item}
              key={item._id}
            />
          ))
        )}

      </div>
    </motion.div>
  );
};
