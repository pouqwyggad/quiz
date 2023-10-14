import React, { FC, PropsWithChildren } from 'react';
import classes from './LayoutList.module.scss';
import { DataType } from '../../pages/Main/dataType';

interface LayoutListProps {
  data: DataType[]
}

export const LayoutList: FC<PropsWithChildren<LayoutListProps>> = ({ data }) => (
  <div className={classes.Container}>
    <table className={classes.Table}>
      <tr className={classes.TitleRow}>
        <th>Name</th>
        <th>Cards</th>
        <th>LastUpdated</th>
        <th>CreatedBy</th>
        <th>Actions</th>
      </tr>
      {data.map((item) => (
        <tr
          key={item.Name}
          className={classes.DefaultRow}
        >
          <td>{item.Name}</td>
          <td>{item.Cards}</td>
          <td>{item.LastUpdated}</td>
          <td>{item.CreatedBy}</td>
          <td>{item.Actions}</td>
        </tr>
      ))}
    </table>
  </div>

);
