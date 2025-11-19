import { useMemo } from "react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Link,
    Stack,
    Breadcrumbs,
    Typography,
    InputBase
} from "@mui/material";
import IconMenu from "./components/IconMenu.jsx";
import { useTranslation } from "../hooks/useTranslation.js";
import { useBreadcrumb } from "../contexts/BreadCrumbContext.jsx";

export default function BreadCrumbs() {
    const { pathname } = useLocation();
    const root = { label: "tommasoberti@com:~ cd" };
    const navigate = useNavigate();
    const { breadcrumb } = useBreadcrumb();
    const { t } = useTranslation();

    const crumbs = useMemo(() => {
        const path = pathname.split("/").filter(Boolean);
        const items = path.length === 0
            ? [{ label: "home", to: "/" }]
            : [
                { label: "home", to: "/" },
                ...path.map((seg, i) => ({
                    label: decodeURIComponent(seg),
                    to: "/" + path.slice(0, i + 1).join("/")
                })),
            ];
        return [root, ...items];
    }, [pathname]);

    const handleMenuClick = (menuItem, parentItem) => {
        const context = breadcrumb[parentItem?.label] ?? {};
        const useHash = context.type === "hash";
        const base = parentItem?.to ?? "/";
        console.log("base", base);
        if (useHash) {
            navigate(`${base}#${menuItem.label}`);
        } else {
            const safeLabel = menuItem.label.startsWith("/")
                ? menuItem.label.slice(1)
                : menuItem.label;
            const separator = base.endsWith("/") || safeLabel === "" ? "" : "/";
            navigate(`${base}${separator}${safeLabel}`);
        }
    };

    const handleBashInput = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        const value = e.target.value.trim();
        if (!value) return;

        const current = crumbs.at(-1);
        const context = breadcrumb[current.label] ?? {};
        const useHash = context.type === "hash";

        if (value === "..") {
            const previous = crumbs.at(-2);
            if (previous?.to) navigate(previous.to);
            return;
        }

        if (useHash) {
            const base = current.to?.split("#")[0] ?? "";
            navigate(`${base}#${value}`);
        } else {
            const base = current?.to ?? "";
            const separator = base.endsWith("/") ? "" : "/";
            navigate(`${base}${separator}${value}`);
        }
    };

    return (
        <Stack direction="row" alignItems="center">
            <Breadcrumbs
                separator={<Typography variant="h5">/</Typography>}
                aria-label="breadcrumb"
                sx={{ "& .MuiBreadcrumbs-separator": { mx: 1 } }}
            >
                {crumbs.map((item, idx) => {
                    if (idx === 0) {
                        return (
                            <Typography
                                key="root"
                                color="text.primary"
                                variant="h5"
                                fontWeight="bold"
                            >
                                {root.label}
                            </Typography>
                        );
                    }

                    const isLast = idx === crumbs.length - 1;
                    const itemsForMenu = breadcrumb[item.label]?.items || breadcrumb[item.label] || [];

                    if (item.label === "home") {
                        return (
                            <Stack key={item.to} direction="row" alignItems="center">
                                <Link
                                    component={RouterLink}
                                    to={item.to}
                                    underline="hover"
                                    color="inherit"
                                >
                                    <Typography variant="h5" color="text.primary">
                                        {t(item.label).toLowerCase()}
                                    </Typography>
                                </Link>

                                {itemsForMenu.length > 0 && (
                                    <IconMenu
                                        items={itemsForMenu}
                                        onItemClick={(menuItem) => handleMenuClick(menuItem, item)}
                                        buttonId="home-button"
                                        menuId="home-menu"
                                        iconButtonProps={{ sx: { p: 0 } }}
                                    />
                                )}
                            </Stack>
                        );
                    }

                    if (isLast && itemsForMenu.length > 0) {
                        return (
                            <Stack key={item.to} direction="row" alignItems="center">
                                <Typography variant="h5" color="text.secondary">
                                    {t(item.label).toLowerCase()}
                                </Typography>
                                <IconMenu
                                    items={itemsForMenu}
                                    onItemClick={(menuItem) => handleMenuClick(menuItem, item)}
                                    buttonId="path-button"
                                    menuId="path-menu"
                                    iconButtonProps={{ sx: { p: 0 } }}
                                />
                            </Stack>
                        );
                    }

                    return (
                        <Link
                            key={item.to}
                            component={RouterLink}
                            to={item.to}
                            underline="hover"
                            color="inherit"
                        >
                            <Typography variant="h5" color="text.primary">
                                {t(item.label).toLowerCase()}
                            </Typography>
                        </Link>
                    );
                })}

                <InputBase
                    onKeyDown={handleBashInput}
                    autoFocus
                    sx={{
                        fontSize: (theme) => theme.typography.h5.fontSize,
                        fontWeight: (theme) => theme.typography.h5.fontWeight,
                        lineHeight: (theme) => theme.typography.h5.lineHeight,
                        color: "text.secondary",
                        "& .MuiInputBase-input": { py: 0 }
                    }}
                />
            </Breadcrumbs>
        </Stack>
    );
}