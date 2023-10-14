import React, {
  FC, PropsWithChildren, useEffect, useMemo, useRef, useState,
} from 'react';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Header.module.scss';
import { LogoIcon } from '../../icons/LogoIcon';
import { Button } from '../Button/Button';
import { DropDownProfile } from '../DropDownProfile/DropDownProfile';
import { useAppSelector } from '../../../hooks/hook';
import { SkeletonAvatar } from '../SkeletonAvatar/SkeletonAvatar';

interface HeaderProps {
}

export const Header: FC<PropsWithChildren<HeaderProps>> = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const data = useAppSelector((state) => state.auth);
  const isAuth = localStorage.getItem('isAuth');
  // const path = useRef('');
  const [showMenu, setShowMenu] = useState(false);
  const [showBackButton, setShowBackButton] = useState(true);

  useMemo(() => {
    const currentPath = window.location.pathname;

    if (currentPath.includes('profile')) {
      setShowBackButton(false);
    } else {
      setShowBackButton(true);
    }
  }, [window.location.pathname]);

  const handleRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.href.includes('auth')) e.preventDefault();
  };

  window.history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', () => {
    window.history.pushState(null, '', window.location.href);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('click', handleClickOutside);
    else document.removeEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  return (
    <header className={classes.Header}>

      <Link
        to="/"
        onClick={handleRedirect}
      >
        <LogoIcon />
      </Link>

      {isAuth === 'true' ? (
      // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {data.user.avatar ? (
            <motion.div
              className={classes.ProfileContainer}
              onClick={() => setShowMenu((p) => !p)}
              ref={menuRef}
            >
              <span className={classes.ProfileName}>{data.user.name}</span>

              <img
                className={classes.ProfileAvatar}
                src={data.user.avatar}
                alt="profile"
              />

              <AnimatePresence>
                {(showMenu && showBackButton) && <DropDownProfile />}
              </AnimatePresence>

            </motion.div>
          ) : (
            <SkeletonAvatar />
          )}
        </>
      ) : (
        <Link to="/auth/login">
          <Button sidePadding={28} type="blue" text="Sing in" />
        </Link>
      )}
    </header>
  );
};
