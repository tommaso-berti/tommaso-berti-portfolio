export const contactMetaSx = {
    typography: "body2",
    fontFamily: "inherit",
    fontWeight: 500,
    lineHeight: 1.5,
    color: "text.secondary",
};

export const cvActionButtonSx = {
    alignSelf: { xs: "stretch", lg: "center" },
    textTransform: "none",
    whiteSpace: "nowrap",
    lineHeight: 1.2,
    py: 1.05,
    px: 2,
    minWidth: { sm: 250, md: 0 },
    transition: "0.25s",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
    },
};

export const cvActionLinkSx = {
    whiteSpace: "nowrap",
    fontWeight: 700,
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 999,
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
