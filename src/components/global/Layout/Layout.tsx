import React, {
  FC, PropsWithChildren, useRef, useMemo, useEffect,
} from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import classes from './Layout.module.scss';
import { Header } from '../../ui/Header/Header';
import { Main } from '../../pages/Main/Main';
import { checkAuth } from '../../../store/authSlice';
import { useAppDispatch } from '../../../hooks/hook';
import { BackPageButton } from '../../ui/BackPageButton/BackPageButton';

interface LayoutProps {
}
export const Layout: FC<PropsWithChildren<LayoutProps>> = () => {
  const navigate = useNavigate({ from: '/' });
  const dispatch = useAppDispatch();
  const path = useRef('');

  useMemo(() => {
    path.current = window.location.pathname;
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem('token') && !(window.location.href.includes('auth'))) {
          const result = await dispatch(checkAuth());

          if (result.payload.error) {
            navigate({ to: '/auth/login' });
          }
        }
      } catch (e) {
        console.error('Ошибка запроса:', e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.Layout}>
      <Header />

      {path.current !== '/' && (
      <BackPageButton src="/" />
      )}

      <main className={classes.Main}>
        {path.current === '/' && (
        <Main />
        )}

        <Outlet />
      </main>

    </div>
  );
};
