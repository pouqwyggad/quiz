import classes from './RecoverPass.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {TextField} from "../../ui/TextField/TextField";
import {Link} from "@tanstack/react-router";
import {useAppDispatch} from "../../../hooks/hook";
import {resetPasswordAsync} from "../../../store/resetPasswordSlice";

interface RecoverPassProps {
}

export const RecoverPass: FC<PropsWithChildren<RecoverPassProps>> = ({}) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>("")

    const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    console.log(email)

    const resetPass = async () => {
        const res = await dispatch(resetPasswordAsync({email}))
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Title}>Forgot your password?</div>

            <TextField
                name={"email"}
                // user={email}
                onChange={(e) => handleChangeUserValue(e)}
                text={"Email"}
            />

            <div className={classes.ForgotPass}>Enter your email address and we will send you further instructions</div>

            <Link
                to={"/auth/set-new-password"}
                style={{
                    color: "red"
                }}
                // className={classes.SubmitButton}
                onClick={resetPass}
            >
                Send Instructions
            </Link>

            <div className={classes.NoAccount}>Did you remember your password?</div>

            <Link
                to={"/auth/login"}
                className={classes.SingUpButton}
            >
                Try logging in
            </Link>
        </div>
    )
}