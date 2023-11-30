import React, { FC, PropsWithChildren } from "react";
import classes from './NoMatchesPack.module.scss';
import { SearchIcon } from "../../../icons/SearchIcon";
import { IRequest } from "../../../../interfaces/RequestFilters";

interface NoMatchesPackProps {
  onChange: (newValue: IRequest) => void;
  value?: string;
}

export const NoMatchesPack: FC<PropsWithChildren<NoMatchesPackProps>> = ({ value = '', onChange }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ searchValue: e.target.value });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Search}>

        <span className={classes.SearchText}>Search</span>

        <div className={classes.InputContainer}>
          <SearchIcon className={classes.SearchIcon} />

          <input
            placeholder="Provide your text"
            className={classes.Input}
            onChange={changeHandler}
            id="inputSearchInfo"
            value={value}
            type="text"
          />
        </div>
      </div>

      <div className={classes.EmptyPack}>No cards with this question!</div>
    </div>
  );
};

NoMatchesPack.defaultProps = {
  value: '',
};
