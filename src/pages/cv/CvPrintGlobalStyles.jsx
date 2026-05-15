import { GlobalStyles } from "@mui/material";

const printStyles = {
    "@page": {
        size: "A4",
        margin: "13mm",
    },
    "@media print": {
        "*, *::before, *::after": {
            boxSizing: "border-box !important",
        },
        "html, body, #root": {
            backgroundColor: "#fff !important",
            overflowX: "visible !important",
        },
        ".MuiContainer-root": {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
            maxWidth: "100% !important",
        },
        header: {
            display: "none !important",
        },
        footer: {
            display: "none !important",
        },
        main: {
            maxWidth: "100% !important",
            paddingTop: "0 !important",
            paddingBottom: "0 !important",
        },
        "[data-cv-page]": {
            width: "100% !important",
            maxWidth: "100% !important",
            margin: "0 !important",
            gap: "0 !important",
            paddingTop: "0 !important",
            paddingBottom: "0 !important",
            paddingLeft: "0 !important",
            paddingRight: "4mm !important",
            overflowX: "visible !important",
        },
        "[data-cv-controls]": {
            display: "none !important",
        },
        "[data-cv-document]": {
            border: "0 !important",
            boxShadow: "none !important",
            backgroundImage: "none !important",
            backgroundColor: "#fff !important",
            padding: "0 !important",
            width: "100% !important",
            maxWidth: "100% !important",
            overflowX: "visible !important",
            paddingRight: "1mm !important",
        },
        "[data-cv-section]": {
            breakInside: "auto",
            pageBreakInside: "auto",
            maxWidth: "100% !important",
        },
        "[data-cv-section-splittable]": {
            breakInside: "auto !important",
            pageBreakInside: "auto !important",
        },
        "[data-cv-link]": {
            color: "#111 !important",
            textDecoration: "none !important",
        },
        "[data-cv-social-link]": {
            whiteSpace: "nowrap !important",
            overflowWrap: "normal !important",
            wordBreak: "normal !important",
        },
        "[data-cv-action-link]": {
            display: "none !important",
        },
        "[data-cv-cert-row]": {
            display: "grid !important",
            gridTemplateColumns: "minmax(0, 1fr) auto !important",
            alignItems: "start !important",
            columnGap: "4mm !important",
            maxWidth: "100% !important",
        },
        "[data-cv-cert-main]": {
            minWidth: "0 !important",
            overflowWrap: "anywhere !important",
            wordBreak: "break-word !important",
            maxWidth: "100% !important",
        },
        "[data-cv-cert-meta]": {
            display: "block !important",
            justifySelf: "end !important",
            paddingRight: "0.8mm !important",
        },
        "[data-cv-cert-date]": {
            display: "inline-block !important",
            whiteSpace: "nowrap !important",
            textAlign: "right !important",
            minWidth: "12mm !important",
        },
        "[data-cv-document] h5, [data-cv-document] h6, [data-cv-document] p, [data-cv-document] span": {
            overflowWrap: "anywhere !important",
            wordBreak: "break-word !important",
        },
        "[data-cv-document] h1, [data-cv-document] h2, [data-cv-document] h3, [data-cv-document] h4": {
            overflowWrap: "anywhere !important",
            wordBreak: "break-word !important",
            maxWidth: "100% !important",
        },
        "[data-cv-section] > h5, [data-cv-section] > h6": {
            breakAfter: "avoid-page !important",
            pageBreakAfter: "avoid !important",
        },
        "[data-cv-section] > h5 + *, [data-cv-section] > h6 + *": {
            breakBefore: "avoid-page !important",
            pageBreakBefore: "avoid !important",
        },
        "[data-cv-meta-row]": {
            display: "grid !important",
            gridTemplateColumns: "minmax(0, 1fr) auto !important",
            alignItems: "start !important",
            columnGap: "4mm !important",
            maxWidth: "100% !important",
        },
        "[data-cv-meta-main]": {
            minWidth: "0 !important",
            overflowWrap: "anywhere !important",
            wordBreak: "break-word !important",
        },
        "[data-cv-meta-side]": {
            justifySelf: "end !important",
            textAlign: "right !important",
            whiteSpace: "nowrap !important",
            minWidth: "0 !important",
            maxWidth: "48mm !important",
            overflowWrap: "anywhere !important",
            wordBreak: "break-word !important",
            paddingRight: "0.8mm !important",
        },
        "[data-cv-lang-level]": {
            whiteSpace: "nowrap !important",
            minWidth: "0 !important",
            maxWidth: "none !important",
            overflowWrap: "anywhere !important",
            wordBreak: "break-word !important",
        },
        "[data-cv-lang-row]": {
            breakInside: "avoid !important",
            pageBreakInside: "avoid !important",
        },
        "[data-cv-hero-grid]": {
            display: "grid !important",
            gridTemplateColumns: "minmax(0, 1fr) auto !important",
            alignItems: "start !important",
            columnGap: "4mm !important",
        },
        "[data-cv-photo]": {
            width: "24mm !important",
            height: "24mm !important",
            borderRadius: "50% !important",
            objectFit: "cover !important",
        },
        "[data-cv-document]::after": {
            content: "\"\"",
            display: "block",
            height: "8mm",
        },
    },
};

export default function CvPrintGlobalStyles() {
    return <GlobalStyles styles={printStyles} />;
}
