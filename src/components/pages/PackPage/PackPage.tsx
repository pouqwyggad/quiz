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
// import { CompletedPack } from "./CompletedPack/CompletedPack";
// import { SearchIcon } from "../../icons/SearchIcon";
import { CardSearch } from "../../ui/CardSearch/CardSearch";
import { CardsList } from "../../ui/CardsList/CardsList";
import { Pagination } from "../../ui/Pagination/Pagination";

interface PackPageProps {
}

export const PackPage: FC<PropsWithChildren<PackPageProps>> = () => {
  const dispatch = useAppDispatch();
  const ID_USER = useAppSelector((state) => state.auth.user._id);
  const loading = useAppSelector((state) => state.cards.loading);
  const packInfo = useAppSelector((state) => state.cards.packCards);
  const path = useRef('');
  const [request, setRequest] = useState<IRequest>({
    PACK_ID: path.current,
    searchValue: '',
    sort: '0grade',
    rowsPerPage: 6,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tableStatus, setTableStatus] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const debouncedRequest = useDebounce(request, 500);

  const updateCardsData = async () => dispatch(getCardsAsync({
    cardQuestion: request.searchValue,
    rowsPerPage: request.rowsPerPage,
    sortCards: request.sort,
    PACK_ID: path.current,
    page: currentPage,
  }));

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

  useEffect(() => {
    const url = window.location.pathname.split('/');
    path.current = url[url.length - 1];
    const fetchData = async () => {
      if (!debouncedRequest) return;

      const res = await updateCardsData();

      if (res.meta.requestStatus === 'fulfilled') {
        const hasSearchValue = request.searchValue !== '';

        if ((res.payload.cards.length > 0) && (ID_USER === res.payload.packUserId)) {
          setTableStatus('MyPackSuccess');
        } else if ((res.payload.cards.length > 0) && (ID_USER !== res.payload.packUserId)) {
          setTableStatus('StrangerPackSuccess');
        } else if ((res.payload.cards.length < 1) && (ID_USER === res.payload.packUserId)) {
          setTableStatus('MyPackEmpty');
        } else if ((res.payload.cards.length < 1) && (ID_USER !== res.payload.packUserId)) {
          setTableStatus('StrangerPackEmpty');
        }

        if ((ID_USER === res.payload.packUserId)
            && (res.payload.cards.length < 1)
            && (hasSearchValue)) {
          setTableStatus('MyPackNoThisCard');
          // eslint-disable-next-line no-dupe-else-if
        } else if ((ID_USER !== res.payload.packUserId)
            && (res.payload.cards.length < 1) && (hasSearchValue)) {
          setTableStatus('StrangerPackNoThisCard');
        }

        if (res.meta.requestStatus === 'fulfilled' && request.rowsPerPage !== undefined) {
          setTotalPages(Math.ceil(res.payload.cardsTotalCount / request.rowsPerPage));
        }
      }
    };

    fetchData();
  }, [debouncedRequest, currentPage, totalPages]);

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

      {(tableStatus.includes("Success") || tableStatus.includes("NoThisCard")) && (
      <CardSearch
        onChange={changeRequestValues}
        value={request.searchValue}
      />
      )}

      <AnimatePresence>

        {(tableStatus.includes("Success") && packInfo.cards.length !== 0) && (
        <div className={classes.ContainerW}>
          <CardsList
            rowsPerPage={request.rowsPerPage || 8}
            sortByGrade={changeRequestValues}
            updateTotal={setTotalPages}
            request={request}
            data={packInfo.cards}
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
        </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tableStatus.includes("Empty") && (

          ID_USER === packInfo.packUserId ? (
            <motion.div
              className={classes.EmptyPackContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
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
            onClick={addCardHandler}
            ROWS_PER_PAGE={request.rowsPerPage || 8}
            updateTotal={setTotalPages}
            PACK_ID={path.current}
            type="add"
              // @ts-ignore
            updateGet={updateCardsData}
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
};
