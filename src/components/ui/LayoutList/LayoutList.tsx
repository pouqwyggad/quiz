import React, { FC, PropsWithChildren, useState } from 'react';
import { Link } from '@tanstack/react-router';
import Skeleton from '@mui/material/Skeleton';
import classes from './LayoutList.module.scss';
import { HatIcon } from '../../icons/HatIcon';
import { EditIcon } from '../../icons/EditIcon';
import { TrashCanIcon } from '../../icons/TrashCanIcon';
import { Pack } from '../../../interfaces/Packs';
import { PackActions } from '../PackActions/PackActions';
import { useAppSelector } from '../../../hooks/hook';
import { DropDownArrowIcon } from '../../icons/DropDownArrowIcon';
import { formatDate } from '../../../utils/dataHelper';

interface LayoutListProps {
  data: Pack[]
  rowsPerPage:number
}

export const LayoutList: FC<PropsWithChildren<LayoutListProps>> = ({ data, rowsPerPage }) => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isLoading = useAppSelector((state) => state.packs.loading);
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
          <div className={classes.CellOne}>Name</div>
          <div className={classes.CellTwo}>Cards</div>
          <div className={classes.CellThree}>
            <span className={classes.ClickArea}>
              Last Updated
              <DropDownArrowIcon />
            </span>
          </div>
          <div className={classes.CellFour}>Created by</div>
          <div className={classes.CellFive}>Actions</div>
        </div>

        {isLoading && (
          Array.from(Array(rowsPerPage).keys()).map(() => (
            <div className={classes.SkeletonRow}>
              <Skeleton className={classes.Skeleton} animation="wave" variant="rectangular" width="98%" />
            </div>
          ))
        )}

        {data && !isLoading && (
          data.map((item: Pack) => (
            <div key={item._id} className={classes.DefaultRow}>
              <div className={classes.CellOneD}>{item.name}</div>
              <div className={classes.CellTwoD}>{item.cardsCount}</div>
              <div className={classes.CellThreeD}>{formatDate(item.updated)}</div>
              <div className={classes.CellFourD}>{item.user_name}</div>
              <div className={classes.CellFiveD}>
                <div className={classes.ActionsContainer}>
                  <Link
                    to="/pack/$id"
                    params={{
                      id: item._id,
                    }}
                  >
                    <HatIcon
                      width="16"
                      height="16"
                    />
                  </Link>

                  {(item.user_id === USER_ID) && (
                  <>
                    <EditIcon
                      onClick={() => {
                        handleEditClick();
                        currentSelectedModal(item._id);
                      }}
                      width="16"
                      height="16"
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
                  )}

                  {showEditModal && selectedItemId === item._id && (
                    <PackActions
                      onClick={handleEditClick}
                      type="edit"
                      id={item._id}
                    />
                  )}

                  {showDeleteModal && selectedItemId === item._id && (
                    <PackActions
                      onClick={handleDeleteClick}
                      type="delete"
                      id={item._id}
                      packName={item.name}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
