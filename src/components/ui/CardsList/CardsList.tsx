import React, {
  FC, PropsWithChildren, useEffect, useRef, useState,
} from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import StarIcon from '@mui/icons-material/Star';
import Skeleton from '@mui/material/Skeleton';
import classes from './CardsList.tsx.module.scss';
import { DropDownArrowIcon } from '../../icons/DropDownArrowIcon';
import { Card } from '../../../interfaces/Cards';
import { formatDate } from '../../../utils/dataHelper';
import { useAppSelector } from '../../../hooks/hook';
import { EditIcon } from '../../icons/EditIcon';
import { TrashCanIcon } from '../../icons/TrashCanIcon';
import { CardActions } from '../CardActions/CardActions';

interface CardsListProps {
  data: Card[]
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FFC700',
  },
});

export const CardsList: FC<PropsWithChildren<CardsListProps>> = ({ data }) => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const USER_ID = useAppSelector((state) => state.auth.user._id);
  const isLoading = useAppSelector((state) => state.cards.loading);
  const path = useRef('');

  const handleEditClick = () => {
    setShowEditModal((p) => !p);
  };
  const handleDeleteClick = () => {
    setShowDeleteModal((p) => !p);
  };
  const currentSelectedModal = (id: string) => {
    setSelectedItemId(id);
  };

  useEffect(() => {
    const url = window.location.pathname.split('/');
    path.current = url[url.length - 1];
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Table}>
        <div className={classes.TitleRow}>
          <div className={classes.CellOne}>Question</div>
          <div className={classes.CellTwo}>Answer</div>
          <div className={classes.CellThree}>
            <span className={classes.ClickArea}>
              Last Updated
              <DropDownArrowIcon />
            </span>
          </div>
          <div className={classes.CellFour}>Grade</div>
        </div>

        {isLoading && (
          Array.from(Array(8).keys()).map(() => (
            <div className={classes.SkeletonRow}>
              <Skeleton className={classes.Skeleton} animation="wave" variant="rectangular" width="98%" />
            </div>
          ))
        )}

        {data && !isLoading && (
          data.map((item: Card) => (
            <div key={item._id} className={classes.DefaultRow}>
              <div className={classes.CellOneD}>{item.question}</div>
              <div className={classes.CellTwoD}>{item.answer}</div>
              <div className={classes.CellThreeD}>{formatDate(item.updated)}</div>
              <div className={classes.CellFourD}>
                <StyledRating
                  size="small"
                  className={classes.Star}
                  name="text-feedback"
                  value={item.grade}
                  readOnly
                  precision={0.01}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />

                {USER_ID === item.user_id && (
                <div className={classes.ActionsContainer}>
                  <EditIcon
                    onClick={() => {
                      handleEditClick();
                      currentSelectedModal(item._id);
                    }}
                    width="16"
                    height="16"
                  />

                  <TrashCanIcon
                    onClick={() => {
                      handleDeleteClick();
                      currentSelectedModal(item._id);
                    }}
                    width="16"
                    height="16"
                  />

                  {showEditModal && selectedItemId === item._id && (
                  <CardActions
                    onClick={handleEditClick}
                    type="edit"
                    CARD_ID={item._id}
                    PACK_ID={path.current}
                  />
                  )}

                  {showDeleteModal && selectedItemId === item._id && (
                  <CardActions
                    onClick={handleDeleteClick}
                    type="delete"
                    CARD_ID={item._id}
                    PACK_ID={path.current}
                  />
                  )}

                </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
