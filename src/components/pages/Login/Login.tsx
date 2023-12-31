import React, { FC, PropsWithChildren, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from './Login.module.scss';
import { TextField } from '../../ui/TextField/TextField';
import { Button } from '../../ui/Button/Button';
import { loginAsync } from '../../../store/authSlice';
import { useAppDispatch } from '../../../hooks/hook';
import { pageMotion } from '../../../motions/pageMotion';

interface LoginProps {
}

export const Login: FC<PropsWithChildren<LoginProps>> = () => {
  const navigate = useNavigate({ from: '/auth/login' });
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<Record<string, string>>({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, boolean>>({});

  const checkError = (name: string, value: string) => {
    if (name === 'email') {
      const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      const isValid = re.test(value);
      setError((prev) => ({
        ...prev,
        [name]: isValid,
      }));
    }

    if (name === 'password') {
      const re = /_/;
      const isValid = !re.test(value) && value.length > 7;
      setError((prev) => ({
        ...prev,
        [name]: isValid,
      }));
    }
  };
  const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    checkError(name, value);
  };

  const handleLogin = async () => {
    const res = await dispatch(
      loginAsync({ email: user.email, password: user.password, rememberMe }),
    );
    if (res.meta.requestStatus === 'fulfilled') {
      await navigate({ to: '/profile' });
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotion}
      className={classes.Login}
    >
      <div className={classes.Title}>Sing in</div>

      <TextField
        name="email"
        user={user}
        onChange={handleChangeUserValue}
        text="Email"
      />
      <TextField
        name="password"
        user={user}
        onChange={handleChangeUserValue}
        text="Password"
      />

      <FormControlLabel
        className={classes.CheckBox}
        label="Remember me"
        control={(
          <Checkbox
            checked={rememberMe}
            onChange={() => {
              setRememberMe((prevState) => !prevState);
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          )}
      />

      <Link
        to="/auth/forgot-password"
        className={classes.ForgotPass}
      >
        Forgot Password?
      </Link>

      <Button
        sidePadding={145}
        type="blue"
        text="Sing In"
        onClick={handleLogin}
        isFormValid={error}
      />

      <div className={classes.NoAccount}>Don&apos;t you have an account yet?</div>

      <Link
        to="/auth/registration"
        className={classes.SingUpButton}
      >
        Sing Up
      </Link>
    </motion.div>
  );
};
