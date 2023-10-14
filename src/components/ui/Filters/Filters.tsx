import React, { FC, PropsWithChildren, useState } from 'react';
import classes from './Filters.module.scss';
import { FilterIcon } from '../../icons/FilterIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import { DoubleRange } from '../multiRangeSlider/DoubleRange';

interface FiltersProps {

}

interface RangeValues {
  min: number;
  max: number;
}

export const Filters: FC<PropsWithChildren<FiltersProps>> = () => {
  const [, setRangeValues] = useState<RangeValues>({ min: 1, max: 10 });
  const [selectPacks, setSelectPacks] = useState(false);
  const handleRangeChange = (values: RangeValues) => {
    setRangeValues(values);
  };

  return (
    <div className={classes.Filters}>
      <div className={classes.SearchArea}>
        <p className={classes.TitleText}>Search</p>
        <div className={classes.InputWrapper}>
          <input
            id="inputSearchInfo"
            className={classes.Input}
            placeholder="Provide your text"
            type="text"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="inputSearchInfo" className={classes.IconSearch}>
            <SearchIcon />
          </label>
        </div>
      </div>

      <div className={classes.ShowPacksArea}>
        <p className={classes.TitleText}>Show packs cards</p>
        <div className={classes.SwitchPacksContainer}>
          <button
            type="button"
            className={`${!selectPacks ? classes.Switch : classes.SwitchActive}`}
            onClick={() => setSelectPacks((prevState) => !prevState)}
          >
            My
          </button>
          <button
            type="button"
            className={`${selectPacks ? classes.Switch : classes.SwitchActive}`}
            onClick={() => setSelectPacks((prevState) => !prevState)}
          >
            All
          </button>
        </div>
      </div>

      <div className={classes.RangeInput}>
        <p className={classes.TitleText}>Number of cards</p>

        <DoubleRange
          min={1}
          max={10}
          onChange={handleRangeChange}
        />

      </div>

      <div className={classes.FilterIconArea}>
        <FilterIcon />
      </div>

    </div>
  );
};
