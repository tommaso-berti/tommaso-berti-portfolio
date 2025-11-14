import { useMemo } from "react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import { Link, Stack, Breadcrumbs, Typography } from "@mui/material";
import InputBase from '@mui/material/InputBase';

export default function BreadCrumbs() {
    const { pathname } = useLocation();
    const root = { label: 'tommasoberti@com:~ cd' };
    const navigate = useNavigate();

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

    const handleBashInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.target.value;
            if(value === '..') {
                navigate(`${crumbs[crumbs.length - 2].to}`)
            }
            else
            navigate(`/${value}`)
        }
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
        >
            <Breadcrumbs
                separator={
                    <Typography
                        variant="h5"
                    >
                        /
                    </Typography>
                }
                aria-label="breadcrumb"
                sx={{
                    '& .MuiBreadcrumbs-separator': {
                        marginLeft: 1,
                        marginRight: 1,
                    }
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
                <InputBase
                    onKeyDown={handleBashInput}
                    autoFocus={true}
                    sx={{
                        fontSize: theme => theme.typography.h5.fontSize,
                        fontWeight: theme => theme.typography.h5.fontWeight,
                        lineHeight: theme => theme.typography.h5.lineHeight,
                        color: 'text.secondary',
                        '& .MuiInputBase-input': {
                            paddingY: 0
                        }
                    }}
                />
            </Breadcrumbs>
        </Stack>
    );
}
