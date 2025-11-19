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

const ROOT_LABEL = "tommasoberti@com:~ cd";

function CrumbWithMenu({ item, isLast, isOnly, itemsForMenu, t, onMenuClick }) {
    const isHome = item.label === "home";
    const isHomeAndOnly = isHome && isOnly;

    const isNonClickable =
        // ultimo crumb diverso da home
        (isLast && !isHome) ||
        // home ma unico crumb (path = "/")
        isHomeAndOnly;

    const content = isNonClickable ? (
        <Typography variant="h5" color="text.secondary">
            {t(item.label).toLowerCase()}
        </Typography>
    ) : (
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
    );

    const buttonId = isHome
        ? "home-button"
        : `breadcrumb-${item.label}-button`;
    const menuId = isHome
        ? "home-menu"
        : `breadcrumb-${item.label}-menu`;

    return (
        <Stack direction="row" alignItems="center">
            {content}

            {itemsForMenu.length > 0 && (
                <IconMenu
                    items={itemsForMenu}
                    onItemClick={(menuItem) => onMenuClick(menuItem, item)}
                    buttonId={buttonId}
                    menuId={menuId}
                    iconButtonProps={{ sx: { p: 0 } }}
                />
            )}
        </Stack>
    );
}

export default function BreadCrumbs() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { breadcrumb } = useBreadcrumb();
    const { t } = useTranslation();

    const crumbs = useMemo(() => {
        const path = pathname.split("/").filter(Boolean);

        return path.length === 0
            ? [{ label: "home", to: "/" }]
            : [
                { label: "home", to: "/" },
                ...path.map((seg, i) => ({
                    label: decodeURIComponent(seg),
                    to: "/" + path.slice(0, i + 1).join("/")
                }))
            ];
    }, [pathname]);

    const getItemsForMenu = (label) =>
        breadcrumb[label]?.items || breadcrumb[label] || [];

    const handleMenuClick = (menuItem, parentItem) => {
        const context = breadcrumb[parentItem?.label] ?? {};
        const useHash = context.type === "hash";
        const base = parentItem?.to ?? "/";

        if (useHash) {
            navigate(`${base}#${menuItem.label}`);
        } else {
            const safeLabel = menuItem.label.replace(/^\//, "");
            const separator =
                base.endsWith("/") || safeLabel === "" ? "" : "/";
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

    const hasSingleCrumb = crumbs.length === 1;

    return (
        <Stack direction="row" alignItems="center">
            {/* prompt stile terminale */}
            <Typography
                variant="h5"
                fontWeight="bold"
                color="text.primary"
                sx={{ mr: 1 }}
            >
                {ROOT_LABEL}
            </Typography>

            {/* slash iniziale */}
            <Typography variant="h5" color="text.primary" sx={{ mx: 1 }}>
                /
            </Typography>

            <Breadcrumbs
                separator={<Typography variant="h5">/</Typography>}
                aria-label="breadcrumb"
                sx={{ "& .MuiBreadcrumbs-separator": { mx: 1 } }}
            >
                {crumbs.map((item, idx) => (
                    <CrumbWithMenu
                        key={item.to}
                        item={item}
                        isLast={idx === crumbs.length - 1}
                        isOnly={hasSingleCrumb}
                        itemsForMenu={getItemsForMenu(item.label)}
                        t={t}
                        onMenuClick={handleMenuClick}
                    />
                ))}

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