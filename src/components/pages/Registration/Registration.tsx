import classes from './Registration.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {TextField} from "../../ui/TextField/TextField";
import {Link, useNavigate} from "@tanstack/react-router";
import {Button} from "../../ui/Button/Button";
import {useAppDispatch, useAppSelector} from "../../../hooks/hook";
import {registerAsync} from "../../../store/registerSlice";

interface RegistrationProps {

}

export const Registration: FC<PropsWithChildren<RegistrationProps>> = ({}) => {

    const navigate = useNavigate({ from: '/auth/registration' })
    const dispatch = useAppDispatch();
    // @ts-ignore
    const userInfo = useAppSelector(state => state.register.user)

    const [user, setUser] = useState<Record<string, string>>({email: "", password: "", confirm: ""})

    const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleRegister = async () => {
        // e.preventDefault()
       const res = await dispatch(registerAsync({email: user.email, password: user.password}))
        console.log("RES")
        console.log(res)

        if (res) {
            navigate({ to: '/auth/login'})
        }


    }

    return (
        <div className={classes.Login}>
            <div className={classes.Title}>Sing up</div>

            <TextField
                user={user}
                name={"email"}
                onChange={handleChangeUserValue}
                text={"Email"}
            />
            <TextField
                user={user}
                name={"password"}
                onChange={handleChangeUserValue}
                text={"Password"}
            />

            <TextField
                user={user}
                name={"confirm"}
                onChange={handleChangeUserValue}
                text={"Confirm password"}
            />


            <Button
                sidePadding={145}
                type={"blue"}
                text={"Sing Up"}
                onClick={handleRegister}
            />

            <div className={classes.NoAccount}>Already have an account?</div>

            <Link
                to={"/auth/login"}
                className={classes.SingUpButton}
            >
                Sing In
            </Link>
        </div>
    )
}