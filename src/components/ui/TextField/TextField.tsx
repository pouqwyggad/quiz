import classes from './TextField.module.scss'
import React, {FC, PropsWithChildren} from "react"
import {WatchInputIcon} from "../../icons/WatchInputIcon";

interface TextFieldProps {
    user: Record<string, string>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    text: string
    name: string
}


export const TextField: FC<PropsWithChildren<TextFieldProps>> = ({user, onChange, text, name}) => {
    return (
        <div className={classes.FormInput}>
            <input
                required
                className={`${classes.Input} ${user[name] ? classes.InputActive : ""}`}
                value={user[name]}
                type={`${name === 'password' ? "password" : "email"}`}
                name={name}
                placeholder={""}
                onChange={(e) => onChange(e)}
            />
            <label
                htmlFor={name}
                className={classes.Label}
            >
                {text}
            </label>
        </div>
    )
}