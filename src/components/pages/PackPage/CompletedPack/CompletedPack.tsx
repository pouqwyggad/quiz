import React, { FC, PropsWithChildren } from "react";
import classes from './CompletedPack.module.scss';
// import { SearchIcon } from "../../../icons/SearchIcon";
import { CardsList } from "../../../ui/CardsList/CardsList";
import { Pagination } from "../../../ui/Pagination/Pagination";
import { IRequest } from "../../../../interfaces/RequestFilters";
import { Card } from "../../../../interfaces/Cards";

interface CompletedPackProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void;
  paginationClickHandler: (page: number, type: number) => void;
  onChangeRequest: (newValue: IRequest) => void;
  setTotalPages: (total: number) => void;
  request: IRequest
  current: number;
  total: number;
  data: Card[];
}

export const CompletedPack: FC<PropsWithChildren<CompletedPackProps>> = (
  {
    paginationClickHandler,
    onChangeRequest,
    setTotalPages,
    onClick,
    current,
    request,
    total,
    data,
  },
) => (
  <div className={classes.Container}>
    <CardsList
      rowsPerPage={request.rowsPerPage || 8}
      sortByGrade={onChangeRequest}
      updateTotal={setTotalPages}
      request={request}
      data={data}
    />

    <Pagination
      ROWS_PER_PAGE={request.rowsPerPage || 8}
      clickHandler={paginationClickHandler}
      onChange={onChangeRequest}
      onClick={onClick}
      current={current}
      separator="..."
      total={total}
    />
  </div>
);
