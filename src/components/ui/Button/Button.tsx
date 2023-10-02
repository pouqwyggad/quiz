import classes from './Button.module.scss'
import React, {FC, PropsWithChildren} from "react"

interface ButtonProps {
    sidePadding: number
    type: string
    text: string
    onClick?: () => void
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({onClick, sidePadding, type, text, children}) => {

    const changeHandler = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <div
            style={{
                padding: `8px ${sidePadding}px`
            }}
            className={`${classes.Button} ${type === "blue" ? classes.ButtonBlue : classes.ButtonWhite}`}
            onClick={changeHandler}
        >
            {children}
            {text}
        </div>
    )
}