import React, {
  FC, PropsWithChildren, useRef, useMemo, useEffect, useState,
} from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence } from "framer-motion";
import classes from './Layout.module.scss';
import { Header } from '../../ui/Header/Header';
import { checkAuth } from '../../../store/authSlice';
import { useAppDispatch } from '../../../hooks/hook';
import { BackPageButton } from '../../ui/BackPageButton/BackPageButton';

interface LayoutProps {
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  const navigate = useNavigate({ from: '/' });
  const dispatch = useAppDispatch();
  const path = useRef('');
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useMemo(() => {
    path.current = window.location.pathname;

    if (path.current.includes('auth') || path.current === '/') {
      setIsButtonShow(false);
    } else {
      setIsButtonShow(true);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      if (!(window.location.href.includes('auth'))) {
        const result = await dispatch(checkAuth());

        if (result.meta.requestStatus === 'fulfilled') {
          setIsAuthChecked(true);
        } else {
          navigate({ to: '/auth/login', replace: true });
        }
      }

      if (window.location.href.includes('auth')) {
        setIsAuthChecked(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.Layout}>
      <Header />

      <AnimatePresence>
        {isButtonShow && (
          <BackPageButton />
        )}
      </AnimatePresence>

      <main className={classes.Main}>
        {isAuthChecked ? (children) : null}
      </main>
    </div>
  );
};
