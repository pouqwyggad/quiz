import React, {
  FC, PropsWithChildren, useCallback, useState,
} from 'react';
import classes from './Main.module.scss';
import { Filters } from '../../ui/Filters/Filters';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Button } from '../../ui/Button/Button';
import { PackActions } from '../../ui/PackActions/PackActions';
import { useAppSelector } from '../../../hooks/hook';
import { Pack } from '../../../interfaces/Packs';
import { LayoutList } from '../../ui/LayoutList/LayoutList';

interface MainProps {}

const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number): number => Math.ceil(rowCount / ROWS_PER_PAGE);

export const Main: FC<PropsWithChildren<MainProps>> = () => {
  const cards = useAppSelector((state) => state.packs.cardsInfo.cardPacks);
  const [dataset] = useState<Pack[]>(cards);
  const [page, setPage] = useState(1);
  const [newPackStatus, setNewPackStatus] = useState<boolean>(false);
  const addCardHandler = () => {
    setNewPackStatus((n) => !n);
  };

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = dataset ? getTotalPageCount(dataset.length) : current;
    setPage(next <= total ? next : current);
  }, [page, dataset]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;
    setPage(prev > 0 ? prev : current);
  }, [page]);

  return (
    <div className={classes.Main}>
      <div className="flex justify-between mb-[34px]">

        <div className={classes.PageTitle}>Packs List</div>

        <Button
          sidePadding={28}
          type="blue"
          text="Add new pack"
          onClick={addCardHandler}
        />

        {newPackStatus && (
          <PackActions
            onClick={addCardHandler}
            type="add"
          />
        )}

      </div>

      <Filters />

      {cards.length > 0 ? (
        <>
          <LayoutList
            data={cards}
          />

          <Pagination
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: page === 1,
              right: page === getTotalPageCount(dataset.length),
            }}
            nav={{ current: page, total: getTotalPageCount(dataset.length) }}
          />
        </>
      ) : (
        <div className={classes.NoPacks}>
          <div className={classes.Title}>No packages found. Add new pack</div>

          <Button
            sidePadding={28}
            type="blue"
            text="Add new pack"
            onClick={addCardHandler}
          />

          {newPackStatus && (
            <PackActions
              onClick={addCardHandler}
              type="add"
            />
          )}
        </div>
      )}

    </div>
  );
};
