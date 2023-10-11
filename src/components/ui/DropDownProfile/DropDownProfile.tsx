import classes from './DropDownProfile.module.scss'
import {FC, ForwardedRef, forwardRef, PropsWithChildren} from "react"
import {UserIcon} from "../../icons/UserIcon";
import {LogOutIcon} from "../../icons/LogOutIcon";
import {motion} from "framer-motion";
import {profileDropDownMotion} from "../../../motions/pageMotion";
import {Link} from "@tanstack/react-router";
import {Button} from "../Button/Button";
import {logoutAsync} from "../../../store/authSlice";
import {useAppDispatch} from "../../../hooks/hook";

interface DropDownProfileProps {
}

export const DropDownProfile: FC<PropsWithChildren<DropDownProfileProps>> = ({}) => {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logoutAsync())
    }

    return (
        <motion.ul
            variants={profileDropDownMotion}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            className={classes.Container}
        >
            <Link to={"/profile"} className={classes.Item}>
                <UserIcon/>
                Profile
            </Link>

            <Link
                onClick={handleLogout}
                to={"/auth/login"}
                className={classes.Item}
            >
                <LogOutIcon/>
                Log out
            </Link>
        </motion.ul>
    )
}