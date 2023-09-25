import {Outlet, RouterProvider, Link, Router, Route, RootRoute,} from '@tanstack/react-router';
import {Layout} from "../components/global/Layout/Layout";
import React from 'react';
import {Login} from "../components/pages/Login/Login";
import {Form} from "../components/global/Form/Form";
import {Registration} from "../components/pages/Registration/Registration";

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

const registrationRoute = new Route({
    getParentRoute: () => authRoute,
    path: "/registration",
    component: () => <Registration/>
})

const routeTree = rootRoute.addChildren([
    indexRoute.addChildren([
        authRoute.addChildren([
            loginRoute,
            registrationRoute
        ])
    ])
])

export const router = new Router({routeTree})


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
