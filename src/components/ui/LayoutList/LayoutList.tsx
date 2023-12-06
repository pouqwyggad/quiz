import React, { FC, PropsWithChildren } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { motion } from 'framer-motion';
import classes from './LayoutList.module.scss';
import { Pack } from '../../../interfaces/Packs';
import { useAppSelector } from '../../../hooks/hook';
import { DropDownArrowIcon } from '../../icons/DropDownArrowIcon';
import { IRequest } from '../../../interfaces/RequestFilters';
import { CardRowItem } from "../../../motions/listMotion";
import { ListItem } from "./ListItem/ListItem";

interface LayoutListProps {
  onChangeRequest: (newValue: IRequest) => void;
  updateTotal: (total: number) => void;
  rowsPerPage: number;
  request: IRequest;
  data: Pack[];
}

export const LayoutList: FC<PropsWithChildren<LayoutListProps>> = (
  {
    onChangeRequest,
    rowsPerPage,
    updateTotal,
    request,
    data,
  },
) => {
  const isLoading = useAppSelector((state) => state.packs.loading);

  const handleRequestHandler = () => {
    if (request.sort === '0updated') {
      onChangeRequest({ sort: '1updated' });
    } else {
      onChangeRequest({ sort: '0updated' });
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Table}>
        <div className={classes.Row}>
          <div className={classes.RowCellOne}>Name</div>
          <div className={classes.RowCellTwo}>Cards</div>
          <div className={classes.RowCellThree}>
            <button
              onClick={handleRequestHandler}
              className={classes.ClickArea}
              type="button"
            >
              Last Updated
              <DropDownArrowIcon rotate={request.sort === '0updated' ? 0 : 180} />
            </button>
          </div>
          <div className={classes.RowCellFour}>Created by</div>
          <div className={classes.RowCellFive}>Actions</div>
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
                className={classes.Skeleton}
                animation="wave"
                variant="rectangular"
                width="96%"
              />
            </motion.div>
          ))
        )}

        {data && !isLoading && (
          data.map((item: Pack) => (
            <ListItem
              item={item}
              updateTotal={updateTotal}
              rowsPerPage={rowsPerPage}
              key={item._id}
            />
          ))
        )}

      </div>
    </div>
  );
};
