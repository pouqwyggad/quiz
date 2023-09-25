import React, {FC, PropsWithChildren} from 'react';
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./routing/router";

export const App: FC = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}