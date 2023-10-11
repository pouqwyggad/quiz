import {FC, PropsWithChildren, useRef, useMemo, useEffect} from "react";
import classes from './Layout.module.scss';
import {Header} from "../../ui/Header/Header";
import {Outlet, useNavigate} from "@tanstack/react-router";
import {Main} from "../../pages/Main/Main";
import {checkAuth} from "../../../store/authSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/hook";
// import {router} from "../../../routing/router";

interface LayoutProps {
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({}) => {
    const navigate = useNavigate({from: "/"})
    const dispatch = useAppDispatch()
    const path = useRef('')

    useMemo(() => {
        path.current = window.location.pathname
    }, [window.location.pathname])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem("token")) {
                    const result = await dispatch(checkAuth());

                    console.log(result)
                    if (result.payload === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
                        console.log("redirect")
                         navigate({to: "/auth/login"})
                    }  else {
                        console.log("LOGINNED")
                    }
                }
            } catch (error) {
                console.error('Ошибка запроса:', error)
            }
        };

        fetchData()
    }, [])

    return (
        <div
            className={classes.Layout}
        >
            <Header/>

            <main className={classes.Main}>
                {path.current === '/' && (
                    <Main/>
                )}

                <Outlet/>
            </main>

        </div>
    )
}