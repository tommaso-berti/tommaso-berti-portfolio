import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Box,
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
const MISSING = "__missing__";
const SUGGESTION_INTERVAL_MS = 1800;

function normalizeToken(value) {
    return `${value ?? ""}`.trim().toLowerCase();
}

function normalizeSegment(value) {
    return decodeURIComponent(`${value ?? ""}`).replace(/^\/+|\/+$/g, "");
}

function prettifyId(value) {
    return normalizeSegment(value).replace(/[-_]+/g, " ");
}

function getTranslatedLabel(id, t) {
    const normalizedId = normalizeSegment(id);
    if (!normalizedId) return "";

    const navLabel = t(`nav.${normalizedId}`, { defaultValue: MISSING });
    if (navLabel !== MISSING) return navLabel.toLowerCase();

    const projectLabel = t(`pages.projects.${normalizedId}.title`, { defaultValue: MISSING });
    if (projectLabel !== MISSING) return projectLabel.toLowerCase();

    return prettifyId(normalizedId).toLowerCase();
}

function getContextId({ pathname, currentId, breadcrumb }) {
    if (breadcrumb[currentId]) return currentId;
    if (pathname === "/") return "home";
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/projects")) return "projects";

    const firstSegment = normalizeSegment(pathname.split("/").filter(Boolean)[0]);
    if (breadcrumb[firstSegment]) return firstSegment;

    return "home";
}

function getContextBasePath(contextId, currentCrumb) {
    if (contextId === "home") return "/";
    if (contextId === "about") return "/about";
    if (contextId === "projects") return "/projects";
    return currentCrumb?.to?.split("#")[0] || "/";
}

