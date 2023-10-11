import classes from './Profile.module.scss'
import React, {FC, PropsWithChildren, useEffect, useState} from "react"
import {ChooseProfileAvatarIcon} from "../../icons/ChooseProfileAvatarIcon";
import {EditIcon} from "../../icons/EditIcon";
import {Button} from "../../ui/Button/Button";
import {LogOutIcon} from "../../icons/LogOutIcon";
import {useAppDispatch, useAppSelector} from "../../../hooks/hook";
import {Link, useNavigate} from "@tanstack/react-router";
import {BackPageButton} from "../../ui/BackPageButton/BackPageButton";
import {changeProfileNameAsync, checkAuth, logoutAsync} from "../../../store/authSlice";
import {TextField} from "../../ui/TextField/TextField";
import {pageMotion} from "../../../motions/pageMotion";
import {motion} from 'framer-motion';

interface ProfileProps {
}

export const Profile: FC<PropsWithChildren<ProfileProps>> = ({}) => {
    // const navigate = useNavigate({from: "/"})
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.auth);
    const [name, setName] = useState(data.user.name)
    const [avatar, setAvatar] = useState(data.user.avatar)
    const [editName, setEditName] = useState(false)

    const getUser = localStorage.getItem("userData")


    useEffect(() => {
        try {
            if (getUser) {
                const user = JSON.parse(getUser)
                setName(user.name)
                setAvatar(user.avatar)
            }
        } catch (e: any) {
            console.log("Error:" + e.message)
        }
    }, [getUser])

    const handleLogout = () => {
        dispatch(logoutAsync())
    }

    const edit = () => {
        setEditName(p => !p)
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const saveNewName = () => {
        dispatch(changeProfileNameAsync({avatar, name}))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0]
        if (selectedImage) {
            const reader = new FileReader()
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setAvatar(reader.result)
                    dispatch(changeProfileNameAsync({avatar: reader.result, name}))
                }
            }
            reader.readAsDataURL(selectedImage)
        }
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             if (localStorage.getItem("token")) {
    //                 const result = await dispatch(checkAuth());
    //
    //                 console.log(result)
    //                 if (result.payload === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
    //                     console.log("redirect")
    //                     navigate({to: '/auth/login'})
    //                 } else {
    //                     console.log("LOGINNED")
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Ошибка запроса:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    return (
        <motion.div
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            variants={pageMotion}
            className={classes.Profile}
        >
            <div className={classes.ProfileCardContainer}>

                <div className={classes.ProfileTitle}>Personal Information</div>

                <div className={classes.AvatarContainer}>
                    <img
                        className={classes.AvatarImg}
                        src={avatar}
                        alt="Profile img"
                    />

                    <label className={classes.AvatarChangeIcon}>
                        <ChooseProfileAvatarIcon className={classes.ChooseProfileAvatarIconHover}/>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                {editName ? (
                    <div className={classes.EditContainer}>
                        <TextField onChange={handleChangeName} text={"Nickname"} name={"text"}/>
                        <button
                            className={classes.ButtonSave}
                            onClick={() => {
                                saveNewName()
                                edit()
                            }}
                        >
                            save
                        </button>
                    </div>
                ) : (
                    <div className={classes.NameArea}>
                        <div
                            className={classes.Username}
                        >
                            {data.user.name}
                        </div>

                        <EditIcon
                            width={"20"}
                            height={"20"}
                            className={classes.Edit}
                            onClick={edit}
                        />
                    </div>
                )}

                <div className={classes.EmailText}>{data.user.email}</div>

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
        </motion.div>
    )
}