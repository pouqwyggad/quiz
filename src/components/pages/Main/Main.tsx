import React, {
  FC, PropsWithChildren, useEffect, useState,
} from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import classes from './Main.module.scss';
import { Filters } from '../../ui/Filters/Filters';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Button } from '../../ui/Button/Button';
import { PackActions } from '../../ui/PackActions/PackActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { LayoutList } from '../../ui/LayoutList/LayoutList';
import { IRequest } from '../../../interfaces/RequestFilters';
import { getPacksAsync } from '../../../store/packsSlice';

interface MainProps {}

export const Main: FC<PropsWithChildren<MainProps>> = () => {
  const [request, setRequest] = useState<IRequest>({
    searchValue: '',
    value: [0, 130],
    currentUser: '',
    rowsPerPage: 8,
  });
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.packs.cardsInfo);
  const [newPackStatus, setNewPackStatus] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(request, 500);

  const updatePacksData = () => dispatch(getPacksAsync({
    searchValue: request.searchValue,
    MIN: request.value ? request.value[0] : 0,
    MAX: request.value ? request.value[1] : 130,
    currentUser: request.currentUser,
    page: currentPage,
    rowsPerPage: request.rowsPerPage,
  }));
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    setCurrentPage(page);
  };

  const clickNextPageHandler = (page: number) => {
    setCurrentPage(page + 1);
  };

  const clickPrevPageHandler = (page: number) => {
    setCurrentPage(page - 1);
  };
  const changeRequestValues = (newValue: IRequest) => {
    setRequest((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const resetRequestValue = () => {
    setRequest({
      searchValue: '',
      value: [0, 130],
      currentUser: '',
    });
  };
  const addCardHandler = () => {
    setNewPackStatus((n) => !n);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearch) {
        const res = await updatePacksData();

        if (res.meta.requestStatus === 'fulfilled' && request.rowsPerPage !== undefined) {
          setTotalPages(Math.ceil(res.payload.cardPacksTotalCount / request.rowsPerPage));
        }
      }
    };

    fetchData();
  }, [debouncedSearch, currentPage]);

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

      <Filters
        requestValues={request}
        onChange={changeRequestValues}
        onReset={resetRequestValue}
      />

      {cards.cardPacks.length > 0 ? (
        <>
          <LayoutList
            data={cards.cardPacks}
            rowsPerPage={request.rowsPerPage || 8}
          />

          <Pagination
            total={totalPages}
            current={currentPage}
            separator="..."
            onClick={clickHandler}
            onChange={changeRequestValues}
            ROWS_PER_PAGE={request.rowsPerPage || 8}
            clickNext={clickNextPageHandler}
            clickPrev={clickPrevPageHandler}
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
