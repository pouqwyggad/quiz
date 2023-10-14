import React, { FC, PropsWithChildren, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import classes from './RecoverPass.module.scss';
import { TextField } from '../../ui/TextField/TextField';
import { useAppDispatch } from '../../../hooks/hook';
import { resetPasswordAsync } from '../../../store/resetPasswordSlice';
import { Button } from '../../ui/Button/Button';
import { pageMotion } from '../../../motions/pageMotion';

interface RecoverPassProps {}
export const RecoverPass: FC<PropsWithChildren<RecoverPassProps>> = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');

  const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const resetPass = () => {
    dispatch(resetPasswordAsync({ email }));
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
      <div className={classes.Title}>Forgot your password?</div>

      <TextField
        name="email"
        onChange={(e) => handleChangeUserValue(e)}
        text="Email"
      />

      <div className={classes.ForgotPass}>
        Enter your email address and we will send you
        <br />
        {' '}
        further instructions
      </div>

      <Link to="/auth/check-mail">
        <Button
          sidePadding={100}
          type="blue"
          text="Send Instructions"
          onClick={resetPass}
        />
      </Link>

      <div className={classes.NoAccount}>Did you remember your password?</div>

      <Link
        to="/auth/login"
        className={classes.SingUpButton}
      >
        Try logging in
      </Link>
    </motion.div>
  );
};
