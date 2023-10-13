import classes from './Header.module.scss'
import React, {FC, PropsWithChildren, useEffect, useRef, useState} from "react"
import {LogoIcon} from "../../icons/LogoIcon";
import {Link} from "@tanstack/react-router";
import {Button} from "../Button/Button";
import {DropDownProfile} from "../DropDownProfile/DropDownProfile";
import {AnimatePresence, motion} from 'framer-motion';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {ILogin} from "../../../interfaces/AuthResponse";
import {useAppSelector} from "../../../hooks/hook";


interface HeaderProps {
}


export const Header: FC<PropsWithChildren<HeaderProps>> = ({}) => {
    const menuRef = useRef<HTMLDivElement | null>(null)
    const [showMenu, setShowMenu] = useState(false)
    const data = useAppSelector((state) => state.auth);
    const isAuth = localStorage.getItem("isAuth")

    const handleRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (window.location.href.includes("auth")) e.preventDefault()
    }

    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", function (event) {
        window.history.pushState(null, "", window.location.href)
    })

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

            <Link
                to={"/"}
                onClick={handleRedirect}
            >
                <LogoIcon/>
            </Link>

            {isAuth === "true" ? (
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

