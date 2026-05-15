export const outlinedActionButtonSx = {
    transition: "0.25s",
    whiteSpace: "nowrap",
    borderWidth: 1,
    borderColor: "divider",
    color: "text.primary",
    backgroundColor: "background.paper",
    cursor: "pointer",
    textTransform: "none",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
        borderColor: "text.secondary",
        backgroundColor: "action.hover",
        cursor: "pointer",
    },
};

export const certificationActionButtonSx = {
    ...outlinedActionButtonSx,
    width: "50%",
    minWidth: 0,
    justifyContent: "center",
    alignSelf: "flex-start",
};

export const containedPrimaryButtonSx = {
    transition: "0.25s",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
    },
};
