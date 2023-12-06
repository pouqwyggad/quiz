import React, { FC, PropsWithChildren, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import classes from './ListItem.module.scss';
import { formatDate } from "../../../../utils/dataHelper";
import { HatIcon } from "../../../icons/HatIcon";
import { EditIcon } from "../../../icons/EditIcon";
import { TrashCanIcon } from "../../../icons/TrashCanIcon";
import { PackModals } from "../../PackModals/PackModals";
import { Pack } from "../../../../interfaces/Packs";
import { useAppSelector } from "../../../../hooks/hook";
import { CardRowItem } from "../../../../motions/listMotion";

interface ListItemProps {
  updateTotal: (total: number) => void;
  rowsPerPage: number;
  item: Pack;
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = (
  {
    updateTotal,
    rowsPerPage,
    item,
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
      <div className={classes.RowCellOne}>{item.name}</div>
      <div className={classes.RowCellTwo}>{item.cardsCount}</div>
      <div className={classes.RowCellThree}>{formatDate(item.updated)}</div>
      <div className={classes.RowCellFour}>{item.user_name}</div>
      <div className={classes.RowCellFive}>

        <div className={classes.ActionsContainer}>

          <Link
            to="/pack/$id"
            params={{ id: item._id }}
          >
            <HatIcon width="16" height="16" />
          </Link>

          {
              item.user_id === USER_ID && (
                <>
                  <EditIcon
                    width="16"
                    height="16"
                    onClick={() => {
                      handleEditClick();
                      currentSelectedModal(item._id);
                    }}
                  />

                  <TrashCanIcon
                    width="14"
                    height="16"
                    onClick={() => {
                      handleDeleteClick();
                      currentSelectedModal(item._id);
                    }}
                  />
                </>
              )
          }

          <AnimatePresence>

            {showEditModal && selectedItemId === item._id && (
              <PackModals
                onClick={handleEditClick}
                type="edit"
                id={item._id}
              />
            )}

          </AnimatePresence>

          <AnimatePresence>

            {showDeleteModal && selectedItemId === item._id && (
              <PackModals
                onClick={handleDeleteClick}
                type="delete"
                id={item._id}
                packName={item.name}
                updateTotal={updateTotal}
                ROWS_PER_PAGE={rowsPerPage}
              />
            )}

          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
};
