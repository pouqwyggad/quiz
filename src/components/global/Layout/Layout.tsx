import {FC, PropsWithChildren, useRef, useLayoutEffect, useEffect} from "react";
import classes from './Layout.module.scss';
import {Header} from "../../ui/Header/Header";
import {Outlet} from "@tanstack/react-router";
import {Main} from "../../pages/Main/Main";

interface LayoutProps {

}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({}) => {
    const path = useRef('')

    useEffect(() => {
        path.current = window.location.pathname
        console.log(path.current)
    }, [window.location.pathname]);


    return (
        <div className={classes.Layout}>
            <Header/>

            <main className={classes.Main}>
                {!path.current.includes('/auth') && (
                    <Main/>
                )}

                <Outlet/>
            </main>

        </div>
    )
}