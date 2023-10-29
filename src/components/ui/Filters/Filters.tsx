import React, {
  FC, PropsWithChildren, useEffect, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDebounce } from '@uidotdev/usehooks';
import classes from './Filters.module.scss';
import { FilterIcon } from '../../icons/FilterIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import { CustomSlider } from '../Slider/CustomSlider';
import { useAppDispatch } from '../../../hooks/hook';
import { getPacksAsync } from '../../../store/packsSlice';
import { SwitchButtons } from '../SwitchButtons/SwitchButtons';

interface FiltersProps {
}

export const Filters: FC<PropsWithChildren<FiltersProps>> = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearch || searchValue === '') {
      dispatch(getPacksAsync({ searchValue }));
    }
  }, [debouncedSearch]);

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
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <div className={classes.IconSearch}>
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className={classes.ShowPacksArea}>
        <p className={classes.TitleText}>Show packs cards</p>
        <SwitchButtons />
      </div>

      <div className={classes.RangeInput}>
        <p className={classes.TitleText}>Number of cards</p>
        <CustomSlider />
      </div>

      <div className={classes.FilterIconArea}>
        <FilterIcon />
      </div>

    </div>
  );
};
