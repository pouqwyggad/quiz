import React, {
  FC, PropsWithChildren,
} from 'react';
import classes from './Filters.module.scss';
import { FilterIcon } from '../../icons/FilterIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import { CustomSlider } from '../Slider/CustomSlider';
import { SwitchButtons } from '../SwitchButtons/SwitchButtons';
import { IRequest } from '../../../interfaces/RequestFilters';

interface FiltersProps {
  requestValues: IRequest
  onChange: (newValue: IRequest) => void
  onReset: () => void
}

export const Filters: FC<PropsWithChildren<FiltersProps>> = (
  { requestValues, onChange, onReset },
) => (
  <div className={classes.Filters}>
    <div className={classes.SearchArea}>
      <p className={classes.TitleText}>Search</p>
      <div className={classes.InputWrapper}>
        <input
          id="inputSearchInfo"
          className={classes.Input}
          placeholder="Provide your text"
          type="text"
          value={requestValues.searchValue}
          onChange={(e) => {
            onChange({ searchValue: e.target.value });
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
        value={requestValues.currentUser || ''}
        onValueChange={onChange}
      />
    </div>

    <div className={classes.RangeInput}>
      <p className={classes.TitleText}>Number of cards</p>
      <CustomSlider
        value={requestValues.value || [0, 130]}
        onChangeValue={onChange}
      />
    </div>

    <div className={classes.FilterIconArea}>
      <FilterIcon
        onClick={onReset}
      />
    </div>

  </div>
);
