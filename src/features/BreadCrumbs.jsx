import { useNavigate } from "react-router-dom";
import {
    Box,
    Stack,
    Breadcrumbs,
    Typography,
    InputBase
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useBreadcrumb } from "../contexts/BreadCrumbContext.jsx";
import CrumbWithMenu from "./breadcrumbs/CrumbWithMenu.jsx";
import { normalizeSegment } from "./breadcrumbs/breadcrumb.utils.js";
import { useBreadcrumbCommand } from "./breadcrumbs/useBreadcrumbCommand.js";

const ROOT_ID = "tommasoberti@com:~ cd";

export default function BreadCrumbs() {
    const navigate = useNavigate();
    const { breadcrumb } = useBreadcrumb();
    const { t } = useTranslation();
    const {
        crumbs,
        inputValue,
        setInputValue,
        inputRef,
        isInputFocused,
        setIsInputFocused,
        isNavigatingCommand,
        handleBashInput,
        suggestionSuffix,
        inputLower,
    } = useBreadcrumbCommand();

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

                    {!isNavigatingCommand && isEmptyInput && suggestionSuffix && inputLower.length === 0 && (
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
