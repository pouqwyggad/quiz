import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material';
import classes from './CustomSlider.module.scss';

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 1;

const PrettoSlider = styled(Slider)({
  color: '#366eff',
  height: 5,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '4px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

interface CustomSliderProps {
}

export const CustomSlider: FC<CustomSliderProps> = () => {
  const [value, setValue] = useState<number[]>([1, 10]);

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className={classes.SliderContainer}>
      <div className={classes.SliderValue}>{value[0]}</div>
      <Box sx={{ width: '155px' }}>
        <PrettoSlider
          min={1}
          max={10}
          getAriaLabel={() => 'Minimum distance'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
      <div className={classes.SliderValue}>{value[1]}</div>
    </div>
  );
};
