import React, { FC, PropsWithChildren } from 'react';
import classes from './PackPage.module.scss';
import { Button } from '../../ui/Button/Button';
import { SearchIcon } from '../../icons/SearchIcon';
import { FriendsPackList } from '../../ui/FriendsPackList/FriendsPackList';

interface PackPageProps {

}

export const PackPage: FC<PropsWithChildren<PackPageProps>> = () => (
  <div className={classes.PackPage}>
    <div className={classes.Title}>
      <span>Friend&apos;s Pack</span>
      <Button text="Add new card" sidePadding={35} type="blue" />
    </div>
    <div className={classes.SearchSection}>
      <span className={classes.SearchText}>Search</span>
      <div className={classes.InputContainer}>
        <SearchIcon className={classes.SearchIcon} />
        <input
          id="inputSearchInfo"
          className={classes.Input}
          placeholder="Provide your text"
          type="text"
        />
      </div>
    </div>
    <FriendsPackList />
  </div>
);