function CrumbWithMenu({ item, isLast, isOnly, itemsForMenu, t, onMenuClick }) {
    const isHome = item.id === "home";
    const isHomeAndOnly = isHome && isOnly;

    const isNonClickable =
        (isLast && !isHome) ||
        isHomeAndOnly;
    const label = getTranslatedLabel(item.id, t);

    const content = isNonClickable ? (
        <Typography variant="h5" color="text.secondary">
            {label}
        </Typography>
    ) : (
        <Link
            component={RouterLink}
            to={item.to}
            underline="hover"
            color="inherit"
        >
            <Typography variant="h5" color="text.primary">
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

export default function BreadCrumbs() {
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();
    const { breadcrumb } = useBreadcrumb();
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState("");
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef(null);

    const crumbs = useMemo(() => {
        const path = pathname.split("/").filter(Boolean).map(normalizeSegment);

        return path.length === 0
            ? [{ id: "home", to: "/" }]
            : [
                { id: "home", to: "/" },
                ...path.map((seg, i) => ({
                    id: seg,
                    to: "/" + path.slice(0, i + 1).join("/")
                }))
            ];
    }, [pathname]);

    const activeCrumb = crumbs.at(-1);
    const activeContextId = getContextId({
        pathname,
        currentId: activeCrumb?.id,
        breadcrumb
    });
    const activeContext = breadcrumb[activeContextId] ?? { type: "path", items: [] };
    const contextBasePath = getContextBasePath(activeContextId, activeCrumb);

    const allowedCommands = useMemo(() => {
        const map = new Map();
        const parentCrumb = crumbs.at(-2);
        if (parentCrumb?.to) {
            map.set("..", parentCrumb.to);
        }

        const items = Array.isArray(activeContext.items) ? activeContext.items : [];
        for (const item of items) {
            const safeId = normalizeSegment(item.id);
            if (!safeId) continue;

            const pathTarget = activeContext.type === "hash"
                ? `${contextBasePath}#${safeId}`
                : contextBasePath === "/"
                    ? `/${safeId}`
                    : `${contextBasePath}/${safeId}`;

            map.set(normalizeToken(safeId), pathTarget);
            map.set(normalizeToken(item.title), pathTarget);
        }

        if (map.size === 0) {
            map.set("..", crumbs.at(-2)?.to || "/");
        }

        return map;
    }, [activeContext.items, activeContext.type, contextBasePath, crumbs]);

    const suggestionValues = useMemo(() => {
        const values = [];
        for (const [command] of allowedCommands.entries()) {
            if (command === "..") {
                values.push("..");
            } else if (!values.includes(command)) {
                values.push(command);
            }
        }
        return values;
    }, [allowedCommands]);

    useEffect(() => {
        if (!suggestionValues.length || inputValue.trim() !== "") return;

        const intervalId = setInterval(() => {
            setSuggestionIndex((previous) => (previous + 1) % suggestionValues.length);
        }, SUGGESTION_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [suggestionValues, inputValue]);

    useEffect(() => {
        setSuggestionIndex(0);
    }, [activeContextId, pathname, hash]);

    useEffect(() => {
        setIsInputFocused(document.activeElement === inputRef.current);
    }, []);

    const getItemsForMenu = (id) => breadcrumb[id]?.items ?? [];
    const handleMenuClick = (menuItem, parentItem) => {
        if (!menuItem || typeof menuItem.id !== "string") {
            return;
        }

        const safeId = normalizeSegment(menuItem.id);
        if (!safeId) return;

        const context = breadcrumb[parentItem?.id] ?? {};
        const useHash = context.type === "hash";
        const base = parentItem?.to ?? "/";

        if (useHash) {
            navigate(`${base.split("#")[0]}#${safeId}`);
        } else {
            const separator =
                base.endsWith("/") || safeId === "" ? "" : "/";
            navigate(`${base}${separator}${safeId}`);
        }
    };

    const handleBashInput = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        const value = inputValue.trim();
        if (!value) return;

        const normalizedValue = normalizeToken(value);
        const target = allowedCommands.get(normalizedValue);
        if (!target) return;

        navigate(target);
        setInputValue("");
    };

    const activeSuggestion = suggestionValues.length
        ? suggestionValues[suggestionIndex % suggestionValues.length]
        : "";
    const inputLower = normalizeToken(inputValue);
    const suggestionSuffix = useMemo(() => {
        if (!activeSuggestion) return "";
        if (!inputLower) return activeSuggestion;
        if (activeSuggestion.startsWith(inputLower)) {
            return activeSuggestion.slice(inputLower.length);
        }
        return "";
    }, [activeSuggestion, inputLower]);

    const hasSingleCrumb = crumbs.length === 1;
    const isEmptyInput = inputValue.length === 0;
    const terminalTypographySx = {
        fontSize: (theme) => theme.typography.h5.fontSize,
        fontWeight: (theme) => theme.typography.h5.fontWeight,
        lineHeight: (theme) => theme.typography.h5.lineHeight,
        fontFamily: (theme) => theme.typography.fontFamily,
    };
    const inputRootSx = {
        position: "absolute",
        inset: 0,
        opacity: 0,
        zIndex: 1,
        cursor: "text",
        "& .MuiInputBase-input": {
            width: "100%",
            height: "100%",
            ...terminalTypographySx,
            caretColor: "transparent",
        }
    };
    const cursorSx = {
        width: "0.72ch",
        height: "0.98em",
        backgroundColor: "text.secondary",
        opacity: 1,
        animation: isInputFocused
            ? "terminalCursorBlink 1.1s steps(1, end) infinite"
            : "none",
        pointerEvents: "none",
        flexShrink: 0,
        alignSelf: "center",
    };
    const handleTerminalLineMouseDown = (event) => {
        event.preventDefault();
        inputRef.current?.focus();
    };

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

                <Box
                    sx={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        minWidth: "9ch",
                        minHeight: "2rem",
                        px: 0.5,
                        borderRadius: 0.5,
                        cursor: "text",
                        "@keyframes terminalCursorBlink": {
                            "0%, 49%": { opacity: 1 },
                            "50%, 100%": { opacity: 0 },
                        },
                    }}
                    onMouseDown={handleTerminalLineMouseDown}
                >
                    <InputBase
                        inputRef={inputRef}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyDown={handleBashInput}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        autoFocus
                        sx={inputRootSx}
                    />

                    {!isEmptyInput && (
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{
                                pointerEvents: "none",
                                userSelect: "none",
                                whiteSpace: "pre",
                                ...terminalTypographySx,
                            }}
                        >
                            {inputValue}
                        </Typography>
                    )}

                    <Box aria-hidden="true" sx={cursorSx} />

                    {isEmptyInput && suggestionSuffix && inputLower.length === 0 && (
                        <Typography
                            variant="h5"
                            color="text.disabled"
                            sx={{
                                pointerEvents: "none",
                                userSelect: "none",
                                whiteSpace: "nowrap",
                                ...terminalTypographySx,
                            }}
                        >
                            {suggestionSuffix}
                        </Typography>
                    )}

                </Box>
            </Breadcrumbs>
        </Stack>
    );
}
