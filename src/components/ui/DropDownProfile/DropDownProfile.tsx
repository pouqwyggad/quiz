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
  const handleLogout = () => dispatch(logoutAsync());

  return (
    <motion.ul
      variants={profileDropDownMotion}
      className={classes.Container}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Link
        className={classes.Item}
        to="/profile"
      >
        <UserIcon />
        Profile
      </Link>

      <Link
        className={classes.Item}
        onClick={handleLogout}
        to="/auth/login"
        replace
      >
        <LogOutIcon />
        Log out
      </Link>
    </motion.ul>
  );
};
