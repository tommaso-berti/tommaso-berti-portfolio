import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreadcrumb } from "../../contexts/BreadCrumbContext.jsx";
import {
    getBreadcrumbContextBasePath,
    resolveBreadcrumbContextId,
} from "../../app/routing/appDefinitions.js";
import { normalizeSegment, normalizeToken } from "./breadcrumb.utils.js";

const SUGGESTION_INTERVAL_MS = 1800;

export function useBreadcrumbCommand() {
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();
    const { breadcrumb } = useBreadcrumb();
    const [inputValue, setInputValue] = useState("");
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isNavigatingCommand, setIsNavigatingCommand] = useState(false);
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
    const activeContextId = resolveBreadcrumbContextId(pathname, activeCrumb?.id, breadcrumb);
    const activeContext = breadcrumb[activeContextId] ?? { type: "path", items: [] };
    const contextBasePath = getBreadcrumbContextBasePath(activeContextId, activeCrumb);

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
        const items = Array.isArray(activeContext.items) ? activeContext.items : [];
        for (const item of items) {
            const localizedTitle = normalizeToken(item.title);
            if (!localizedTitle) continue;
            if (!values.includes(localizedTitle)) {
                values.push(localizedTitle);
            }
        }

        const parentCrumb = crumbs.at(-2);
        if (parentCrumb?.to) {
            values.push("..");
        }

        return values;
    }, [activeContext.items, crumbs]);

    useEffect(() => {
        if (isNavigatingCommand) return;
        if (!suggestionValues.length || inputValue.trim() !== "") return;

        const intervalId = setInterval(() => {
            setSuggestionIndex((previous) => (previous + 1) % suggestionValues.length);
        }, SUGGESTION_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [suggestionValues, inputValue, isNavigatingCommand]);

    useEffect(() => {
        setSuggestionIndex(0);
    }, [activeContextId, pathname, hash, suggestionValues]);

    useLayoutEffect(() => {
        if (!isNavigatingCommand) return;
        setInputValue("");
        setIsNavigatingCommand(false);
        setSuggestionIndex(0);
    }, [pathname, hash, isNavigatingCommand]);

    useEffect(() => {
        setIsInputFocused(document.activeElement === inputRef.current);
    }, []);

    const handleBashInput = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();

            const value = inputValue.trim();
            const normalizedValue = normalizeToken(value);
            const candidateCommands = Array.from(allowedCommands.keys()).filter((command) => command !== "..");
            const matchingCommands = candidateCommands.filter((command) =>
                command.startsWith(normalizedValue)
            );

            if (matchingCommands.length !== 1) return;
            setInputValue(matchingCommands[0]);
            return;
        }

        if (e.key !== "Enter") return;
        e.preventDefault();

        const value = inputValue.trim();
        if (!value) return;

        const normalizedValue = normalizeToken(value);
        const target = allowedCommands.get(normalizedValue);
        if (!target) return;

        const currentTarget = `${pathname}${hash || ""}`;
        if (target === currentTarget) {
            setInputValue("");
            setSuggestionIndex(0);
            return;
        }

        setIsNavigatingCommand(true);
        navigate(target);
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

    return {
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
    };
}
