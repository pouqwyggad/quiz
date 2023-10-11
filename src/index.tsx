import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.css'
import {App} from './App';
import {Provider} from "react-redux";
import store from "./store/store";
import {SkeletonTheme} from "react-loading-skeleton";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <SkeletonTheme baseColor={"#202020"} highlightColor={"#444"}>
        <Provider store={store}>
            <App/>
        </Provider>
    </SkeletonTheme>
)