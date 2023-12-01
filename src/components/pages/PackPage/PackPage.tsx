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
import { CardActions } from '../../ui/CardActions/CardActions';
import { IRequest } from '../../../interfaces/RequestFilters';
import { mainPageMotion } from "../../../motions/mainPageMotion";
import { NoMatchesPack } from "./NoMatchesPack/NoMatchesPack";
import { CompletedPack } from "./CompletedPack/CompletedPack";

interface PackPageProps {}

export const PackPage: FC<PropsWithChildren<PackPageProps>> = () => {
  const dispatch = useAppDispatch();
  const ID_USER = useAppSelector((state) => state.auth.user._id);
  const packInfo = useAppSelector((state) => state.cards);
  const path = useRef('');
  const [request, setRequest] = useState<IRequest>({
    PACK_ID: path.current,
    page: 1,
    rowsPerPage: 6,
    sort: '0grade',
    searchValue: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tableStatus, setTableStatus] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const debouncedSearch = useDebounce(request, 500);

  const updateCardsData = async () => dispatch(getCardsAsync({
    PACK_ID: path.current,
    page: currentPage,
    rowsPerPage: request.rowsPerPage,
    sortCards: request.sort,
    cardQuestion: request.searchValue,
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

  useEffect(() => {
    const url = window.location.pathname.split('/');
    path.current = url[url.length - 1];
    const fetchData = async () => {
      if (!debouncedSearch) {
        return;
      }
      const res = await updateCardsData();

      if (res.meta.requestStatus === 'fulfilled') {
        const cardsNotEmpty = res.payload.cards.length !== 0;
        const isMyPack = ID_USER === res.payload.packUserId;
        const hasSearchValue = request.searchValue !== '';

        if (cardsNotEmpty && isMyPack) {
          setTableStatus('success my');
        } else if (cardsNotEmpty) {
          setTableStatus('success all');
        } else if (!cardsNotEmpty && isMyPack) {
          setTableStatus('empty my');
        } else {
          setTableStatus('empty all');
        }

        if (!cardsNotEmpty && hasSearchValue) {
          if (isMyPack) {
            setTableStatus('no matches my');
          } else {
            setTableStatus('no matches all');
          }
        }

        if (res.meta.requestStatus === 'fulfilled' && request.rowsPerPage !== undefined) {
          setTotalPages(Math.ceil(res.payload.cardsTotalCount / request.rowsPerPage));
        }
      }
    };

    fetchData();
  }, [debouncedSearch, currentPage]);

  return (
    <motion.div
      className={classes.Container}
      variants={mainPageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
    >

      <div className={classes.Title}>
        {packInfo.loading ? (
          <div className={classes.PackTitle}>
            <Skeleton animation="wave" variant="text" width="100%" height="30px" />
          </div>
        ) : (
          <PackActionsInside
            packName={packInfo.packCards}
          />
        )}

        {((tableStatus === 'success my') || (tableStatus === 'no matches my')) && (
          <>
            <Button
              onClick={() => setShow((p) => !p)}
              text="Add new card"
              sidePadding={35}
              type="blue"
            />

            <AnimatePresence>
              {show && (
                <CardActions
                  onClick={() => setShow((p) => !p)}
                  ROWS_PER_PAGE={request.rowsPerPage || 8}
                  updateTotal={setTotalPages}
                  PACK_ID={path.current}
                  type="add"
                />
              )}
            </AnimatePresence>

          </>
        )}
      </div>

      {(tableStatus === 'success all' || tableStatus === 'success my') && (
        <CompletedPack
          paginationClickHandler={clickPaginationButtons}
          onChangeRequest={changeRequestValues}
          data={packInfo.packCards.cards}
          setTotalPages={setTotalPages}
          onClick={clickHandler}
          current={currentPage}
          total={totalPages}
          request={request}
        />
      )}

      {tableStatus === "empty my" && (
        <div className={classes.EmptyPackContainer}>
          <div className={classes.EmptyPackText}>
            This pack is empty. Click add new card to fill this pack
          </div>

          <Button
            onClick={() => setShow((p) => !p)}
            text="Add new card"
            sidePadding={35}
            type="blue"
          />
        </div>
      )}

      {tableStatus === "empty all" && (
        <div className={classes.EmptyPackContainer}>
          <div className={classes.EmptyPackText}>
            This pack is empty.
          </div>
        </div>
      )}

      {(tableStatus === "no matches my" || tableStatus === "no matches all") && (
        <NoMatchesPack
          onChange={changeRequestValues}
          value={request.searchValue}
        />
      )}

    </motion.div>
  );
};
