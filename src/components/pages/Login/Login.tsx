import classes from './Login.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {Link} from "@tanstack/react-router";
import {TextField} from "../../ui/TextField/TextField";

interface LoginProps {

}

export const Login: FC<PropsWithChildren<LoginProps>> = ({}) => {

    const [user, setUser] = useState<Record<string, string>>({email: "", password: ""})

    const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))

    }

    return (
        <div className={classes.Login}>
            <div className={classes.Title}>Sing in</div>

            <TextField
                name={"email"}
                user={user}
                onChange={(e) => handleChangeUserValue(e)}
                text={"Email"}
            />
            <TextField
                name={"password"}
                user={user}
                onChange={(e) => handleChangeUserValue(e)}
                text={"Password"}
            />

            <label className={classes.CustomCheckbox}>
                <input
                    className={classes.HiddenCheckbox}
                    type="checkbox"
                />
                <span className={classes.Checkmark}></span>
                Remember me
            </label>


            <div className={classes.ForgotPass}>Forgot Password?</div>

            <button className={classes.SubmitButton}>Sing In</button>

            <div className={classes.NoAccount}>Don't you have an account yet?</div>

            {/*<Link */}

            <Link
                to={"/auth/registration"}
                // activeProps={{
                //     className: classes.ActiveLink
                // }}
               className={classes.SingUpButton}
            >
                Sing Up
            </Link>
        </div>
    )
}