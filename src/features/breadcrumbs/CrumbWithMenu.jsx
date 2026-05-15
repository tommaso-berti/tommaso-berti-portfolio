import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import IconMenu from "../components/IconMenu.jsx";
import { getTranslatedLabel } from "./breadcrumb.utils.js";

export default function CrumbWithMenu({ item, isLast, isOnly, itemsForMenu, t, onMenuClick }) {
    const isHome = item.id === "home";
    const isHomeAndOnly = isHome && isOnly;

    const isNonClickable =
        (isLast && !isHome) ||
        isHomeAndOnly;
    const label = getTranslatedLabel(item.id, t);

    const content = (
        <Link
            component={isNonClickable ? "span" : RouterLink}
            to={isNonClickable ? undefined : item.to}
            underline={isNonClickable ? "none" : "hover"}
            color="inherit"
            sx={isNonClickable ? { pointerEvents: "none", cursor: "default" } : undefined}
        >
            <Typography variant="h5" color={isNonClickable ? "text.secondary" : "text.primary"}>
                {label}
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
