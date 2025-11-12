import { useMemo } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Link, Stack, Breadcrumbs, Typography } from "@mui/material";

export default function BreadCrumbs() {
    const { pathname } = useLocation();
    const root = { label: '> $ cd' };

    const crumbs = useMemo(() => {
        const path = pathname.split("/").filter(Boolean);
        let items = [];

        if (path.length === 0) {
            items = [{ label: 'home', to: '/' }];
        } else {
            items = [{ label: 'home', to: '/' },
                ...path.map((seg, i) => {
                    const to = "/" + path.slice(0, i + 1).join("/");
                    const label = decodeURIComponent(seg);
                    return { label, to };
                })
            ];
        }

        return [root, ...items];
    }, [pathname]);

    return (
        <Stack direction="row" alignItems="center">
            <Breadcrumbs separator="/" aria-label="breadcrumb">
                {crumbs.map((item, idx) => {
                    if (idx === 0) {
                        return (
                            <Typography
                                key="root"
                                color="text.primary"
                                variant="h4"
                                fontWeight="semibold"
                            >
                                {item.label}
                            </Typography>
                        );
                    }

                    const isLast = idx === crumbs.length - 1;
                    return isLast ? (
                        <Typography variant="h5" key={item.to} color="text.secondary">
                            {item.label}
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
                                {item.label}
                            </Typography>
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Stack>
    );
}
