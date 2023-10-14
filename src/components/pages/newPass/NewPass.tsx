import React, {
  FC, PropsWithChildren, useMemo, useRef, useState,
} from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import { requestOnResetAsync } from '../../../store/resetPasswordSlice';
import classes from './newPass.module.scss';
import { SendOnEmailIcon } from '../../icons/SendOnEmailIcon';
import { pageMotion } from '../../../motions/pageMotion';

interface NewPassProps {
}

export const NewPass: FC<PropsWithChildren<NewPassProps>> = () => {
  const dispatch = useAppDispatch();
  const [newPassword] = useState('');
  const path = useRef('');

  useMemo(() => {
    const token = window.location.pathname.split('/');
    path.current = token[token.length - 1];
  }, [window.location]);

  // const passChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewPassword(e.target.value);
  // };

  const resetPassword = () => {
    dispatch(requestOnResetAsync({ newPassword, path: path.current }));
  };

  return (
    <motion.div
      key={1}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotion}
      className={classes.Container}
    >
      <h1 className={classes.Title}>Create new password</h1>

      <SendOnEmailIcon />

      <div>Create new password and we will send you further instructions to email</div>

      {/* <Link to={"/auth/login"}> */}
      <Button
        sidePadding={84}
        type="blue"
        text="Create new password"
        onClick={resetPassword}
      />
      {/* </Link> */}
    </motion.div>
  );
};
