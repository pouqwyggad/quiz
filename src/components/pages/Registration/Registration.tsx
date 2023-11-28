import React, { FC, PropsWithChildren, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import classes from './Registration.module.scss';
import { TextField } from '../../ui/TextField/TextField';
import { Button } from '../../ui/Button/Button';
import { useAppDispatch } from '../../../hooks/hook';
import { registerAsync } from '../../../store/registerSlice';
import { pageMotion } from '../../../motions/pageMotion';

interface RegistrationProps {

}

export const Registration: FC<PropsWithChildren<RegistrationProps>> = () => {
  const navigate = useNavigate({ from: '/auth/registration' });
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<Record<string, string>>({ email: '', password: '', confirm: '' });

  const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const res = await dispatch(registerAsync({ email: user.email, password: user.password }));
    if (res) {
      navigate({ to: '/auth/login' });
    }
  };

  return (
    <motion.div
      key={1}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotion}
      className={classes.Login}
    >
      <div className={classes.Title}>Sing up</div>

      <TextField
        user={user}
        name="email"
        onChange={handleChangeUserValue}
        text="Email"
      />

      <TextField
        user={user}
        name="password"
        onChange={handleChangeUserValue}
        text="Password"
      />

      <TextField
        user={user}
        name="confirm"
        onChange={handleChangeUserValue}
        text="Confirm password"
      />

      <Button
        sidePadding={145}
        type="blue"
        text="Sing Up"
        onClick={handleRegister}
      />

      <div className={classes.NoAccount}>Already have an account?</div>

      <Link
        to="/auth/login"
        className={classes.SingUpButton}
      >
        Sing In
      </Link>

    </motion.div>
  );
};
