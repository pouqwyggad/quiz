import React, {
  FC, PropsWithChildren, useEffect, useRef, useState,
} from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useDebounce } from '@uidotdev/usehooks';
import { AnimatePresence, motion } from "framer-motion";
import classes from './PackPage.module.scss';
import { Button } from '../../ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { getCardsAsync } from '../../../store/cardsSlice';
import { PackActionsInside } from '../../ui/PackAnctionsInside/PackActionsInside';
import { CardModals } from '../../ui/CardModals/CardModals';
import { IRequest } from '../../../interfaces/RequestFilters';
import { mainPageMotion } from "../../../motions/mainPageMotion";
import { NoMatchesPack } from "./NoMatchesPack/NoMatchesPack";
import { CardSearch } from "../../ui/CardSearch/CardSearch";
import { CardsList } from "../../ui/CardsList/CardsList";
import { Pagination } from "../../ui/Pagination/Pagination";
import { CardsListMotion } from "../../../motions/listMotion";

interface PackPageProps {
}

export const PackPage: FC<PropsWithChildren<PackPageProps>> = () => {
  const dispatch = useAppDispatch();
  const packInfo = useAppSelector((state) => state.cards.packCards);
  const loading = useAppSelector((state) => state.cards.loading);
  const ID_USER = useAppSelector((state) => state.auth.user._id);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableStatus, setTableStatus] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(false);
  const path = useRef('');
  const [request, setRequest] = useState<IRequest>({
    PACK_ID: path.current,
    searchValue: '',
    sort: '0grade',
    rowsPerPage: 6,
  });
  const debouncedRequest = useDebounce(request, 500);
  const debouncePagination = useDebounce(currentPage, 700);

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

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    setCurrentPage(page);
  };

  const addCardHandler = () => setShow((n) => !n);

  const updateCardsData = async () => dispatch(getCardsAsync({
    cardQuestion: request.searchValue,
    rowsPerPage: request.rowsPerPage,
    sortCards: request.sort,
    PACK_ID: path.current,
    page: currentPage,
  }));

  useEffect(() => {
    const url = window.location.pathname.split('/');
    path.current = url[url.length - 1];
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedRequest) return;

      const res = await updateCardsData();

      const hasSearchValue = request.searchValue !== '';
      const cardsLength = res.payload.cards.length;
      const isCurrentUserPack = ID_USER === res.payload.packUserId;

      if (res.meta.requestStatus === 'fulfilled') {
        if (cardsLength > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          isCurrentUserPack ? setTableStatus('MyPackSuccess') : setTableStatus('StrangerPackSuccess');
        } else if (isCurrentUserPack) {
          setTableStatus('MyPackEmpty');
        } else {
          setTableStatus('StrangerPackEmpty');
        }

        if (cardsLength === 0 && hasSearchValue) {
          setTableStatus(isCurrentUserPack ? 'MyPackNoThisCard' : 'StrangerPackNoThisCard');
        }

        if (res.meta.requestStatus === 'fulfilled' && request.rowsPerPage !== undefined) {
          setTotalPages(Math.ceil(res.payload.cardsTotalCount / request.rowsPerPage));
        }
      }
    };

    fetchData();
  }, [debouncedRequest, debouncePagination, reset]);

  return (
    <motion.div
      className={classes.Container}
      variants={mainPageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className={classes.Title}>

        {loading ? (
          <div className={classes.PackTitle}>
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height="30px"
            />
          </div>
        ) : (
          <PackActionsInside packInfo={packInfo} />
        )}

        {tableStatus.includes("My") && (
          <Button
            onClick={() => setShow((p) => !p)}
            text="Add new card"
            sidePadding={35}
            type="blue"
          />
        )}

      </div>

      <AnimatePresence>
        {(tableStatus.includes("Success") || tableStatus.includes("NoThisCard")) && (
        <CardSearch
          onChange={changeRequestValues}
          value={request.searchValue}
        />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tableStatus.includes("Success") && (
          <motion.div
            className={classes.ContainerW}
            variants={CardsListMotion}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CardsList
              resetUI={() => setReset((n) => !n)}
              rowsPerPage={request.rowsPerPage || 8}
              sortByGrade={changeRequestValues}
              updateTotal={setTotalPages}
              data={packInfo.cards}
              request={request}
              path={path.current}
            />

            <Pagination
              ROWS_PER_PAGE={request.rowsPerPage || 8}
              clickHandler={clickPaginationButtons}
              onChange={changeRequestValues}
              onClick={clickHandler}
              current={currentPage}
              separator="..."
              total={totalPages}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tableStatus.includes("Empty") && (

          ID_USER === packInfo.packUserId ? (
            <motion.div
              className={classes.EmptyPackContainer}
              variants={CardsListMotion}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={classes.EmptyPackText}>
                This pack is empty. Click add new card to fill this pack
              </div>
              <Button
                onClick={() => setShow((p) => !p)}
                text="Add new card"
                sidePadding={35}
                type="blue"
              />
            </motion.div>
          ) : (
            <motion.div
              className={classes.EmptyPackContainer}
              variants={CardsListMotion}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={classes.EmptyPackText}>This pack is empty.</div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tableStatus.includes("NoThisCard") && (
          <NoMatchesPack />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <CardModals
            resetUI={() => setReset((n) => !n)}
            ROWS_PER_PAGE={request.rowsPerPage || 8}
            updateTotal={setTotalPages}
            onClick={addCardHandler}
            PACK_ID={path.current}
            type="add"
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
};
