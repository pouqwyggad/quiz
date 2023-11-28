import React, {
  FC, PropsWithChildren, useEffect, useState,
} from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Main.module.scss';
import { Filters } from '../../ui/Filters/Filters';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Button } from '../../ui/Button/Button';
import { PackActions } from '../../ui/PackActions/PackActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { LayoutList } from '../../ui/LayoutList/LayoutList';
import { IRequest } from '../../../interfaces/RequestFilters';
import { getPacksAsync } from '../../../store/packsSlice';
import { mainPageMotion } from "../../../motions/mainPageMotion";

interface MainProps {}

export const Main: FC<PropsWithChildren<MainProps>> = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.packs.cardsInfo);
  const [request, setRequest] = useState<IRequest>({
    searchValue: '',
    value: [0, 130],
    currentUser: '',
    rowsPerPage: 8,
    sort: '0updated',
  });
  const [newPackStatus, setNewPackStatus] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableStatus, setTableStatus] = useState('');
  const debouncedSearch = useDebounce(request, 500);

  const updatePacksData = async () => dispatch(getPacksAsync({
    searchValue: request.searchValue,
    MIN: request.value ? request.value[0] : 0,
    MAX: request.value ? request.value[1] : 130,
    currentUser: request.currentUser,
    page: currentPage,
    rowsPerPage: request.rowsPerPage,
    sortPacks: request.sort,
  }));
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    setCurrentPage(page);
  };
  const clickPaginationButtons = (page: number, type: number) => {
    if ((page === 1 && type === -1) || (page === totalPages && type === 1)) return;
    setCurrentPage(page + type);
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
      rowsPerPage: 8,
    });
  };
  const addCardHandler = () => setNewPackStatus((n) => !n);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearch) return;

      const res = await updatePacksData();

      if (res.meta.requestStatus === 'fulfilled') {
        if (res.payload.cardsPack !== 0) setTableStatus('success');
        else setTableStatus('empty');

        if (request.rowsPerPage !== undefined) {
          setTotalPages(Math.ceil(res.payload.cardPacksTotalCount / request.rowsPerPage));
        }
      }
    };

    fetchData();
  }, [debouncedSearch, currentPage]);

  return (
    <motion.div
      className={classes.Main}
      variants={mainPageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex justify-between mb-[34px]">
        <div className={classes.PageTitle}>Packs List</div>

        <Button
          sidePadding={28}
          type="blue"
          text="Add new pack"
          onClick={addCardHandler}
        />

        <AnimatePresence>
          {newPackStatus && (
          <PackActions
            onClick={addCardHandler}
            type="add"
            updateTotal={setTotalPages}
            ROWS_PER_PAGE={request.rowsPerPage || 8}
          />
          )}
        </AnimatePresence>
      </div>

      <Filters
        requestValues={request}
        onChange={changeRequestValues}
        onReset={resetRequestValue}
      />

      {tableStatus === 'success' ? (
        <>
          <LayoutList
            data={cards.cardPacks}
            rowsPerPage={request.rowsPerPage || 8}
            updateTotal={setTotalPages}
            onChangeRequest={changeRequestValues}
            request={request}
          />

          <Pagination
            total={totalPages}
            current={currentPage}
            separator="..."
            onClick={clickHandler}
            onChange={changeRequestValues}
            ROWS_PER_PAGE={request.rowsPerPage || 8}
            clickHandler={clickPaginationButtons}
          />
        </>
      ) : (
        <div className={classes.Spinner}>
          <Stack sx={{ color: '#366eff' }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}

      {tableStatus === 'empty' && (
      <div className={classes.NoPacks}>
        <div className={classes.Title}>No packages found. Add new pack</div>

        <Button
          sidePadding={28}
          type="blue"
          text="Add new pack"
          onClick={addCardHandler}
        />

        <AnimatePresence>
          {newPackStatus && (
          <PackActions
            onClick={addCardHandler}
            type="add"
            updateTotal={setTotalPages}
            ROWS_PER_PAGE={request.rowsPerPage}
          />
          )}
        </AnimatePresence>
      </div>
      )}

    </motion.div>
  );
};
