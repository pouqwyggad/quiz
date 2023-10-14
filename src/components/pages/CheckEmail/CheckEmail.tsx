import React, { FC, PropsWithChildren } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import classes from './CheckEmail.module.scss';
import { SendOnEmailIcon } from '../../icons/SendOnEmailIcon';
import { Button } from '../../ui/Button/Button';
import { pageMotion } from '../../../motions/pageMotion';

interface CheckEmailProps {
}

export const CheckEmail: FC<PropsWithChildren<CheckEmailProps>> = () => (
  <motion.div
    key={1}
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageMotion}
    className={classes.Container}
  >
    <h1 className={classes.Title}>Check Email</h1>

    <SendOnEmailIcon />

    <div className={classes.DefaultText}>
      We’ve sent an Email with instructions to
      <br />
      {' '}
      example@mail.com
    </div>

    <Link to="/auth/login">
      <Button
        sidePadding={84}
        type="blue"
        text="Back to login"
      />
    </Link>
  </motion.div>
);
