import React, { FC, PropsWithChildren } from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import { spinnerMotion } from "../../../motions/spinnerMotion";

interface SpinnerProps {
  className: string;
}

export const Spinner: FC<PropsWithChildren<SpinnerProps>> = ({ className }) => (
  <motion.div
    className={className}
    variants={spinnerMotion}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <Stack
      sx={{ color: '#366eff' }}
      direction="row"
      spacing={2}
    >
      <CircularProgress color="inherit" />
    </Stack>
  </motion.div>
);
