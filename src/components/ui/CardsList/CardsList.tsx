import React, {
  FC, PropsWithChildren, useState,
} from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import StarIcon from '@mui/icons-material/Star';
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
  const [, setShowDeleteModal] = useState(false);
  const USER_ID = useAppSelector((state) => state.auth.user._id);
  const handleEditClick = () => {
    setShowEditModal((p) => !p);
  };
  const handleDeleteClick = () => {
    setShowDeleteModal((p) => !p);
  };
  const currentSelectedModal = (id: string) => {
    setSelectedItemId(id);
  };

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

        {/* {data && !isLoading && ( */}
        {data.map((item: Card) => (
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

                <TrashCanIcon onClick={handleDeleteClick} width="16" height="16" />

                {showEditModal && selectedItemId === item._id && (
                <CardActions
                  onClick={handleEditClick}
                  type="edit"
                  id={item._id}
                />
                )}

              </div>
              )}
            </div>
          </div>
        ))}
        {/* )} */}
      </div>
    </div>
  );
};
