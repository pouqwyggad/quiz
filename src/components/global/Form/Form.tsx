import classes from './Form.module.scss'
import {FC, PropsWithChildren} from "react"
import {Outlet} from "@tanstack/react-router";

interface FormProps {

}

export const Form: FC<PropsWithChildren<FormProps>> = ({}) => {
    return (
        <div className={classes.Form}>
            <div className={classes.Container}>
                <Outlet/>
            </div>
        </div>
    )
}