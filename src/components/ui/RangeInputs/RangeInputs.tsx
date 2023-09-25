import React, {FC, PropsWithChildren} from "react"

interface RangeInputsProps {
    min: number
    max: number
    minVal: number
    maxVal: number
    minValRef: React.MutableRefObject<number>
    maxValRef: React.MutableRefObject<number>
    changeMaxValue: (value: number) => void
    changeMinValue: (value: number) => void
}

export const RangeInputs: FC<PropsWithChildren<RangeInputsProps>> = ({min, max, minVal, maxVal, minValRef, maxValRef, changeMaxValue, changeMinValue}) => {
    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value: number = Math.min(
                        Number(event.target.value),
                        maxVal - 1
                    );
                    changeMinValue(value);
                    minValRef.current = value;
                }}
                className="Thumb ThumbLeft"
                style={{zIndex: minVal > max - 100 ? "5" : undefined}}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value: number = Math.max(
                        Number(event.target.value),
                        minVal + 1
                    );
                    changeMaxValue(value);
                    maxValRef.current = value;
                }}
                className="Thumb ThumbRight"
            />
        </>

    )
}