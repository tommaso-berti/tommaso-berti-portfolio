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

const ROOT_ID = "tommasoberti@com:~ cd";

function CrumbWithMenu({ item, isLast, isOnly, itemsForMenu, t, onMenuClick }) {
    const isHome = item.id === "home";
    const isHomeAndOnly = isHome && isOnly;

    const isNonClickable =
        (isLast && !isHome) ||
        isHomeAndOnly;

    const content = isNonClickable ? (
        <Typography variant="h5" color="text.secondary">
            {t(item.id).toLowerCase()}
        </Typography>
    ) : (
        <Link
            component={RouterLink}
            to={item.to}
            underline="hover"
            color="inherit"
        >
            <Typography variant="h5" color="text.primary">
                {t(item.id).toLowerCase()}
            </Typography>
        </Link>
    );

    const buttonId = isHome
        ? "home-button"
        : `breadcrumb-${item.id}-button`;
    const menuId = isHome
        ? "home-menu"
        : `breadcrumb-${item.id}-menu`;

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
            ? [{ id: "home", to: "/" }]
            : [
                { id: "home", to: "/" },
                ...path.map((seg, i) => ({
                    id: decodeURIComponent(seg),
                    to: "/" + path.slice(0, i + 1).join("/")
                }))
            ];
    }, [pathname]);

    const getItemsForMenu = (id) => breadcrumb[id]?.items ?? [];
    const handleMenuClick = (menuItem, parentItem) => {
        if (!menuItem || typeof menuItem.id !== "string") {
            return;
        }
        const context = breadcrumb[parentItem?.id] ?? {};
        const useHash = context.type === "hash";
        const base = parentItem?.to ?? "/";

        if (useHash) {
            navigate(`${base}#${menuItem.id}`);
        } else {
            const safeid = menuItem.id.replace(/^\//, "");
            const separator =
                base.endsWith("/") || safeid === "" ? "" : "/";
            navigate(`${base}${separator}${safeid}`);
        }
    };

    const handleBashInput = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        const value = e.target.value.trim();
        if (!value) return;

        const current = crumbs.at(-1);
        const context = breadcrumb[current.id] ?? {};
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
            <Typography
                variant="h5"
                fontWeight="bold"
                color="text.primary"
                sx={{ mr: 1 }}
            >
                {ROOT_ID}
            </Typography>

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
                        itemsForMenu={getItemsForMenu(item.id)}
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
