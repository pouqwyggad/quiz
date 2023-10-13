import React, {
  useCallback, useEffect, useState, useRef, FC,
} from 'react';
import PropTypes from 'prop-types';
import './MultiRangeSlider.scss';
import { RangeInputs } from '../RangeInputs/RangeInputs';

interface DoubleRangeProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
}

export const DoubleRange: FC<DoubleRangeProps> = ({ min, max, onChange }) => {
  const range = useRef<HTMLDivElement | null>(null);

  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    const newValues = { min: minVal, max: maxVal };
    if (newValues.min !== min || newValues.max !== max) {
      onChange(newValues);
    }
  }, [min, max, minVal, maxVal, onChange]);

  return (
    <div className="container">
      <div className="SliderLeftValue">{minVal}</div>

      <div className="Slider">

        <RangeInputs
          min={min}
          max={max}
          minVal={minVal}
          maxVal={maxVal}
          minValRef={minValRef}
          maxValRef={maxValRef}
          changeMinValue={setMinVal}
          changeMaxValue={setMaxVal}
        />

        <div className="SliderTrack" />
        <div ref={range} className="SliderRange" />
      </div>

      <div className="SliderRightValue">{maxVal}</div>
    </div>
  );
};

DoubleRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
