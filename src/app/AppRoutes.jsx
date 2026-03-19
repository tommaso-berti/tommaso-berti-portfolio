import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Layout from "./layout/Layout.jsx";
import { PAGE_DEFINITIONS } from "./routing/appDefinitions.js";

function RouteFallback() {
    return (
        <Box
            sx={{
                minHeight: "40dvh",
                display: "grid",
                placeItems: "center",
            }}
        >
            <CircularProgress size={30} />
        </Box>
    );
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<RouteFallback />}>
            <Routes>
                <Route element={<Layout />}>
                    {PAGE_DEFINITIONS.map((page) => {
                        if (page.redirectTo) {
                            return (
                                <Route
                                    key={page.id}
                                    path={page.path}
                                    element={<Navigate to={page.redirectTo} replace={page.replace} />}
                                />
                            );
                        }

                        const PageComponent = page.component;
                        if (!PageComponent) return null;

                        if (page.index) {
                            return <Route key={page.id} index element={<PageComponent />} />;
                        }

                        return <Route key={page.id} path={page.path} element={<PageComponent />} />;
                    })}
                </Route>
            </Routes>
        </Suspense>
    );
}
