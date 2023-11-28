import React, { FC, PropsWithChildren } from 'react';
import { Outlet } from '@tanstack/react-router';
import classes from './Form.module.scss';

interface FormProps {}

export const Form: FC<PropsWithChildren<FormProps>> = () => (
  <div className={classes.Form}>
    <div className={classes.Container}>
      <Outlet />
    </div>
  </div>
);
