import classes from './Profile.module.scss'
import {FC, PropsWithChildren} from "react"
import {ChooseProfileAvatarIcon} from "../../icons/ChooseProfileAvatarIcon";
import {EditIcon} from "../../icons/EditIcon";
import {Button} from "../../ui/Button/Button";
import {LogOutIcon} from "../../icons/LogOutIcon";
import {useAppDispatch, useAppSelector} from "../../../hooks/hook";
import {ArrowBackIcon} from "../../icons/ArrowBackIcon";
import {Link} from "@tanstack/react-router";
import {BackPageButton} from "../../ui/BackPageButton/BackPageButton";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {logoutAsync} from "../../../store/authSlice";

interface ProfileProps {

}

export const Profile: FC<PropsWithChildren<ProfileProps>> = ({}) => {
    const dispatch = useAppDispatch()
    const userInfo = useAppSelector((state) => state.auth.user);

    const user = JSON.parse(localStorage.userData)

    console.log(user)

    const handleLogout = () => {
        const res = dispatch(logoutAsync())
    }

    return (
        <div className={classes.Profile}>
            <div className={classes.ProfileCardContainer}>

                <div className={classes.ProfileTitle}>Personal Information</div>

                <div className={classes.AvatarContainer}>
                    <img
                        className={classes.AvatarImg}
                        // @ts-ignore
                        src={user.avatar} alt=""
                    />

                    <div className={classes.AvatarChangeIcon}>
                        <ChooseProfileAvatarIcon/>
                    </div>
                </div>

                <div className={classes.NameArea}>
                    <div
                        className={classes.Username}
                    >
                        {
                            // @ts-ignore
                            user.name
                        }
                    </div>
                    <EditIcon/>
                </div>

                <div className={classes.EmailText}>
                    {
                        // @ts-ignore
                        user.email
                    }
                </div>

                <BackPageButton
                    src={"/"}
                />

                <Link
                    to={"/auth/login"}
                >
                    <Button
                        sidePadding={20}
                        type={'white'}
                        text={"Log out"}
                        onClick={handleLogout}
                    >
                        <LogOutIcon/>
                    </Button>
                </Link>

            </div>
        </div>
    )
}