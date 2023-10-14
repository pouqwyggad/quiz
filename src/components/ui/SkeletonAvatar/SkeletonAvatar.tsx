import React, { FC, PropsWithChildren } from 'react';
import Skeleton from '@mui/material/Skeleton';
import classes from './SkeletonAvatar.module.scss';

interface SkeletonAvatarProps {

}

export const SkeletonAvatar: FC<PropsWithChildren<SkeletonAvatarProps>> = () => (
  <div className={classes.ProfileContainer}>
    <Skeleton animation="wave" variant="text" width={100} />

    <Skeleton className={classes.Avatar} animation="wave" variant="circular" width={36} height={36} />
  </div>
);
