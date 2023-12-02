import React, {
  FC, PropsWithChildren, useEffect, useRef, useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './PackActionsInside.module.scss';
import { PackEditConfIcon } from '../../icons/PackEditConfIcon';
import { useAppSelector } from '../../../hooks/hook';
import { Cards } from '../../../interfaces/Cards';
import { EditIcon } from '../../icons/EditIcon';
import { TrashCanIcon } from '../../icons/TrashCanIcon';
import { HatIcon } from '../../icons/HatIcon';
import { profileDropDownMotion } from '../../../motions/pageMotion';
import { PackActions } from '../PackActions/PackActions';

interface PackActionsInsideProps {
  packInfo: Cards;
}

export const PackActionsInside: FC<PropsWithChildren<PackActionsInsideProps>> = ({ packInfo}) => {
  const menuRef = useRef<HTMLButtonElement | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const USER_ID = useAppSelector((state) => state.auth.user._id);

  const [showEditModal, setShowEditModal] = useState(false);
  const [, setSelectedItemId] = useState('');
  // const cards = useAppSelector((state) => state.packs.cardsInfo.cardPacks);
  const path = useRef('');

  // const editPackHandler = async () => {
  //   dispatch(editPackNameAsync({ id, name }));
  //   onClick();
  //   await new Promise((resolve) => { setTimeout(resolve, 1000); });
  //   dispatch(getPacksAsync());
  // };

  useEffect(() => {
    const url = window.location.pathname.split('/');
    path.current = url[url.length - 1];
  }, []);

  const handleEditClick = () => {
    setShowEditModal((p) => !p);
  };

  const currentSelectedModal = (id: string) => {
    setSelectedItemId(id);
  };

  const deletePack = () => {

  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('click', handleClickOutside);
    else document.removeEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  return (
    <>
      <div className={classes.PackTitle}>
        {packInfo.packName}
        {USER_ID === packInfo.packUserId && (
          <PackEditConfIcon
            onClick={() => setShowMenu((p) => !p)}
            ref={menuRef}
          />
        )}

        <AnimatePresence>
          {showMenu && (
            <motion.div
              variants={profileDropDownMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className={classes.DropDownContainer}
            >
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div
                className={classes.MenuItem}
                onClick={() => {
                  handleEditClick();
                  currentSelectedModal(path.current);
                }}
              >
                <EditIcon
                  width="24"
                  height="24"
                />
                Edit
              </div>
              <div className={classes.MenuItem}>
                <TrashCanIcon
                  width="22"
                  height="24"
                  onClick={deletePack}
                />
                Delete
              </div>
              <div className={classes.MenuItem}>
                <HatIcon
                  width="24"
                  height="24"
                />
                Learn
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* {showDeleteModal && selectedItemId === path.current && ( */}
        {/* <PackActions */}
        {/*  onClick={handleDeleteClick} */}
        {/*  type="delete" */}
        {/*  id={path.current} */}
        {/*  packName={item.name} */}
        {/* /> */}
        {/* )} */}
      </div>

      {showEditModal && (
        <PackActions
          onClick={handleEditClick}
          type="edit"
          id={path.current}
        />
      )}

    </>
  );
};
