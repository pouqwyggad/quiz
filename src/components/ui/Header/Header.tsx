import classes from './Header.module.scss'
import {FC, PropsWithChildren} from "react"
import {LogoIcon} from "../../icons/LogoIcon";
import {Link} from "@tanstack/react-router";

interface HeaderProps {

}

export const Header: FC<PropsWithChildren<HeaderProps>> = ({}) => {
    return (
        <header className={classes.Header}>

            <Link
                to={"/"}
            >
                <LogoIcon/>
            </Link>

            <Link
                to={"/auth/login"}
                className={classes.Button}
            >
                Sing in
            </Link>
        </header>
    )
}

