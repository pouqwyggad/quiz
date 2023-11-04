import React, {
  FC, PropsWithChildren, useEffect, useRef, useState,
} from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useDebounce } from '@uidotdev/usehooks';
import classes from './PackPage.module.scss';
import { Button } from '../../ui/Button/Button';
import { SearchIcon } from '../../icons/SearchIcon';
import { CardsList } from '../../ui/CardsList/CardsList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { getCardsAsync } from '../../../store/cardsSlice';
import { PackActionsInside } from '../../ui/PackAnctionsInside/PackActionsInside';
import { CardActions } from '../../ui/CardActions/CardActions';
import { IRequest } from '../../../interfaces/RequestFilters';
import { Pagination } from '../../ui/Pagination/Pagination';

interface PackPageProps {
}

export const PackPage: FC<PropsWithChildren<PackPageProps>> = () => {
  const dispatch = useAppDispatch();
  const path = useRef('');
  const [request, setRequest] = useState<IRequest>({
    PACK_ID: path.current,
    page: 1,
    rowsPerPage: 6,
  });
  const [show, setShow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const packInfo = useAppSelector((state) => state.cards);
  const ID_USER = useAppSelector((state) => state.auth.user._id);
  const debouncedSearch = useDebounce(request, 500);

  const updateCardsData = async () => dispatch(getCardsAsync({
    PACK_ID: path.current,
    page: currentPage,
    rowsPerPage: request.rowsPerPage,
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
      if (debouncedSearch) {
        const res = await updateCardsData();

        if (res.meta.requestStatus === 'fulfilled' && request.rowsPerPage !== undefined) {
          setTotalPages(Math.ceil(res.payload.cardsTotalCount / request.rowsPerPage));
        }
      }
    };

    fetchData();
  }, [debouncedSearch, currentPage]);

  return (
    <div className={classes.PackPage}>

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

        {packInfo.packCards.cards.length > 0 && (
          <div>
            <Button
              text="Add new card"
              sidePadding={35}
              type="blue"
              onClick={() => {
                setShow((p) => !p);
              }}
            />

            {show && (
            <CardActions
              onClick={() => {
                setShow((p) => !p);
              }}
              type="add"
              PACK_ID={path.current}
              updateTotal={setTotalPages}
              ROWS_PER_PAGE={request.rowsPerPage || 8}
            />
            )}
          </div>
        )}
      </div>

      {packInfo.packCards.cards.length > 0 ? (
        <div className={classes.ContentContainer}>
          <div className={classes.SearchSection}>
            <span className={classes.SearchText}>Search</span>
            <div className={classes.InputContainer}>
              <SearchIcon className={classes.SearchIcon} />
              <input
                id="inputSearchInfo"
                className={classes.Input}
                placeholder="Provide your text"
                type="text"
              />
            </div>
          </div>

          <CardsList
            rowsPerPage={request.rowsPerPage || 8}
            data={packInfo.packCards.cards}
            updateTotal={setTotalPages}
            ROWS_PER_PAGE={request.rowsPerPage || 8}
          />

          <Pagination
            total={totalPages}
            current={currentPage}
            separator="..."
            onClick={clickHandler}
            onChange={changeRequestValues}
            ROWS_PER_PAGE={request.rowsPerPage || 6}
            clickHandler={clickPaginationButtons}
          />
        </div>
      ) : (
        <div className={classes.EmptyPackContainer}>

          {ID_USER === packInfo.packCards.packUserId ? (
            <>
              <div className={classes.EmptyPackText}>
                This pack is empty. Click add new card to fill this pack
              </div>

              <Button
                text="Add new card"
                sidePadding={35}
                type="blue"
                onClick={() => {
                  setShow((p) => !p);
                }}
              />
            </>
          ) : (
            <div className={classes.EmptyPackText}>
              This pack is empty.
            </div>
          )}
          {show && (
          <CardActions
            onClick={() => {
              setShow((p) => !p);
            }}
            type="add"
            PACK_ID={path.current}
            updateTotal={setTotalPages}
            ROWS_PER_PAGE={request.rowsPerPage || 8}
          />
          )}
        </div>
      )}
    </div>
  );
};
