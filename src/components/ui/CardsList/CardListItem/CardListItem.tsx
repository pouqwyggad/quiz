import React, { FC, PropsWithChildren, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { AnimatePresence, motion } from "framer-motion";
import classes from './CardListItem.module.scss';
import { formatDate } from "../../../../utils/dataHelper";
import { EditIcon } from "../../../icons/EditIcon";
import { TrashCanIcon } from "../../../icons/TrashCanIcon";
import { CardModals } from "../../CardModals/CardModals";
import { Card } from "../../../../interfaces/Cards";
import { useAppSelector } from "../../../../hooks/hook";
import { CardRowItem } from "../../../../motions/listMotion";

interface CardListItemProps {
  updateTotal: (total: number) => void;
  ROWS_PER_PAGE: number;
  path: string;
  item: Card;
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FFC700',
  },
});

export const CardListItem: FC<PropsWithChildren<CardListItemProps>> = (
  {
    updateTotal,
    ROWS_PER_PAGE,
    item,
    path,
  },
) => {
  const USER_ID = useAppSelector((state) => state.auth.user._id);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = () => setShowEditModal((p) => !p);
  const handleDeleteClick = () => setShowDeleteModal((p) => !p);
  const currentSelectedModal = (id: string) => setSelectedItemId(id);

  return (
    <motion.div
      className={classes.Row}
      variants={CardRowItem}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className={classes.RowCellOne}>{item.question}</div>
      <div className={classes.RowCellTwo}>{item.answer}</div>
      <div className={classes.RowCellThree}>{formatDate(item.updated)}</div>

      <div className={classes.RowCellFour}>

        <StyledRating
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          className={classes.Star}
          name="text-feedback"
          value={item.grade}
          precision={0.5}
          size="small"
          readOnly
        />

        {USER_ID === item.user_id && (

          <div className={classes.ActionsContainer}>

            <EditIcon
              width="16"
              height="16"
              onClick={() => {
                handleEditClick();
                currentSelectedModal(item._id);
              }}
            />

            <TrashCanIcon
              width="16"
              height="16"
              onClick={() => {
                handleDeleteClick();
                currentSelectedModal(item._id);
              }}
            />

            <AnimatePresence>
              {showEditModal && selectedItemId === item._id && (
                <CardModals
                  ROWS_PER_PAGE={ROWS_PER_PAGE}
                  onClick={handleEditClick}
                  updateTotal={updateTotal}
                  CARD_ID={item._id}
                  PACK_ID={path}
                  type="edit"
                  currentQuestion={item.question}
                  currentAnswer={item.answer}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showDeleteModal && selectedItemId === item._id && (
                <CardModals
                  ROWS_PER_PAGE={ROWS_PER_PAGE}
                  onClick={handleDeleteClick}
                  updateTotal={updateTotal}
                  CARD_ID={item._id}
                  PACK_ID={path}
                  type="delete"
                  currentQuestion={item.question}
                />
              )}
            </AnimatePresence>

          </div>
        )}
      </div>
    </motion.div>
  );
};
