import React, { FC, PropsWithChildren } from 'react';
import classes from './Pagination.module.scss';

interface PaginationProps {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  }
  nav?: {
    current: number;
    total: number;
  }
}

export const Pagination: FC<PropsWithChildren<PaginationProps>> = React.memo(({
  // eslint-disable-next-line react/prop-types
  nav = null, onNextPageClick, onPrevPageClick, disable,
}) => {
  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={classes.Pagination}>
      <button
        type="button"
        className={classes.Arrow}
        /* eslint-disable-next-line react/prop-types */
        disabled={disable.left}
        onClick={handleNextPageClick}
      >
        {'<'}
      </button>

      {nav && (
      <span>
        {nav.current}
        {' '}
        /
        {' '}
        {nav.total}
      </span>
      )}

      <button
        className={classes.Arrow}
          /* eslint-disable-next-line react/prop-types */
        disabled={disable.right}
        type="button"
        onClick={handlePrevPageClick}
      >
        {'>'}
      </button>
    </div>
  );
});
