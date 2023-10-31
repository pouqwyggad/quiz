import React, {
  FC, PropsWithChildren, useEffect, useState,
} from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import classes from './Filters.module.scss';
import { FilterIcon } from '../../icons/FilterIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import { CustomSlider } from '../Slider/CustomSlider';
import { useAppDispatch } from '../../../hooks/hook';
import { getPacksAsync } from '../../../store/packsSlice';
import { SwitchButtons } from '../SwitchButtons/SwitchButtons';
import { IRequest } from '../../../interfaces/RequestFilters';

interface FiltersProps {
}

export const Filters: FC<PropsWithChildren<FiltersProps>> = () => {
  const dispatch = useAppDispatch();
  const [request, setRequest] = useState<IRequest>({
    searchValue: '',
    value: [0, 130],
    currentUser: '',
  });
  const debouncedSearch = useDebounce(request, 500);

  const changeRequestValues = (newValue: IRequest) => {
    setRequest((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(getPacksAsync({
        searchValue: request.searchValue,
        MIN: request.value ? request.value[0] : 0,
        MAX: request.value ? request.value[1] : 130,
        currentUser: request.currentUser,
      }));
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
            value={request.searchValue}
            onChange={(e) => {
              changeRequestValues({ searchValue: e.target.value });
            }}
          />
          <div className={classes.IconSearch}>
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className={classes.ShowPacksArea}>
        <p className={classes.TitleText}>Show packs cards</p>
        <SwitchButtons
          value={request.currentUser || ''}
          onValueChange={changeRequestValues}
        />
      </div>

      <div className={classes.RangeInput}>
        <p className={classes.TitleText}>Number of cards</p>
        <CustomSlider
          value={request.value || [0, 130]}
          onChangeValue={changeRequestValues}
        />
      </div>

      <div className={classes.FilterIconArea}>
        <FilterIcon />
      </div>

    </div>
  );
};
