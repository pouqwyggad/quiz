import React, {
  FC, PropsWithChildren, useEffect, useRef, useState,
} from 'react';
import Skeleton from '@mui/material/Skeleton';
import classes from './PackPage.module.scss';
import { Button } from '../../ui/Button/Button';
import { SearchIcon } from '../../icons/SearchIcon';
import { CardsList } from '../../ui/CardsList/CardsList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { getCardsAsync } from '../../../store/cardsSlice';
import { Card } from '../../../interfaces/Cards';
import { PackActionsInside } from '../../ui/PackAnctionsInside/PackActionsInside';
import { CardActions } from '../../ui/CardActions/CardActions';

interface PackPageProps {

}

export const PackPage: FC<PropsWithChildren<PackPageProps>> = () => {
  const dispatch = useAppDispatch();
  const packInfo = useAppSelector((state) => state.cards);
  const [, setCards] = useState<Card[]>(packInfo.packCards.cards);
  const [show, setShow] = useState(false);
  const path = useRef('');

  useEffect(() => {
    const url = window.location.pathname.split('/');
    path.current = url[url.length - 1];
    const fetchData = async () => {
      const response = await dispatch(getCardsAsync({ id: path.current }));
      if (getCardsAsync.fulfilled.match(response)) {
        console.log(response.payload.cards);
        setCards(response.payload.cards);
      } else {
        console.error('Ошибка при получении карточек');
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.PackPage}>

      <div className={classes.Title}>
        {packInfo.loading ? (
          <span className={classes.PackTitle}>
            <Skeleton animation="wave" variant="text" width="100%" height="30px" />
          </span>
        ) : (
          <PackActionsInside
            packName={packInfo.packCards}
          />
        )}

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
          id={path.current}
        />
        )}

      </div>

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
        data={packInfo.packCards.cards}
      />
    </div>
  );
};
