import classes from './Button.module.scss'
import React, {FC, PropsWithChildren} from "react"

interface ButtonProps {
    sidePadding: number
    type: string
    text: string
    onClick?: () => void
    isFormValid?: Record<string, boolean>
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({onClick, sidePadding, type, text, children,isFormValid}) => {
    // const bool = !((isFormValid && isFormValid.email) && (isFormValid && isFormValid.password))
    const changeHandler = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            // disabled={bool}
            style={{
                padding: `8px ${sidePadding}px`
            }}
            className={`${classes.Button} ${type === "blue" ? classes.ButtonBlue : classes.ButtonWhite}`}
            onClick={changeHandler}
            // ${bool && classes.ButtonDisabled}
        >
            {children}
            {text}
        </button>
    )
}