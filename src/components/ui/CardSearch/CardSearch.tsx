import React, { FC, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import classes from './CardSearch.module.scss';
import { SearchIcon } from "../../icons/SearchIcon";
import { IRequest } from "../../../interfaces/RequestFilters";

interface CardSearchProps {
  onChange: (newValue: IRequest) => void;
  value?: string;
}

export const CardSearch: FC<PropsWithChildren<CardSearchProps>> = ({ onChange, value }) => (
  <motion.div
    className={classes.Search}
    exit={{ display: "none" }}
  >

    <span className={classes.SearchText}>Search</span>

    <div className={classes.InputContainer}>
      <SearchIcon className={classes.InputIcon} />

      <input
        onChange={(e) => onChange({ searchValue: e.target.value })}
        placeholder="Provide your text"
        value={value}
        className={classes.Input}
        id="inputSearchInfo"
        type="text"
      />
    </div>
  </motion.div>
);

CardSearch.defaultProps = {
  value: "",
};
