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
  onChange: (newValue: IRequest) => void;
  requestValues: IRequest;
  onReset: () => void;
}

export const Filters: FC<PropsWithChildren<FiltersProps>> = (
  {
    requestValues,
    onChange,
    onReset,
  },
) => (
  <div className={classes.Container}>

    <div className={classes.SearchArea}>

      <p className={classes.TitleText}>Search</p>

      <div className={classes.InputWrapper}>
        <input
          onChange={(e) => onChange({ searchValue: e.target.value })}
          value={requestValues.searchValue}
          placeholder="Provide your text"
          className={classes.Input}
          id="inputSearchInfo"
          type="text"
        />

        <SearchIcon className={classes.IconSearch} />
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
      <div className={classes.TitleText}>Number of cards</div>
      <CustomSlider
        value={requestValues.value || [0, 130]}
        onChangeValue={onChange}
      />
    </div>

    <FilterIcon onClick={onReset} className={classes.FilterIconArea} />
  </div>
);
