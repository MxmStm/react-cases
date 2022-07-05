import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";

export const AppRouter = () => {
    const isAuth = true
    // const isAuth = false

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                    />
                )}
                <Route path={'*'} element={<Navigate to={'posts'} replace/>}/>
            </Routes>
            : <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                    />
                )}
                <Route path={'*'} element={<Navigate to={'login'} replace/>}/>
            </Routes>
    );
};
