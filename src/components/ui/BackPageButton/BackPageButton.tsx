import React, { FC, PropsWithChildren } from 'react';
import { Link } from '@tanstack/react-router';
import classes from './BackPageButton.module.scss';
import { ArrowBackIcon } from '../../icons/ArrowBackIcon';

interface BackPageButtonProps {
  src: string
}

export const BackPageButton: FC<PropsWithChildren<BackPageButtonProps>> = ({ src }) => (
  <Link
    className={classes.Back}
    to={src}
  >
    <ArrowBackIcon />
    Back to Packs List
  </Link>
);
