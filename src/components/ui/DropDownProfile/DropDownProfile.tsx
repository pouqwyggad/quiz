import React, {
  FC, PropsWithChildren,
} from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import classes from './DropDownProfile.module.scss';
import { UserIcon } from '../../icons/UserIcon';
import { LogOutIcon } from '../../icons/LogOutIcon';
import { profileDropDownMotion } from '../../../motions/pageMotion';
import { logoutAsync } from '../../../store/authSlice';
import { useAppDispatch } from '../../../hooks/hook';

interface DropDownProfileProps {
}

export const DropDownProfile: FC<PropsWithChildren<DropDownProfileProps>> = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <motion.ul
      variants={profileDropDownMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      className={classes.Container}
    >
      <Link to="/profile" className={classes.Item}>
        <UserIcon />
        Profile
      </Link>

      <Link
        onClick={handleLogout}
        to="/auth/login"
        className={classes.Item}
      >
        <LogOutIcon />
        Log out
      </Link>
    </motion.ul>
  );
};
