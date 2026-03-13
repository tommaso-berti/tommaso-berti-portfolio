import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout.jsx";
import { PAGE_DEFINITIONS } from "../config/appDefinitions.js";

export default function AppRoutes() {
    return (
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
    );
}
