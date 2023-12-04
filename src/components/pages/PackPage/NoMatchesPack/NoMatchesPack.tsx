import React, { FC, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import classes from './NoMatchesPack.module.scss';

interface NoMatchesPackProps {
}

export const NoMatchesPack: FC<PropsWithChildren<NoMatchesPackProps>> = () => (
  <motion.div
    className={classes.Container}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ display: "none" }}
  >
    <div className={classes.EmptyPack}>No cards with this question!</div>
  </motion.div>
);
