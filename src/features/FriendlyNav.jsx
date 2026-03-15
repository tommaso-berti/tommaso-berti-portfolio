import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { PAGE_DEFINITIONS } from "../app/routing/appDefinitions.js";
import { useTranslation } from "../hooks/useTranslation.js";

function isTopLevelPage(page) {
    if (!page?.component) return false;
    if (!page.navKey) return false;
    if (!page.path) return false;
    if (page.path.includes(":") || page.path === "*") return false;
    return true;
}

function isActivePath(pathname, targetPath) {
    if (targetPath === "/") return pathname === "/";
    return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

export default function FriendlyNav() {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const navItems = PAGE_DEFINITIONS.filter(isTopLevelPage).map((page) => ({
        id: page.id,
        path: page.path,
        label: t(`nav.${page.navKey}`, page.id),
    }));

    return (
        <Box sx={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
            <Stack direction="row" spacing={1} sx={{ width: "max-content", minWidth: "100%", py: 0.25 }}>
                {navItems.map((item) => {
                    const active = isActivePath(pathname, item.path);

                    return (
                        <Chip
                            key={item.id}
                            label={item.label}
                            clickable
                            component={RouterLink}
                            to={item.path}
                            color={active ? "secondary" : "default"}
                            variant={active ? "filled" : "outlined"}
                            aria-current={active ? "page" : undefined}
                            sx={{
                                borderRadius: 1.5,
                                fontWeight: 600,
                                textTransform: "none",
                                borderColor: "divider",
                                "&:hover": {
                                    backgroundColor: active ? "secondary.main" : "action.hover",
                                },
                                "&:focus-visible": {
                                    outline: "2px solid",
                                    outlineColor: "secondary.main",
                                    outlineOffset: 2,
                                },
                            }}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}
