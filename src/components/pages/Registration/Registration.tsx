import classes from './Registration.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {TextField} from "../../ui/TextField/TextField";
import {Link} from "@tanstack/react-router";

interface RegistrationProps {

}

export const Registration: FC<PropsWithChildren<RegistrationProps>> = ({}) => {


    const [user, setUser] = useState<Record<string, string>>({email: "", password: "", confirm: ""})

    const handleChangeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Title}>Sing up</div>

            <TextField
                user={user}
                name={"email"}
                onChange={(e) => handleChangeUserValue(e)}
                text={"Email"}
            />
            <TextField
                user={user}
                name={"password"}
                onChange={(e) => handleChangeUserValue(e)}
                text={"Password"}
            />

            <TextField
                user={user}
                name={"confirm"}
                onChange={(e) => handleChangeUserValue(e)}
                text={"Confirm password"}
            />


            <button className={classes.SubmitButton}>Sing Up</button>

            <div className={classes.NoAccount}>Already have an account?</div>

            <Link
                to={"/auth/login"}
                // activeProps={{
                //     className: classes.ActiveLink
                // }}
                className={classes.SingUpButton}
            >
                Sing In
            </Link>
        </div>
    )
}