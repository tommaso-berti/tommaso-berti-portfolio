import { useMemo } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Link, Stack, Breadcrumbs, Typography } from "@mui/material";

export default function BreadCrumbs() {
    const { pathname } = useLocation();
    const root = { label: 'tommasoberti@ > $ cd' };

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
        <Stack spacing={2} direction="row" alignItems="center">
            <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ fontFamily: 'monospace' }}>
                {crumbs.map((item, idx) => {
                    if (idx === 0) {
                        return (
                            <Typography key="root" color="text.secondary">
                                {item.label}
                            </Typography>
                        );
                    }

                    const isLast = idx === crumbs.length - 1;
                    return isLast ? (
                        <Typography key={item.to} color="text.primary">
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
                            {item.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Stack>
    );
}
