import React, { FC, PropsWithChildren } from 'react';
import classes from './FriendsPackList.module.scss';
import { dataPack } from './dataPack';
import { StarIcon } from '../../icons/StarIcon';
import { DropDownArrowIcon } from '../../icons/DropDownArrowIcon';

interface FriendsPackListProps {
  // dataPack: IDataPack
}

export const FriendsPackList: FC<PropsWithChildren<FriendsPackListProps>> = () => (
  <div className={classes.Container}>
    <table className={classes.Table}>
      <tr className={classes.TitleRow}>
        <th>Question</th>
        <th>Answer</th>
        <th>
          <div className={classes.FilterDate}>
            <div>LastUpdated</div>
            <DropDownArrowIcon />
          </div>
        </th>
        <th>Grade</th>
      </tr>
      {dataPack.map((item) => (
        <tr
          key={item.Question}
          className={classes.DefaultRow}
        >
          <td>{item.Question}</td>
          <td>{item.Answer}</td>
          <td>{item.LastUpdated}</td>
          <td>
            <div className={classes.StarsContainer}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
          </td>
        </tr>
      ))}
    </table>
  </div>
);
