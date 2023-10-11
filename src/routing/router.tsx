import {Outlet, Router, Route, RootRoute, redirect} from '@tanstack/react-router';
import {Layout} from "../components/global/Layout/Layout";
import React from 'react';
import {Login} from "../components/pages/Login/Login";
import {Form} from "../components/global/Form/Form";
import {Registration} from "../components/pages/Registration/Registration";
import {Profile} from "../components/pages/Profile/Profile";
import {RecoverPass} from "../components/pages/RecoverPass/RecoverPass";
import {NewPass} from "../components/pages/newPass/NewPass";
import {CheckEmail} from "../components/pages/CheckEmail/CheckEmail";

const rootRoute = new RootRoute({
    component: () => (
        <>
            <Outlet/>
        </>
    )
})

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Layout
})

const authRoute = new Route({
    getParentRoute: () => indexRoute,
    path: "/auth",
    component: () => <Form/>
})

const loginRoute = new Route({
    getParentRoute: () => authRoute,
    path: "/login",
    component: () => <Login/>
})

const recoverRoute = new Route({
    getParentRoute: () => authRoute,
    path: "/forgot-password",
    component: () => <RecoverPass/>
})

const newPasswordsRoute = new Route({
    getParentRoute: () => authRoute,
    path: "/set-new-password",
    component: () => <NewPass/>
})

const newPassRoute = new Route({
    getParentRoute: () => newPasswordsRoute,
    path: "$token"
})

const registrationRoute = new Route({
    getParentRoute: () => authRoute,
    path: "/registration",
    component: () => <Registration/>
})

const checkEmailRoute = new Route({
    getParentRoute: () => authRoute,
    path: "/check-mail",
    component: () => <CheckEmail/>
})

const profileRoute = new Route({
    getParentRoute: () => indexRoute,
    path: "/profile",
    component: () => <Profile/>,
    beforeLoad: async () => {
        if(localStorage.getItem("isAuth") !== "true") {
            throw redirect({
                to:"/auth/login"
            })
        } else {
           console.log("authorized")
        }
    }
})

const routeTree = rootRoute.addChildren([
    indexRoute.addChildren([
        authRoute.addChildren([
            loginRoute,
            registrationRoute,
            recoverRoute,
            newPasswordsRoute.addChildren([newPassRoute]),
            checkEmailRoute
        ]),
        profileRoute
    ])
])

export const router = new Router({
    routeTree,
    defaultPreload: 'intent'
})

// declare module '@tanstack/react-router' {
//     interface Register {
//         router: typeof router
//     }
// }
