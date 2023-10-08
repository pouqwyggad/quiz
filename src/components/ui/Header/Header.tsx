import classes from './Header.module.scss'
import {FC, PropsWithChildren, useEffect, useRef, useState} from "react"
import {LogoIcon} from "../../icons/LogoIcon";
import {Link} from "@tanstack/react-router";
import {Button} from "../Button/Button";
import {useAppSelector} from "../../../hooks/hook";
import {DropDownProfile} from "../DropDownProfile/DropDownProfile";
import {AnimatePresence, motion} from 'framer-motion';

interface HeaderProps {
}

export const Header: FC<PropsWithChildren<HeaderProps>> = ({}) => {
    const [showMenu, setShowMenu] = useState(false)
    const data = useAppSelector(state => state.auth)


    const menuRef = useRef<HTMLDivElement | null>(null)

    // const user = data.isAuth ? data.user : null;
    // const isLogin = localStorage.token
    // if (data.isAuth) {
    //     const user = JSON.parse(localStorage.userData)
    // }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false)
            }
        }

        if (showMenu) document.addEventListener("click", handleClickOutside)

        else document.removeEventListener("click", handleClickOutside)

        return () => document.removeEventListener("click", handleClickOutside)
    }, [showMenu])

    return (
        <header className={classes.Header}>

            <Link to={"/"}>
                <LogoIcon/>
            </Link>

            {data.isAuth ? (
                <motion.div
                    className={classes.ProfileContainer}
                    onClick={() => setShowMenu((p) => !p)}
                    ref={menuRef}
                >
                    <span className={classes.ProfileName}>{data.user.name}</span>

                    <img
                        className={classes.ProfileAvatar}
                        src={data.user.avatar}
                        alt="profile"
                    />

                    <AnimatePresence>
                        {showMenu && <DropDownProfile/>}
                    </AnimatePresence>


                </motion.div>
            ) : (
                <Link to={"/auth/login"}>
                    <Button sidePadding={28} type={"blue"} text={"Sing in"}/>
                </Link>
            )}
        </header>
    )
}

