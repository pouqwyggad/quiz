import React, { FC, PropsWithChildren } from 'react';
import { Link } from '@tanstack/react-router';
import classes from './LayoutList.module.scss';
import { HatIcon } from '../../icons/HatIcon';
import { EditIcon } from '../../icons/EditIcon';
import { TrashCanIcon } from '../../icons/TrashCanIcon';
import { Pack } from '../../../interfaces/Packs';
import { useAppDispatch } from '../../../hooks/hook';
import { deletePackAsync, getCardsAsync } from '../../../store/cardsSlice';

interface LayoutListProps {
  data: Pack[]
}

export const LayoutList: FC<PropsWithChildren<LayoutListProps>> = ({ data }) => {
  // const navigate = useNavigate({ from: '/' });
  const dispatch = useAppDispatch();
  const handleClick = () => {
    // navigate({ to: '/pack' });
  };

  const deletePack = async (id: string) => {
    dispatch(deletePackAsync({ id }));
    dispatch(getCardsAsync());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
  };

  return (
    <div className={classes.Container}>
      <table className={classes.Table}>
        <thead>
          <tr className={classes.TitleRow}>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created by</th>
            <th className={classes.LastTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className={classes.DefaultRow}
            >
              <td>{item.name}</td>
              <td>{item.cardsCount}</td>
              <td>{formatDate(item.updated)}</td>
              <td>{item.user_name}</td>
              <td>
                <div className={classes.ActionsContainer}>
                  <Link to="/pack">
                    <HatIcon />
                  </Link>
                  {/* {item.private && (<EditIcon
                  onClick={handleClick} width="22" height="22" />)} */}
                  {/* {item.private && (<TrashCanIcon
                  onClick={() => { deletePack(item._id); }} />)} */}
                  <EditIcon onClick={handleClick} width="22" height="22" />
                  <TrashCanIcon onClick={() => { deletePack(item._id); }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
