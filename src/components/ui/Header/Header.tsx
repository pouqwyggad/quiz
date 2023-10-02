import classes from './Header.module.scss'
import {FC, PropsWithChildren} from "react"
import {LogoIcon} from "../../icons/LogoIcon";
import {Link} from "@tanstack/react-router";
import {Button} from "../Button/Button";
import {useAppSelector} from "../../../hooks/hook";

interface HeaderProps {

}

export const Header: FC<PropsWithChildren<HeaderProps>> = ({}) => {
    const data = useAppSelector(state => state.auth)


    // const user = data.isAuth ? data.user : null;
    // const isLogin = localStorage.token
    // if (data.isAuth) {
    //     const user = JSON.parse(localStorage.userData)
    // }

    return (
        <header className={classes.Header}>

            <Link to={"/"}>
                <LogoIcon/>
            </Link>


            {data.isAuth ? (
                <Link
                    to={"/profile"}
                    className={classes.ProfileContainer}
                >
                    <span className={classes.ProfileName}>{data.user.name}</span>

                    <img
                        className={classes.ProfileAvatar}
                        src={data.user.avatar}
                        alt=""
                    />
                </Link>
            ):(
                <Link to={"/auth/login"}>
                    <Button sidePadding={28} type={"blue"} text={"Sing in"}/>
                </Link>
            )}
        </header>
    )
}

