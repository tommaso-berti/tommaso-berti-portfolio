import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useTranslation } from "../../hooks/useTranslation.js";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

const SITE_URL = "https://www.tommasoberti.com";
const SITE_NAME = "Tommaso Berti";
const OG_IMAGE_URL = `${SITE_URL}/og-profile.jpeg`;

const ROUTE_META_KEYS = [
    { match: (pathname) => pathname === "/", key: "home" },
    { match: (pathname) => pathname === "/projects", key: "projects" },
    { match: (pathname) => pathname.startsWith("/projects/"), key: "projectDetail" },
    { match: (pathname) => pathname === "/about", key: "about" },
    { match: (pathname) => pathname === "/contact", key: "contact" },
    { match: (pathname) => pathname === "/blog", key: "blog" },
    { match: (pathname) => pathname === "/cv", key: "cv" },
];

function ensureMetaTag(attribute, name) {
    const selector = `meta[${attribute}="${name}"]`;
    let tag = document.head.querySelector(selector);
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
    }
    return tag;
}

function setMetaTag(attribute, name, content) {
    const tag = ensureMetaTag(attribute, name);
    tag.setAttribute("content", content);
}

function ensureCanonicalTag() {
    let tag = document.head.querySelector('link[rel="canonical"]');
    if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", "canonical");
        document.head.appendChild(tag);
    }
    return tag;
}

function resolveRouteKey(pathname) {
    const matched = ROUTE_META_KEYS.find((route) => route.match(pathname));
    return matched?.key || "fallback";
}

export default function SeoMetaManager() {
    const { pathname } = useLocation();
    const { language } = useLanguage();
    const { t } = useTranslation("seo");

    const routeKey = useMemo(() => resolveRouteKey(pathname), [pathname]);

    useEffect(() => {
        const title = t(`pages.${routeKey}.title`, { defaultValue: t("pages.fallback.title") });
        const description = t(`pages.${routeKey}.description`, { defaultValue: t("pages.fallback.description") });
        const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

        document.title = title;
        document.documentElement.lang = language;

        setMetaTag("name", "description", description);
        setMetaTag("property", "og:title", title);
        setMetaTag("property", "og:description", description);
        setMetaTag("property", "og:type", pathname === "/" ? "website" : "article");
        setMetaTag("property", "og:url", canonicalUrl);
        setMetaTag("property", "og:site_name", SITE_NAME);
        setMetaTag("property", "og:image", OG_IMAGE_URL);
        setMetaTag("name", "twitter:card", "summary_large_image");
        setMetaTag("name", "twitter:title", title);
        setMetaTag("name", "twitter:description", description);
        setMetaTag("name", "twitter:image", OG_IMAGE_URL);

        const canonical = ensureCanonicalTag();
        canonical.setAttribute("href", canonicalUrl);
    }, [language, pathname, routeKey, t]);

    return null;
}
