import React, { FC, PropsWithChildren } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from "framer-motion";
import classes from './BackPageButton.module.scss';
import { ArrowBackIcon } from '../../icons/ArrowBackIcon';
import { backPageButtonMotion } from "../../../motions/backPageButtonMotion";

interface BackPageButtonProps {
}

export const BackPageButton: FC<PropsWithChildren<BackPageButtonProps>> = () => (
  <motion.div
    variants={backPageButtonMotion}
    className={classes.Back}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <Link
      className={classes.Link}
      to="/"
      preload="intent"
    >
      <ArrowBackIcon />
      Back to Packs List
    </Link>
  </motion.div>
);
