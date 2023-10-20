import React, {
  FC, PropsWithChildren, useRef, useMemo, useEffect, useState,
} from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import classes from './Layout.module.scss';
import { Header } from '../../ui/Header/Header';
import { Main } from '../../pages/Main/Main';
import { checkAuth } from '../../../store/authSlice';
import { useAppDispatch } from '../../../hooks/hook';
import { BackPageButton } from '../../ui/BackPageButton/BackPageButton';
import { getCardsAsync } from '../../../store/cardsSlice';

interface LayoutProps {
}
export const Layout: FC<PropsWithChildren<LayoutProps>> = () => {
  const navigate = useNavigate({ from: '/' });
  const dispatch = useAppDispatch();
  const path = useRef('');
  const [isButtonShow, setIsButtonShow] = useState(false);

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
      try {
        if (localStorage.getItem('token') && !(window.location.href.includes('auth'))) {
          // await new Promise((resolve) => { setTimeout(resolve, 500); });
          await dispatch(getCardsAsync());
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

      {isButtonShow && (
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
