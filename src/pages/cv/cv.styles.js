export const contactMetaSx = {
    typography: "body2",
    fontFamily: "inherit",
    fontWeight: 500,
    lineHeight: 1.5,
    color: "text.secondary",
};

export const cvSectionSx = {
    py: { xs: 2, md: 2.7 },
    borderBottom: "1px solid",
    borderColor: "divider",
    "&:last-child": { borderBottom: 0 },
};

export const cvSectionTitleSx = {
    mb: 1.2,
    fontSize: { xs: "1.2rem", md: "1.45rem" },
    lineHeight: 1.1,
    letterSpacing: "-.02em",
};

export const cvActionButtonSx = {
    alignSelf: { xs: "stretch", lg: "center" },
    textTransform: "none",
    whiteSpace: "nowrap",
    lineHeight: 1.2,
    py: 1.05,
    px: 2,
    minWidth: { sm: 0 },
    borderRadius: 0,
    boxShadow: "0 5px 14px rgba(23,32,42,.1)",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 8px 18px rgba(23,32,42,.15)",
    },
};

export const cvActionLinkSx = {
    whiteSpace: "nowrap",
    fontWeight: 700,
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 0,
    px: 1,
    py: 0.25,
    color: "secondary.main",
    textDecoration: "none",
    textUnderlineOffset: "0.2em",
    transition: "0.2s",
    "&:hover": {
        backgroundColor: "action.hover",
        borderColor: "secondary.main",
    },
    "&:focus-visible": {
        outline: "2px solid",
        outlineColor: "secondary.main",
        outlineOffset: 2,
    },
};
