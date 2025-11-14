import { useMemo } from "react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Link,
    Stack,
    Breadcrumbs,
    Typography,
    Box,
    InputAdornment,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconMenu from "./IconMenu";
import { useTranslation } from "../hooks/useTranslation.js";

export default function BreadCrumbs() {
    const { pathname } = useLocation();
    const root = { label: "tommasoberti@com:~ cd" };
    const navigate = useNavigate();
    const { t } = useTranslation();

    const crumbs = useMemo(() => {
        const path = pathname.split("/").filter(Boolean);
        let items = [];

        if (path.length === 0) {
            items = [{ label: "home", to: "/" }];
        } else {
            items = [
                { label: "home", to: "/" },
                ...path.map((seg, i) => {
                    const to = "/" + path.slice(0, i + 1).join("/");
                    const label = decodeURIComponent(seg);
                    return { label, to };
                }),
            ];
        }

        return [root, ...items];
    }, [pathname]);

    const menuItems = [
        { title: t("projects"), label: "projects" },
        { title: t("about"), label: "about" },
        { title: t("blog"), label: "blog" },
        { title: t("example-style"), label: "example-style" },
    ];

    const handleHomeMenuClick = (item) => {
        navigate(`/${item.label}`);
    };

    const handlePathMenuClick = (item) => {
        navigate(`/${item.label}`);
    };

    const handleBashInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.target.value;
            if (value === "..") {
                const previous = crumbs.at(-2);
                if (previous?.to) navigate(previous.to);
            } else {
                navigate(`/${value}`);
            }
        }
    };

    return (
        <Stack direction="row" alignItems="center">
            <Breadcrumbs
                separator={<Typography variant="h5">/</Typography>}
                aria-label="breadcrumb"
                sx={{
                    "& .MuiBreadcrumbs-separator": {
                        marginLeft: 1,
                        marginRight: 1,
                    },
                }}
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

                    if (item.label === "home") {
                        return (
                            <Box
                                key={item.to}
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
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

                                <IconMenu
                                    items={menuItems}
                                    onItemClick={handleHomeMenuClick}
                                    buttonId="home-button"
                                    menuId="home-menu"
                                    iconButtonProps={{
                                        sx: { p: 0 }
                                    }}
                                />
                            </Box>
                        );
                    }

                    return isLast ? (
                        <Typography
                            variant="h5"
                            key={item.to}
                            color="text.secondary"
                        >
                            {t(item.label).toLowerCase()}
                        </Typography>
                    ) : (
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
                    autoFocus={true}
                    sx={{
                        fontSize: (theme) => theme.typography.h5.fontSize,
                        fontWeight: (theme) => theme.typography.h5.fontWeight,
                        lineHeight: (theme) => theme.typography.h5.lineHeight,
                        color: "text.secondary",
                        "& .MuiInputBase-input": {
                            paddingY: 0,
                        },
                    }}
                    startAdornment={
                        <InputAdornment
                            position="start"
                            sx={{
                                p: 0,
                                m: 0,
                                "& .MuiIconButton-root": { p: 0 },
                            }}
                        >
                            <IconMenu
                                items={menuItems}
                                onItemClick={handlePathMenuClick}
                                buttonId="path-button"
                                menuId="path-menu"
                            />
                        </InputAdornment>
                    }
                />
            </Breadcrumbs>
        </Stack>
    );
}