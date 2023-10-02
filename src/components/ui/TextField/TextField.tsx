import classes from './TextField.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {WatchInputIcon} from "../../icons/WatchInputIcon";

interface TextFieldProps {
    user?: Record<string, string> | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    text: string
    name: string
    packName?: string | undefined
}


export const TextField: FC<PropsWithChildren<TextFieldProps>> = ({user, onChange, text, name, packName}) => {
    return (
        <div className={classes.FormInput}>
            <input
                required
                className={`${classes.Input} ${!(user) || user[name] ? classes.InputActive : ""}`}
                value={user ? user[name] : packName}
                type={`${name === 'password' ? "password" : "text"}`}
                name={name}
                placeholder={""}
                onChange={user ? (e) => onChange(e) : (e) => onChange(e)}
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