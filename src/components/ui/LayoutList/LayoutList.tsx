import React, { FC, PropsWithChildren } from 'react';
import { useNavigate } from '@tanstack/react-router';
import classes from './LayoutList.module.scss';
import { DataType } from '../../pages/Main/dataType';
import { HatIcon } from '../../icons/HatIcon';
import { EditIcon } from '../../icons/EditIcon';
import { TrashCanIcon } from '../../icons/TrashCanIcon';

interface LayoutListProps {
  data: DataType[]
}

export const LayoutList: FC<PropsWithChildren<LayoutListProps>> = ({ data }) => {
  const navigate = useNavigate({ from: '/' });
  const handleClick = () => {
    navigate({ to: '/pack' });
  };

  return (
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
            <td>
              <div className={classes.ActionsContainer}>
                <HatIcon onClick={handleClick} />
                <EditIcon onClick={handleClick} width="24" height="24" />
                <TrashCanIcon />
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>

  );
};
