import classes from './Login.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {Link, useNavigate} from "@tanstack/react-router";
import {TextField} from "../../ui/TextField/TextField";
import {Button} from "../../ui/Button/Button";
import {loginAsync} from "../../../store/authSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/hook";

interface LoginProps {}

export const Login: FC<PropsWithChildren<LoginProps>> = ({}) => {
    const navigate = useNavigate({from: '/auth/login'})
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.auth);

    const [user, setUser] = useState<Record<string, string>>({email: "", password: ""})
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleLogin = async () => {
        const res = await dispatch(loginAsync({email: user.email, password: user.password, rememberMe}));

        console.log(res)
        if (res.meta.requestStatus === "fulfilled") {
            navigate({to: '/profile'});
        } else {
            console.error("Authentication failed.");
        }
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Title}>Sing in</div>

            <TextField
                name={"email"}
                user={user}
                onChange={handleChangeUserValue}
                text={"Email"}
            />
            <TextField
                name={"password"}
                user={user}
                onChange={handleChangeUserValue}
                text={"Password"}
            />

            <label className={classes.CustomCheckbox}>
                <input
                    className={classes.HiddenCheckbox}
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => {
                        setRememberMe(prevState => !prevState)
                    }}
                />
                <span className={classes.Checkmark}></span>
                Remember me
            </label>

            <Link
                to={"/auth/recover"}
                className={classes.ForgotPass}
            >
                Forgot Password?
            </Link>


            <Button
                sidePadding={145}
                type={"blue"}
                text={"Sing In"}
                onClick={handleLogin}
            />

            <div className={classes.NoAccount}>Don't you have an account yet?</div>

            <Link
                to={"/auth/registration"}
                className={classes.SingUpButton}
            >
                Sing Up
            </Link>
        </div>
    )
}